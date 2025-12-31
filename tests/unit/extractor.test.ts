import { extractEnvReferences } from '../../src/extractor';
import { parseFiles } from '../../src/parser';
import * as path from 'path';
import { test } from 'node:test';
import assert from 'node:assert';

// Use source fixtures path (not dist) since fixtures aren't copied
const fixturesPath = path.join(process.cwd(), 'tests', 'fixtures');

test('extractor should extract process.env references', () => {
  const files = [path.join(fixturesPath, 'sample-code.ts')];
  const parsedFiles = parseFiles(files);
  const references = extractEnvReferences(parsedFiles);

  assert.ok(references.length > 0);
  assert.ok(references.some((r) => r.name === 'API_KEY'));
  assert.ok(references.some((r) => r.name === 'DATABASE_URL'));
  assert.ok(references.some((r) => r.name === 'NODE_ENV'));
});

test('extractor should extract bracket notation references', () => {
  const files = [path.join(fixturesPath, 'sample-code.ts')];
  const parsedFiles = parseFiles(files);
  const references = extractEnvReferences(parsedFiles);

  const dbUrlRef = references.find((r) => r.name === 'DATABASE_URL');
  assert.ok(dbUrlRef !== undefined);
});

test('extractor should include file location information', () => {
  const files = [path.join(fixturesPath, 'sample-code.ts')];
  const parsedFiles = parseFiles(files);
  const references = extractEnvReferences(parsedFiles);

  assert.strictEqual(references[0].file, files[0]);
  assert.ok(references[0].line > 0);
  assert.ok(references[0].column > 0);
});

