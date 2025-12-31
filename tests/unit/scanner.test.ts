import { scanSourceFiles } from '../../src/scanner';
import * as path from 'path';
import { test } from 'node:test';
import assert from 'node:assert';

// Use source fixtures path (not dist) since fixtures aren't copied
const fixturesPath = path.join(process.cwd(), 'tests', 'fixtures');

test('scanner should scan TypeScript and JavaScript files', () => {
  const files = scanSourceFiles({ path: fixturesPath });
  assert.ok(files.length > 0);
  assert.ok(files.some((f) => f.endsWith('.ts')));
  assert.ok(files.some((f) => f.endsWith('.js')));
});

test('scanner should exclude node_modules', () => {
  const files = scanSourceFiles({ path: process.cwd() });
  assert.ok(files.every((f) => !f.includes('node_modules')));
});

test('scanner should respect custom exclude patterns', () => {
  const files = scanSourceFiles({
    path: fixturesPath,
    exclude: ['sample-code-2.js'],
  });
  assert.ok(files.every((f) => !f.includes('sample-code-2.js')));
});
