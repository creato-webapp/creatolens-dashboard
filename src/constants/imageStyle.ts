interface ConfidenceLevel {
  name: string
  threshold?: number
  thresholdLow?: number
  thresholdHigh?: number
}

export const CONFIDENCE_LEVELS: Record<string, ConfidenceLevel> = {
  HIGH: { name: '≥ 90% Related Keyword', threshold: 0.9 },
  MEDIUM_HIGH: { name: '80-89% Related Keyword', thresholdLow: 0.8, thresholdHigh: 0.9 },
  MEDIUM_LOW: { name: '70-79% Related Keyword', thresholdLow: 0.7, thresholdHigh: 0.8 },
  LOW: { name: '≤ 70% Related Keyword', thresholdLow: 0, thresholdHigh: 0.7 },
}
