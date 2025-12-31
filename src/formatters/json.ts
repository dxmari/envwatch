import { AnalysisResult } from '../types';

export function formatJSON(result: AnalysisResult): string {
  const output = {
    referenced: result.referenced.map((ref) => ({
      name: ref.name,
      file: ref.file,
      line: ref.line,
      column: ref.column,
    })),
    missing: result.missing,
    unused: result.unused,
    risky: result.risky.map((pattern) => ({
      type: pattern.type,
      description: pattern.description,
      location: pattern.location,
      file: pattern.file,
      line: pattern.line,
      column: pattern.column,
    })),
    summary: {
      referencedCount: result.referenced.length,
      missingCount: result.missing.length,
      unusedCount: result.unused.length,
      riskyCount: result.risky.length,
    },
  };

  return JSON.stringify(output, null, 2);
}

