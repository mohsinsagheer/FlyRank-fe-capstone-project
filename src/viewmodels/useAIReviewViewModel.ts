import { useState, useCallback } from 'react';
import type { Product } from '../models/Product';
import type { AIReviewSummary } from '../models/AI';
import { aiService } from '../services/aiService';

export function useAIReviewViewModel() {
  const [summaryCache, setSummaryCache] = useState<Record<string, AIReviewSummary>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeSummary, setActiveSummary] = useState<AIReviewSummary | null>(null);

  const fetchReviewSummary = useCallback(async (product: Product) => {
    if (!product || !product.id) return;

    if (summaryCache[product.id]) {
      setActiveSummary(summaryCache[product.id]);
      return;
    }

    setIsLoading(true);
    try {
      const summary = await aiService.summarizeReviews(product, product.reviews);
      setSummaryCache(prev => ({ ...prev, [product.id]: summary }));
      setActiveSummary(summary);
    } catch (err) {
      console.error('Failed to summarize reviews:', err);
    } finally {
      setIsLoading(false);
    }
  }, [summaryCache]);

  return {
    activeSummary,
    isLoading,
    fetchReviewSummary
  };
}
