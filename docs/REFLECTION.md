# Technical Reflection & Architectural Lessons

## Architectural Successes
1. **MVVM Pattern Discipline:** Separating state and logic into ViewModels (`useShopViewModel`, `useAISearchViewModel`, `useAICompareViewModel`) allowed us to integrate complex AI features cleanly without cluttering UI components or introducing Redux/Zustand overhead.
2. **Server Proxy Security:** Routing Claude API requests through `server.ts` completely isolated secret keys from frontend client bundles while providing server-side Zod output validation.
3. **Resilient Fallback Design:** Implementing local heuristic fallbacks inside `aiService.ts` ensures that natural language search, comparison matrix, and review summaries function 100% reliably even offline or during API degradation.

## Trade-offs & Future Enhancements
- **State Persistence:** Currently wishlist and cart states reside in memory. Adding `localStorage` sync or database persistence would be a logical next step for production scale.
- **RAG / Vector Database Integration:** For larger product catalogs (10,000+ items), embedding products in Pinecone or ChromaDB would enhance vector similarity search performance over in-memory catalog passing.
