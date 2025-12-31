import { detectRiskyPatterns } from '../../src/detector';
import { parseFiles } from '../../src/parser';
import * as path from 'path';
import { test } from 'node:test';
import assert from 'node:assert';

// Use source fixtures path (not dist) since fixtures aren't copied
const fixturesPath = path.join(process.cwd(), 'tests', 'fixtures');

test('detector should detect NODE_ENV overrides', () => {
  const files = [path.join(fixturesPath, 'sample-code.ts')];
  const parsedFiles = parseFiles(files);
  const patterns = detectRiskyPatterns(parsedFiles);

  const nodeEnvOverride = patterns.find(
    (p) => p.type === 'NODE_ENV_OVERRIDE',
  );
  assert.ok(nodeEnvOverride !== undefined);
});

test('detector should detect hardcoded fallbacks', () => {
  const files = [path.join(fixturesPath, 'sample-code.ts')];
  const parsedFiles = parseFiles(files);
  const patterns = detectRiskyPatterns(parsedFiles);

  const fallbacks = patterns.filter(
    (p) => p.type === 'HARDCODED_FALLBACK',
  );
  assert.ok(fallbacks.length > 0);
});

test('detector should include location information', () => {
  const files = [path.join(fixturesPath, 'sample-code.ts')];
  const parsedFiles = parseFiles(files);
  const patterns = detectRiskyPatterns(parsedFiles);

  assert.ok(patterns.length > 0);
  assert.ok(patterns[0].file !== undefined);
  assert.ok(patterns[0].line > 0);
  assert.ok(patterns[0].location.includes(':'));
});

