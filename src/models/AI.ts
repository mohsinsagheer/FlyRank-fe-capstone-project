import type { ProductCategory } from './Product';

export interface AISearchRequirement {
  originalQuery: string;
  suggestedCategory: ProductCategory;
  maxPrice?: number;
  minRating?: number;
  extractedKeywords: string[];
  keyFeatures: string[];
  reasoning: string;
  matchedProductIds: string[];
}

export interface FeatureComparisonRow {
  featureName: string;
  values: Record<string, string>; // productId -> spec/feature string
}

export interface ProductProsCons {
  pros: string[];
  cons: string[];
}

export interface AIComparisonResult {
  productIds: string[];
  overview: string;
  featuresComparison: FeatureComparisonRow[];
  prosAndCons: Record<string, ProductProsCons>;
  bestFor: Record<string, string>; // productId -> description of target user/use-case
  verdict: string;
  recommendedProductId: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface AIReviewSummary {
  productId: string;
  sentimentScore: number; // 0 to 100
  totalReviewsAnalyzed: number;
  keyPros: string[];
  keyCons: string[];
  summaryVerdict: string;
}
