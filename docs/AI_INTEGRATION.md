# AI Integration & Safety Architecture

## Overview
The Zenith E-Commerce Platform incorporates Anthropic Claude 3.5 / 3.6 API to deliver 3 core intelligent features:

1. **Natural-Language Shopping Search:** Parses unstructured user shopping intent (e.g. *"Gaming laptop with 120Hz screen under $2200"*) into structured JSON requirements and matches real catalog products.
2. **Multi-Product AI Comparison:** Compares 2 to 4 selected products side-by-side, generating a specification matrix, pros/cons breakdown, target audience suitability, and a final verdict.
3. **AI Review Summaries:** Synthesizes user ratings and customer feedback into sentiment scores, top strengths, minor drawbacks, and purchase advice.

---

## AI Safety & Enforced Output Schemas

To prevent hallucination, prompt injection, and broken rendering, all AI endpoints enforce strict Zod validation:

```typescript
const AISearchSchema = z.object({
  originalQuery: z.string(),
  suggestedCategory: z.enum(['all', 'electronics', 'laptops', 'boots', 'bluetooth', 'hair-care', 'sports']),
  maxPrice: z.number().optional(),
  minRating: z.number().optional(),
  extractedKeywords: z.array(z.string()),
  keyFeatures: z.array(z.string()),
  reasoning: z.string(),
  matchedProductIds: z.array(z.string())
});
```

---

## Graceful Degradation & Fallback Strategy

Core e-commerce functionality operates 100% reliably even if the AI backend server is unreachable, offline, or returns an error.

- If the server endpoint fails or the API key is missing, `aiService.ts` automatically executes deterministic heuristic search and comparison algorithms.
- Users are never shown blank screens or unhandled exceptions.
