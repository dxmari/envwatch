import * as ts from 'typescript';
import { RiskyPattern } from './types';
import { ParsedFile } from './parser';

export function detectRiskyPatterns(parsedFiles: ParsedFile[]): RiskyPattern[] {
  const patterns: RiskyPattern[] = [];

  for (const { sourceFile, filePath } of parsedFiles) {
    const filePatterns = detectInFile(sourceFile, filePath);
    patterns.push(...filePatterns);
  }

  return patterns;
}

function detectInFile(
  sourceFile: ts.SourceFile,
  filePath: string,
): RiskyPattern[] {
  const patterns: RiskyPattern[] = [];

  function visit(node: ts.Node): void {
    // Detect NODE_ENV overrides
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken
    ) {
      const left = node.left;
      if (ts.isPropertyAccessExpression(left)) {
        const expression = left.expression;
        if (
          ts.isPropertyAccessExpression(expression) &&
          ts.isIdentifier(expression.expression) &&
          expression.expression.text === 'process' &&
          ts.isIdentifier(expression.name) &&
          expression.name.text === 'env' &&
          ts.isIdentifier(left.name) &&
          left.name.text === 'NODE_ENV'
        ) {
          const { line, character } = sourceFile.getLineAndCharacterOfPosition(
            node.getStart(sourceFile),
          );

          patterns.push({
            type: 'NODE_ENV_OVERRIDE',
            description: 'NODE_ENV is being overridden',
            location: `${filePath}:${line + 1}:${character + 1}`,
            file: filePath,
            line: line + 1,
            column: character + 1,
          });
        }
      }
    }

    // Detect hardcoded fallbacks: process.env.VAR || 'default'
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.BarBarToken
    ) {
      const left = node.left;
      let isProcessEnv = false;

      if (ts.isPropertyAccessExpression(left)) {
        const expression = left.expression;
        if (
          ts.isPropertyAccessExpression(expression) &&
          ts.isIdentifier(expression.expression) &&
          expression.expression.text === 'process' &&
          ts.isIdentifier(expression.name) &&
          expression.name.text === 'env'
        ) {
          isProcessEnv = true;
        }
      } else if (ts.isElementAccessExpression(left)) {
        const expression = left.expression;
        if (
          ts.isPropertyAccessExpression(expression) &&
          ts.isIdentifier(expression.expression) &&
          expression.expression.text === 'process' &&
          ts.isIdentifier(expression.name) &&
          expression.name.text === 'env'
        ) {
          isProcessEnv = true;
        }
      }

      if (isProcessEnv) {
        const right = node.right;
        if (
          ts.isStringLiteral(right) ||
          ts.isNumericLiteral(right) ||
          (ts.isLiteralExpression(right) &&
            (right.kind === ts.SyntaxKind.TrueKeyword ||
              right.kind === ts.SyntaxKind.FalseKeyword))
        ) {
          const { line, character } = sourceFile.getLineAndCharacterOfPosition(
            node.getStart(sourceFile),
          );

          patterns.push({
            type: 'HARDCODED_FALLBACK',
            description: `Hardcoded fallback value detected: ${right.getText(sourceFile)}`,
            location: `${filePath}:${line + 1}:${character + 1}`,
            file: filePath,
            line: line + 1,
            column: character + 1,
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return patterns;
}

