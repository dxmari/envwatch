import * as fs from 'fs';
import * as path from 'path';
import { ScanOptions } from './types';

const SUPPORTED_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];
const DEFAULT_EXCLUDE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  'out',
  'coverage',
  '.nyc_output',
];

export function scanSourceFiles(options: ScanOptions = {}): string[] {
  const rootPath = options.path || process.cwd();
  const excludePatterns = [
    ...DEFAULT_EXCLUDE_PATTERNS,
    ...(options.exclude || []),
  ];

  const files: string[] = [];

  function shouldExclude(filePath: string): boolean {
    const relativePath = path.relative(rootPath, filePath);
    return excludePatterns.some((pattern) => {
      const normalizedPattern = pattern.replace(/\//g, path.sep);
      return (
        relativePath.includes(normalizedPattern) ||
        relativePath.startsWith(normalizedPattern)
      );
    });
  }

  function walkDirectory(dirPath: string): void {
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (shouldExclude(fullPath)) {
          continue;
        }

        if (entry.isDirectory()) {
          walkDirectory(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          if (SUPPORTED_EXTENSIONS.includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      // Skip directories that can't be read (permissions, etc.)
    }
  }

  walkDirectory(rootPath);
  return files.sort();
}

