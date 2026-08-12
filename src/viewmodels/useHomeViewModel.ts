import { useState, useEffect } from 'react';
import { MOCK_EXCLUSIVE_DEALS, MOCK_PLATFORM_QUALITIES, MOCK_SPONSORS, MOCK_PRODUCTS } from '../models/mockData';
import type { ExclusiveDeal } from '../models/Product';

export function useHomeViewModel() {
  const deals = MOCK_EXCLUSIVE_DEALS;
  const qualities = MOCK_PLATFORM_QUALITIES;
  const sponsors = MOCK_SPONSORS;
  const exclusiveProducts = MOCK_PRODUCTS.filter(p => p.isExclusive);

  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-moving screen-length/half-width card carousel timer
  useEffect(() => {
    if (!isPlaying || deals.length === 0) return;

    const interval = setInterval(() => {
      setCurrentDealIndex(prev => (prev + 1) % deals.length);
    }, 5000); // changes deal every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, deals.length]);

  const nextDeal = () => {
    setCurrentDealIndex(prev => (prev + 1) % deals.length);
  };

  const prevDeal = () => {
    setCurrentDealIndex(prev => (prev - 1 + deals.length) % deals.length);
  };

  const currentDeal: ExclusiveDeal = deals[currentDealIndex] || deals[0];

  return {
    deals,
    currentDeal,
    currentDealIndex,
    setCurrentDealIndex,
    isPlaying,
    setIsPlaying,
    nextDeal,
    prevDeal,
    qualities,
    sponsors,
    exclusiveProducts
  };
}
