import * as ts from 'typescript';
import { EnvReference } from './types';
import { ParsedFile } from './parser';

export function extractEnvReferences(parsedFiles: ParsedFile[]): EnvReference[] {
  const references: EnvReference[] = [];

  for (const { sourceFile, filePath } of parsedFiles) {
    const fileReferences = extractFromFile(sourceFile, filePath);
    references.push(...fileReferences);
  }

  return references;
}

function extractFromFile(
  sourceFile: ts.SourceFile,
  filePath: string,
): EnvReference[] {
  const references: EnvReference[] = [];

  function visit(node: ts.Node): void {
    // Check for process.env.VAR_NAME pattern
    if (ts.isPropertyAccessExpression(node)) {
      const expression = node.expression;
      if (
        ts.isPropertyAccessExpression(expression) &&
        ts.isIdentifier(expression.expression) &&
        expression.expression.text === 'process' &&
        ts.isIdentifier(expression.name) &&
        expression.name.text === 'env'
      ) {
        const varName = ts.isIdentifier(node.name) ? node.name.text : node.name.getText(sourceFile);
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(
          node.getStart(sourceFile),
        );

        references.push({
          name: varName,
          file: filePath,
          line: line + 1,
          column: character + 1,
        });
      }
    }

    // Check for process.env['VAR_NAME'] or process.env["VAR_NAME"] pattern
    if (ts.isElementAccessExpression(node)) {
      const expression = node.expression;
      if (
        ts.isPropertyAccessExpression(expression) &&
        ts.isIdentifier(expression.expression) &&
        expression.expression.text === 'process' &&
        ts.isIdentifier(expression.name) &&
        expression.name.text === 'env' &&
        node.argumentExpression &&
        ts.isStringLiteral(node.argumentExpression)
      ) {
        const varName = node.argumentExpression.text;
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(
          node.getStart(sourceFile),
        );

        references.push({
          name: varName,
          file: filePath,
          line: line + 1,
          column: character + 1,
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return references;
}

