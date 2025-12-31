import { EnvReference, AnalysisResult } from './types';

export function analyzeEnvVars(
  references: EnvReference[],
  availableEnvVars: string[],
): { missing: string[]; unused: string[] } {
  const referencedNames = new Set(
    references.map((ref) => ref.name).filter((name) => name.length > 0),
  );
  const availableSet = new Set(availableEnvVars);

  const missing: string[] = [];
  const unused: string[] = [];

  // Find missing vars (referenced but not available)
  for (const name of referencedNames) {
    if (!availableSet.has(name)) {
      missing.push(name);
    }
  }

  // Find unused vars (available but not referenced)
  for (const name of availableEnvVars) {
    if (!referencedNames.has(name)) {
      unused.push(name);
    }
  }

  return {
    missing: missing.sort(),
    unused: unused.sort(),
  };
}

export function isCIEnvironment(): boolean {
  return (
    process.env.CI === 'true' ||
    process.env.CI === '1' ||
    !!(
      process.env.GITHUB_ACTIONS ||
      process.env.GITLAB_CI ||
      process.env.JENKINS_URL ||
      process.env.CIRCLECI ||
      process.env.TRAVIS ||
      process.env.BUILDKITE
    )
  );
}

