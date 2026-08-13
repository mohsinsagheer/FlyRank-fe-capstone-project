import { useState, useCallback } from 'react';
import type { Product } from '../models/Product';
import type { AISearchRequirement } from '../models/AI';
import { aiService } from '../services/aiService';

export function useAISearchViewModel(allProducts: Product[]) {
  const [nlQuery, setNlQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [structuredRequirements, setStructuredRequirements] = useState<AISearchRequirement | null>(null);
  const [aiMatchedProducts, setAiMatchedProducts] = useState<Product[]>([]);
  const [isAiSearchActive, setIsAiSearchActive] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const executeAISearch = useCallback(async (queryToExecute?: string) => {
    const targetQuery = queryToExecute !== undefined ? queryToExecute : nlQuery;
    if (!targetQuery || targetQuery.trim() === '') return;

    setIsSearching(true);
    setErrorMsg(null);

    try {
      const result = await aiService.searchWithAI(targetQuery, allProducts);
      setStructuredRequirements(result);

      // Filter matched products based on result.matchedProductIds
      const matched = allProducts.filter(p => result.matchedProductIds.includes(p.id));
      setAiMatchedProducts(matched.length > 0 ? matched : allProducts);
      setIsAiSearchActive(true);
    } catch (err: any) {
      console.error('AI search failed:', err);
      setErrorMsg('Could not process AI natural language search. Falling back to keyword search.');
      setIsAiSearchActive(false);
    } finally {
      setIsSearching(false);
    }
  }, [nlQuery, allProducts]);

  const clearAISearch = useCallback(() => {
    setNlQuery('');
    setStructuredRequirements(null);
    setAiMatchedProducts([]);
    setIsAiSearchActive(false);
    setErrorMsg(null);
  }, []);

  return {
    nlQuery,
    setNlQuery,
    isSearching,
    structuredRequirements,
    aiMatchedProducts,
    isAiSearchActive,
    errorMsg,
    executeAISearch,
    clearAISearch
  };
}
