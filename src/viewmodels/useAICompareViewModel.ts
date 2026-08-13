import { useState, useCallback } from 'react';
import type { Product } from '../models/Product';
import type { AIComparisonResult } from '../models/AI';
import { aiService } from '../services/aiService';

export function useAICompareViewModel(showToast?: (msg: string) => void) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [isGeneratingComparison, setIsGeneratingComparison] = useState<boolean>(false);
  const [comparisonResult, setComparisonResult] = useState<AIComparisonResult | null>(null);

  const isProductSelected = useCallback((productId: string) => {
    return selectedProducts.some(p => p.id === productId);
  }, [selectedProducts]);

  const toggleSelectProduct = useCallback((product: Product) => {
    setSelectedProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          if (showToast) showToast('You can compare a maximum of 4 products at a time.');
          return prev;
        }
        if (showToast) showToast(`Added "${product.name}" to comparison.`);
        return [...prev, product];
      }
    });
  }, [showToast]);

  const removeProduct = useCallback((productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  const clearSelected = useCallback(() => {
    setSelectedProducts([]);
    setComparisonResult(null);
  }, []);

  const generateComparison = useCallback(async () => {
    if (selectedProducts.length < 2) {
      if (showToast) showToast('Please select at least 2 products to compare.');
      return;
    }

    setIsGeneratingComparison(true);
    setIsCompareModalOpen(true);

    try {
      const result = await aiService.compareProducts(selectedProducts);
      setComparisonResult(result);
    } catch (err) {
      console.error('Failed to generate comparison:', err);
      if (showToast) showToast('Comparison failed. Showing default spec comparison.');
    } finally {
      setIsGeneratingComparison(false);
    }
  }, [selectedProducts, showToast]);

  return {
    selectedProducts,
    isCompareModalOpen,
    setIsCompareModalOpen,
    isGeneratingComparison,
    comparisonResult,
    isProductSelected,
    toggleSelectProduct,
    removeProduct,
    clearSelected,
    generateComparison
  };
}
