import { AnalysisResult } from '../types';
import { isCIEnvironment } from '../analyzer';

export function formatCI(result: AnalysisResult): string {
  const lines: string[] = [];
  const referencedCount = result.referenced.length;
  const missingCount = result.missing.length;
  const unusedCount = result.unused.length;
  const riskyCount = result.risky.length;

  lines.push('=== Envwatch Analysis ===');
  lines.push('');

  lines.push(`Referenced: ${referencedCount} environment variables`);

  if (missingCount > 0) {
    lines.push(`Missing: ${missingCount} environment variable${missingCount > 1 ? 's' : ''}`);
    for (const name of result.missing) {
      lines.push(`  - ${name}`);
    }
    lines.push('');
  }

  if (unusedCount > 0) {
    lines.push(`Unused: ${unusedCount} environment variable${unusedCount > 1 ? 's' : ''}`);
    for (const name of result.unused) {
      lines.push(`  - ${name}`);
    }
    lines.push('');
  }

  if (riskyCount > 0) {
    lines.push(`Risky Patterns: ${riskyCount}`);
    for (const pattern of result.risky) {
      lines.push(`  [${pattern.type}] ${pattern.description}`);
      lines.push(`    Location: ${pattern.location}`);
    }
    lines.push('');
  }

  if (missingCount === 0 && unusedCount === 0 && riskyCount === 0) {
    lines.push('No issues detected.');
  } else {
    lines.push('Action: Review environment variable configuration');
  }

  return lines.join('\n');
}

