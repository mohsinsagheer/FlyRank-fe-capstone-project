import { useState, useMemo } from 'react';
import type { Product } from '../models/Product';
import type { CartItem, CartSummary } from '../models/Cart';

export function useCartViewModel(onToastNotification?: (msg: string) => void) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Initial demo cart item for seamless experience
    {
      product: {
        id: 'prod-bt-1',
        name: 'SonicAir Pods Max Wireless Noise Cancelling',
        category: 'bluetooth',
        categoryName: 'Bluetooth Devices',
        price: 279,
        originalPrice: 349,
        rating: { rate: 4.9, count: 540 },
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        description: 'Industry-leading Active Noise Cancellation',
        specifications: {},
        isExclusive: true,
        inStock: true,
        brand: 'Apple',
        discountPercentage: 20
      },
      quantity: 1
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0); // dollar amount
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    if (onToastNotification) {
      onToastNotification(`Added "${product.name}" to your cart!`);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountApplied(0);
    setPromoCode('');
  };

  const applyPromoCode = () => {
    if (promoCode.trim().toUpperCase() === 'ZENITH20') {
      setDiscountApplied(50);
      if (onToastNotification) onToastNotification('Promo code ZENITH20 applied! $50 OFF');
    } else if (promoCode.trim().toUpperCase() === 'FLYRANK10') {
      setDiscountApplied(25);
      if (onToastNotification) onToastNotification('Promo code FLYRANK10 applied! $25 OFF');
    } else {
      if (onToastNotification) onToastNotification('Invalid promo code. Try "ZENITH20" or "FLYRANK10"');
    }
  };

  const summary: CartSummary = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.08);
    const shipping = subtotal > 99 || subtotal === 0 ? 0 : 15;
    const total = Math.max(0, subtotal + tax + shipping - discountApplied);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      tax,
      shipping,
      discount: discountApplied,
      total,
      itemCount
    };
  }, [cartItems, discountApplied]);

  const processCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const confirmCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setIsCheckoutModalOpen(false);
      setIsCartOpen(false);
      clearCart();
    }, 2500);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    summary,
    promoCode,
    setPromoCode,
    applyPromoCode,
    discountApplied,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    checkoutSuccess,
    processCheckout,
    confirmCheckout
  };
}
