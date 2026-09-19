export type ThemeMode = 'dark' | 'light';

export interface AppSpecs {
  name: string;
  tagline: string;
  description: string;
  version: string;
  releaseDate: string;
  fileName: string;
  fileSize: string;
  fileSizeBytes: number;
  downloadUrl: string;
  githubUrl: string;
  minAndroid: string;
  targetAndroid: string;
  packageName: string;
  sha256: string;
  architecture: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  badge?: string;
  iconName: string;
}

export interface InstallStep {
  step: number;
  title: string;
  shortDesc: string;
  details: string;
  iconName: string;
  tip?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
