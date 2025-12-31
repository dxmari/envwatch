import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

export interface ParsedFile {
  sourceFile: ts.SourceFile;
  filePath: string;
}

export function createProgram(files: string[]): ts.Program {
  const compilerOptions: ts.CompilerOptions = {
    allowJs: true,
    checkJs: false,
    noEmit: true,
    skipLibCheck: true,
  };

  return ts.createProgram(files, compilerOptions);
}

export function parseFiles(files: string[]): ParsedFile[] {
  const parsedFiles: ParsedFile[] = [];

  for (const filePath of files) {
    try {
      if (!fs.existsSync(filePath)) {
        continue;
      }

      const content = fs.readFileSync(filePath, 'utf8');
      const ext = path.extname(filePath);
      const isTypeScript = ext === '.ts' || ext === '.tsx';
      const languageVersion = isTypeScript
        ? ts.ScriptTarget.Latest
        : ts.ScriptTarget.ES2020;

      const sourceFile = ts.createSourceFile(
        filePath,
        content,
        languageVersion,
        true,
      );

      parsedFiles.push({
        sourceFile,
        filePath,
      });
    } catch (error) {
      // Skip files that can't be parsed
    }
  }

  return parsedFiles;
}

