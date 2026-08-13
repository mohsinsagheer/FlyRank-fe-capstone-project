import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useShopViewModel } from '../useShopViewModel';

describe('useShopViewModel', () => {
  it('should filter products by category', () => {
    const { result } = renderHook(() => useShopViewModel());

    expect(result.current.selectedCategory).toBe('all');
    expect(result.current.filteredProducts.length).toBeGreaterThan(0);

    act(() => {
      result.current.setSelectedCategory('laptops');
    });

    expect(result.current.selectedCategory).toBe('laptops');
    expect(result.current.filteredProducts.every(p => p.category === 'laptops')).toBe(true);
  });

  it('should filter products by AI matched product IDs', () => {
    const aiMatchedIds = ['prod-elec-1', 'prod-lap-1'];
    const { result } = renderHook(() => useShopViewModel('', aiMatchedIds));

    expect(result.current.filteredProducts.length).toBe(2);
    expect(result.current.filteredProducts.map(p => p.id)).toEqual(expect.arrayContaining(aiMatchedIds));
  });

  it('should reset filters correctly', () => {
    const { result } = renderHook(() => useShopViewModel());

    act(() => {
      result.current.setSelectedCategory('boots');
      result.current.setSearchTerm('tactical');
      result.current.setPriceRange(500);
    });

    expect(result.current.selectedCategory).toBe('boots');

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.selectedCategory).toBe('all');
    expect(result.current.searchTerm).toBe('');
    expect(result.current.priceRange).toBe(3000);
  });
});
