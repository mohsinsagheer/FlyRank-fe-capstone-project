import type { Product } from '../models/Product';
import type {
  AISearchRequirement,
  AIComparisonResult,
  AIReviewSummary,
  ProductReview,
  FeatureComparisonRow
} from '../models/AI';

const BASE_URL = '/api/ai';

/**
 * AI Service communicating with server-side proxy API.
 * Includes local heuristic fallbacks to guarantee 100% core uptime even when offline or without API key.
 */
export const aiService = {
  /**
   * AI Feature #1: Natural Language Shopping Search
   */
  async searchWithAI(query: string, catalog: Product[]): Promise<AISearchRequirement> {
    try {
      const response = await fetch(`${BASE_URL}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, products: catalog })
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('AI search API unreachable. Switching to heuristic fallback.', err);
    }

    return this.fallbackSearch(query, catalog);
  },

  /**
   * AI Feature #2: Multi-Product AI Comparison
   */
  async compareProducts(products: Product[]): Promise<AIComparisonResult> {
    try {
      const response = await fetch(`${BASE_URL}/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products })
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('AI compare API unreachable. Switching to local fallback comparison.', err);
    }

    return this.fallbackCompare(products);
  },

  /**
   * AI Feature #3: AI Review Summaries
   */
  async summarizeReviews(product: Product, reviews?: ProductReview[]): Promise<AIReviewSummary> {
    try {
      const response = await fetch(`${BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, reviews })
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('AI review summary API unreachable. Switching to local fallback summary.', err);
    }

    return this.fallbackReviews(product, reviews);
  },

  // -----------------------------------------------------------------
  // HEURISTIC FALLBACK ALGORITHMS (Guarantees Offline Functionality)
  // -----------------------------------------------------------------
  fallbackSearch(query: string, catalog: Product[]): AISearchRequirement {
    const q = query.toLowerCase();
    const keywords = q.split(/\s+/).filter(w => w.length > 2);

    // Price extraction logic (e.g. "under $1000", "below 500")
    let maxPrice: number | undefined;
    const priceMatch = q.match(/(?:under|below|less than|\$)\s*\$?(\d+)/i);
    if (priceMatch && priceMatch[1]) {
      maxPrice = parseInt(priceMatch[1], 10);
    }

    // Category detection heuristic
    let suggestedCategory: any = 'all';
    if (q.includes('laptop') || q.includes('macbook') || q.includes('computer')) suggestedCategory = 'laptops';
    else if (q.includes('tv') || q.includes('screen') || q.includes('display')) suggestedCategory = 'electronics';
    else if (q.includes('boot') || q.includes('shoe') || q.includes('footwear')) suggestedCategory = 'boots';
    else if (q.includes('headphone') || q.includes('earbud') || q.includes('bluetooth') || q.includes('speaker')) suggestedCategory = 'bluetooth';
    else if (q.includes('hair') || q.includes('dryer') || q.includes('styler')) suggestedCategory = 'hair-care';
    else if (q.includes('sport') || q.includes('fitness') || q.includes('treadmill')) suggestedCategory = 'sports';

    // Match products
    const matched = catalog.filter(p => {
      if (suggestedCategory !== 'all' && p.category !== suggestedCategory) return false;
      if (maxPrice !== undefined && p.price > maxPrice) return false;
      const text = `${p.name} ${p.description} ${p.brand} ${Object.values(p.specifications).join(' ')}`.toLowerCase();
      return keywords.some(k => text.includes(k));
    });

    const matchedProductIds = (matched.length > 0 ? matched : catalog.slice(0, 4)).map(p => p.id);

    return {
      originalQuery: query,
      suggestedCategory,
      maxPrice,
      extractedKeywords: keywords,
      keyFeatures: keywords.filter(k => !['for', 'with', 'under', 'the', 'and'].includes(k)),
      reasoning: `Filtered products matching category "${suggestedCategory}"${maxPrice ? ` under $${maxPrice}` : ''} based on keywords: [${keywords.join(', ')}].`,
      matchedProductIds
    };
  },

  fallbackCompare(products: Product[]): AIComparisonResult {
    const productIds = products.map(p => p.id);

    // Extract specification keys
    const allSpecKeys = Array.from(
      new Set(products.flatMap(p => Object.keys(p.specifications || {})))
    );

    const featuresComparison: FeatureComparisonRow[] = [
      {
        featureName: 'Price',
        values: products.reduce((acc, p) => ({ ...acc, [p.id]: `$${p.price}` }), {})
      },
      {
        featureName: 'Rating',
        values: products.reduce((acc, p) => ({ ...acc, [p.id]: `★ ${p.rating.rate} (${p.rating.count} reviews)` }), {})
      },
      {
        featureName: 'Brand',
        values: products.reduce((acc, p) => ({ ...acc, [p.id]: p.brand }), {})
      },
      ...allSpecKeys.map(key => ({
        featureName: key,
        values: products.reduce((acc, p) => ({ ...acc, [p.id]: p.specifications[key] || 'N/A' }), {})
      }))
    ];

    const prosAndCons: Record<string, { pros: string[]; cons: string[] }> = {};
    const bestFor: Record<string, string> = {};

    let bestProduct = products[0];
    let highestRating = 0;

    products.forEach(p => {
      if (p.rating.rate > highestRating) {
        highestRating = p.rating.rate;
        bestProduct = p;
      }

      prosAndCons[p.id] = {
        pros: [
          `Premium ${p.brand} build quality`,
          `Rated ${p.rating.rate}/5.0 by verified buyers`,
          `${p.discountPercentage > 0 ? `${p.discountPercentage}% active discount` : 'Solid price-to-performance'}`
        ],
        cons: [
          p.price > 1000 ? 'Higher price tier investment' : 'Standard warranty terms'
        ]
      };

      bestFor[p.id] = `Best for users seeking a reliable ${p.categoryName} solution from ${p.brand}.`;
    });

    return {
      productIds,
      overview: `Comparison of ${products.length} products ranging from $${Math.min(...products.map(p => p.price))} to $${Math.max(...products.map(p => p.price))}.`,
      featuresComparison,
      prosAndCons,
      bestFor,
      verdict: `The ${bestProduct.name} leads overall with a top rating of ${bestProduct.rating.rate}/5.0 and strong build specifications.`,
      recommendedProductId: bestProduct.id
    };
  },

  fallbackReviews(product: Product, reviews?: ProductReview[]): AIReviewSummary {
    const list = reviews || [];
    const avgRating = product.rating.rate;
    const sentimentScore = Math.min(100, Math.round((avgRating / 5) * 100));

    return {
      productId: product.id,
      sentimentScore,
      totalReviewsAnalyzed: list.length || product.rating.count,
      keyPros: [
        'Exceptional build quality and sleek design',
        'Matches advertised specifications',
        'Strong performance in everyday usage'
      ],
      keyCons: [
        product.price > 800 ? 'Premium price point' : 'Limited color variations'
      ],
      summaryVerdict: `Customers strongly praise the ${product.name} for its performance and ${product.brand} reliability, giving it a ${avgRating} star rating.`
    };
  }
};
