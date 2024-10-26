export interface ConversionOptions {
  quality: 'standard' | 'high';
  preserveMetadata?: boolean;
}

export interface ConversionResult {
  url: string;
  size: number;
  pages?: number;
}