import React from 'react';
import type { Product } from '../../models/Product';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onToggleWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade-in" style={{ justifyContent: 'flex-end', padding: 0 }} onClick={onClose}>
      <div
        className="glass-panel animate-slide-in-right"
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '100vh',
          background: 'var(--bg-secondary)',
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 0
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={20} color="var(--brand-accent)" fill="var(--brand-accent)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Saved Wishlist ({wishlistItems.length})</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {wishlistItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Heart size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
              <p style={{ fontWeight: 600 }}>Your Wishlist is empty.</p>
              <p style={{ fontSize: '0.85rem' }}>Click the heart icon on products to save items for later!</p>
            </div>
          ) : (
            wishlistItems.map(product => (
              <div
                key={product.id}
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
                <img src={product.image} alt={product.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '6px' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: '1.3' }}>{product.name}</h4>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--brand-primary)' }}>${product.price}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <button
                    onClick={() => {
                      onAddToCart(product);
                    }}
                    className="btn btn-primary"
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                    title="Add to Cart"
                  >
                    <ShoppingCart size={14} />
                  </button>
                  <button
                    onClick={() => onToggleWishlist(product)}
                    style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', textAlign: 'center' }}
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
