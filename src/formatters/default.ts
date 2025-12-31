import { AnalysisResult } from '../types';
import { isCIEnvironment } from '../analyzer';

export function formatDefault(result: AnalysisResult): string {
  const lines: string[] = [];
  const referencedCount = result.referenced.length;
  const missingCount = result.missing.length;
  const unusedCount = result.unused.length;
  const riskyCount = result.risky.length;

  lines.push('🌱 Environment Variable Summary');
  lines.push('');

  lines.push(`• ${referencedCount} env vars referenced in code`);

  if (isCIEnvironment()) {
    if (missingCount > 0) {
      lines.push(`• ${missingCount} missing in CI`);
    }
  } else {
    if (missingCount > 0) {
      lines.push(`• ${missingCount} missing`);
    }
  }

  if (unusedCount > 0) {
    lines.push(`• ${unusedCount} unused env vars detected`);
  }

  if (riskyCount > 0) {
    lines.push(`• ⚠️  ${riskyCount} risky pattern${riskyCount > 1 ? 's' : ''} detected`);
    for (const pattern of result.risky) {
      lines.push(`  - ${pattern.description} (${pattern.location})`);
    }
  }

  lines.push('');

  if (missingCount > 0 || unusedCount > 0 || riskyCount > 0) {
    lines.push('Review recommended');
  }

  return lines.join('\n');
}

