
export enum EnhancementStyle {
  POETIC = 'POETIC',
  MOTIVATIONAL = 'MOTIVATIONAL',
  PROFESSIONAL = 'PROFESSIONAL',
  FUTURISTIC = 'FUTURISTIC',
  STORY = 'STORY'
}

export interface EnhancementResult {
  originalText: string;
  enhancedText: string;
  style: EnhancementStyle;
}
