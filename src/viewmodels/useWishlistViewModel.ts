import { useState } from 'react';
import type { Product } from '../models/Product';

export function useWishlistViewModel(onToastNotification?: (msg: string) => void) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const toggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        if (onToastNotification) onToastNotification(`Removed "${product.name}" from Wishlist`);
        return prev.filter(p => p.id !== product.id);
      } else {
        if (onToastNotification) onToastNotification(`Saved "${product.name}" to Wishlist!`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(p => p.id === productId);
  };

  return {
    wishlistItems,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    isInWishlist,
    wishlistCount: wishlistItems.length
  };
}
