import { describe, it, expect } from 'vitest';
import { aiService } from '../aiService';
import { MOCK_PRODUCTS } from '../../models/mockData';

describe('aiService - Fallback Algorithms', () => {
  it('should fall back gracefully and extract category and keywords for laptops', async () => {
    const query = 'I need a high performance laptop under $2500';
    const result = await aiService.searchWithAI(query, MOCK_PRODUCTS);

    expect(result).toBeDefined();
    expect(result.suggestedCategory).toBe('laptops');
    expect(result.maxPrice).toBe(2500);
    expect(result.matchedProductIds.length).toBeGreaterThan(0);
    expect(result.reasoning).toContain('laptops');
  });

  it('should generate fallback comparison for selected products', async () => {
    const p1 = MOCK_PRODUCTS[0];
    const p2 = MOCK_PRODUCTS[1];

    const result = await aiService.compareProducts([p1, p2]);

    expect(result).toBeDefined();
    expect(result.productIds).toContain(p1.id);
    expect(result.productIds).toContain(p2.id);
    expect(result.featuresComparison.length).toBeGreaterThan(0);
    expect(result.verdict).toBeDefined();
  });

  it('should generate fallback review summary for a product', async () => {
    const product = MOCK_PRODUCTS[0];
    const summary = await aiService.summarizeReviews(product);

    expect(summary).toBeDefined();
    expect(summary.productId).toBe(product.id);
    expect(summary.sentimentScore).toBeGreaterThanOrEqual(0);
    expect(summary.keyPros.length).toBeGreaterThan(0);
  });
});
