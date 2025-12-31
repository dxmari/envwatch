import { analyzeEnvVars } from '../../src/analyzer';
import { EnvReference } from '../../src/types';
import { test } from 'node:test';
import assert from 'node:assert';

test('analyzer should detect missing environment variables', () => {
  const references: EnvReference[] = [
    { name: 'EXISTING_VAR', file: 'test.ts', line: 1, column: 1 },
    { name: 'MISSING_VAR', file: 'test.ts', line: 2, column: 1 },
  ];

  const available = ['EXISTING_VAR', 'OTHER_VAR'];

  const { missing, unused } = analyzeEnvVars(references, available);

  assert.ok(missing.includes('MISSING_VAR'));
  assert.ok(!missing.includes('EXISTING_VAR'));
});

test('analyzer should detect unused environment variables', () => {
  const references: EnvReference[] = [
    { name: 'USED_VAR', file: 'test.ts', line: 1, column: 1 },
  ];

  const available = ['USED_VAR', 'UNUSED_VAR'];

  const { missing, unused } = analyzeEnvVars(references, available);

  assert.ok(unused.includes('UNUSED_VAR'));
  assert.ok(!unused.includes('USED_VAR'));
});

test('analyzer should handle empty references', () => {
  const references: EnvReference[] = [];
  const available = ['VAR1', 'VAR2'];

  const { missing, unused } = analyzeEnvVars(references, available);

  assert.strictEqual(missing.length, 0);
  assert.strictEqual(unused.length, 2);
});

