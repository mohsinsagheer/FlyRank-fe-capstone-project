import { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '../models/mockData';
import type { Product, ProductCategory } from '../models/Product';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export function useShopViewModel(initialSearchTerm: string = '', aiMatchedProductIds?: string[]) {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories: { key: ProductCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All Products', count: MOCK_PRODUCTS.length },
    { key: 'electronics', label: 'Electronics', count: MOCK_PRODUCTS.filter(p => p.category === 'electronics').length },
    { key: 'laptops', label: 'Laptops', count: MOCK_PRODUCTS.filter(p => p.category === 'laptops').length },
    { key: 'boots', label: 'Boots', count: MOCK_PRODUCTS.filter(p => p.category === 'boots').length },
    { key: 'bluetooth', label: 'Bluetooth Devices', count: MOCK_PRODUCTS.filter(p => p.category === 'bluetooth').length },
    { key: 'hair-care', label: 'Hair Care Machines', count: MOCK_PRODUCTS.filter(p => p.category === 'hair-care').length },
    { key: 'sports', label: 'Sports Equipment', count: MOCK_PRODUCTS.filter(p => p.category === 'sports').length }
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // AI Matched products filter if active
        if (aiMatchedProductIds && aiMatchedProductIds.length > 0) {
          if (!aiMatchedProductIds.includes(p.id)) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Search term filter
        if (searchTerm.trim() !== '') {
          const query = searchTerm.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(query);
          const matchesCategory = p.categoryName.toLowerCase().includes(query);
          const matchesBrand = p.brand.toLowerCase().includes(query);
          const matchesDesc = p.description.toLowerCase().includes(query);
          if (!matchesName && !matchesCategory && !matchesBrand && !matchesDesc) {
            return false;
          }
        }

        // Price filter
        if (p.price > priceRange) {
          return false;
        }

        // Rating filter
        if (p.rating.rate < minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
        return (b.isExclusive ? 1 : 0) - (a.isExclusive ? 1 : 0);
      });
  }, [products, selectedCategory, searchTerm, priceRange, minRating, sortBy, aiMatchedProductIds]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setPriceRange(3000);
    setMinRating(0);
    setSortBy('featured');
  };

  return {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    filteredProducts,
    totalCount: filteredProducts.length,
    clearFilters,
    quickViewProduct,
    setQuickViewProduct
  };
}
