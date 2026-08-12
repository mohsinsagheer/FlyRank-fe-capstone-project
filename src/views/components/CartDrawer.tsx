import React from 'react';
import type { CartItem, CartSummary } from '../../models/Cart';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  summary: CartSummary;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  promoCode: string;
  onPromoCodeChange: (code: string) => void;
  onApplyPromo: () => void;
  onCheckout: () => void;
  isCheckoutOpen: boolean;
  onCloseCheckout: () => void;
  checkoutSuccess: boolean;
  onConfirmCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  summary,
  onUpdateQuantity,
  onRemoveItem,
  promoCode,
  onPromoCodeChange,
  onApplyPromo,
  onCheckout,
  isCheckoutOpen,
  onCloseCheckout,
  checkoutSuccess,
  onConfirmCheckout
}) => {
  if (!isOpen) return null;

  const freeShippingProgress = Math.min(100, (summary.subtotal / 99) * 100);

  return (
    <div className="modal-overlay animate-fade-in" style={{ justifyContent: 'flex-end', padding: 0 }} onClick={onClose}>
      <div
        className="glass-panel animate-slide-in-right"
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100vh',
          background: 'var(--bg-secondary)',
          borderRadius: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 0
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Your Shopping Cart ({summary.itemCount})</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div style={{ padding: '0.85rem 1.5rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
          {summary.subtotal >= 99 ? (
            <div style={{ color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} />
              <span>Congratulations! You unlocked FREE Express Global Shipping!</span>
            </div>
          ) : (
            <div>
              <span>Add <strong>${(99 - summary.subtotal).toFixed(2)}</strong> more to get FREE Express Shipping!</span>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-primary)', borderRadius: '3px', marginTop: '0.4rem', overflow: 'hidden' }}>
                <div style={{ width: `${freeShippingProgress}%`, height: '100%', background: 'var(--brand-gradient)', transition: 'width 0.3s' }} />
              </div>
            </div>
          )}
        </div>

        {/* Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
              <p style={{ fontWeight: 600 }}>Your cart is empty.</p>
              <p style={{ fontSize: '0.85rem' }}>Discover exclusive deals on laptops, boots, and sports gear!</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.product.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.2rem', lineHeight: '1.3' }}>
                    {item.product.name}
                  </h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--brand-primary)', fontWeight: 800 }}>
                    ${item.product.price}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'white', width: '22px', height: '22px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'white', width: '22px', height: '22px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Summary */}
        {cartItems.length > 0 && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
            
            {/* Promo Code input */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Promo Code (ZENITH20)"
                value={promoCode}
                onChange={e => onPromoCodeChange(e.target.value)}
                style={{
                  flex: 1,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'white',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.4rem 0.6rem',
                  fontSize: '0.8rem'
                }}
              />
              <button
                onClick={onApplyPromo}
                className="btn btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                Apply
              </button>
            </div>

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>${summary.subtotal.toFixed(2)}</span>
              </div>
              {summary.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                  <span>Discount</span>
                  <span>-${summary.discount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Estimated Tax (8%)</span>
                <span>${summary.tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Express Shipping</span>
                <span>{summary.shipping === 0 ? 'FREE' : `$${summary.shipping}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                <span>Total Amount</span>
                <span>${summary.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>

      {/* Simulated Checkout Modal */}
      {isCheckoutOpen && (
        <div className="modal-overlay" style={{ zIndex: 1200 }}>
          <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
            {checkoutSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={64} color="var(--success)" style={{ margin: '0 auto 1rem auto' }} />
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.5rem' }}>Order Confirmed!</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Thank you! Your order <strong>ZEN-{(Math.floor(Math.random()*90000)+10000)}</strong> has been placed.
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Redirecting to order tracker...</p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Instant One-Click Checkout</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Simulated secure payment via Zenith Encrypted Gateway. Total: <strong>${summary.total.toFixed(2)}</strong>
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <input
                    type="text"
                    defaultValue="Alex Wright"
                    placeholder="Full Name"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', padding: '0.6rem', borderRadius: '6px' }}
                  />
                  <input
                    type="email"
                    defaultValue="alex@example.com"
                    placeholder="Email Address"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', padding: '0.6rem', borderRadius: '6px' }}
                  />
                  <input
                    type="text"
                    defaultValue="4000 1234 5678 9010"
                    placeholder="Card Number"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', padding: '0.6rem', borderRadius: '6px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={onCloseCheckout} className="btn btn-secondary" style={{ flex: 1 }}>
                    Cancel
                  </button>
                  <button onClick={onConfirmCheckout} className="btn btn-primary" style={{ flex: 1 }}>
                    Confirm Payment (${summary.total.toFixed(2)})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
