export interface EnvReference {
  name: string;
  file: string;
  line: number;
  column: number;
}

export interface RiskyPattern {
  type: string;
  description: string;
  location: string;
  file: string;
  line: number;
  column: number;
}

export interface AnalysisResult {
  referenced: EnvReference[];
  missing: string[];
  unused: string[];
  risky: RiskyPattern[];
}

export interface ScanOptions {
  path?: string;
  exclude?: string[];
}

export type OutputMode = 'default' | 'ci' | 'json';

