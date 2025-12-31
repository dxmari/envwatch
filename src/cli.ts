#!/usr/bin/env node

import { Command } from 'commander';
import { scanSourceFiles } from './scanner';
import { parseFiles } from './parser';
import { extractEnvReferences } from './extractor';
import { analyzeEnvVars } from './analyzer';
import { detectRiskyPatterns } from './detector';
import { formatDefault } from './formatters/default';
import { formatCI } from './formatters/ci';
import { formatJSON } from './formatters/json';
import { AnalysisResult, OutputMode, ScanOptions } from './types';

function runAnalysis(options: ScanOptions): AnalysisResult {
  const files = scanSourceFiles(options);
  const parsedFiles = parseFiles(files);
  const references = extractEnvReferences(parsedFiles);
  const riskyPatterns = detectRiskyPatterns(parsedFiles);

  const availableEnvVars = Object.keys(process.env);
  const { missing, unused } = analyzeEnvVars(references, availableEnvVars);

  return {
    referenced: references,
    missing,
    unused,
    risky: riskyPatterns,
  };
}

function main(): void {
  const program = new Command();

  program
    .name('envwatch')
    .description(
      'CI-first environment variable visibility for Node.js projects',
    )
    .version('1.0.0')
    .option('--ci', 'CI-friendly output mode')
    .option('--json', 'Machine-readable JSON output')
    .option('--path <path>', 'Project path to analyze', process.cwd())
    .option('--exclude <patterns...>', 'Additional exclusion patterns')
    .action((options) => {
      try {
        const scanOptions: ScanOptions = {
          path: options.path,
          exclude: options.exclude,
        };

        const result = runAnalysis(scanOptions);

        let output: string;
        let outputMode: OutputMode;

        if (options.json) {
          outputMode = 'json';
          output = formatJSON(result);
        } else if (options.ci) {
          outputMode = 'ci';
          output = formatCI(result);
        } else {
          outputMode = 'default';
          output = formatDefault(result);
        }

        console.log(output);

        // Always exit with 0 in v1 (does not block builds)
        process.exit(0);
      } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
        process.exit(0); // Still exit 0 in v1
      }
    });

  program.parse();
}

main();

