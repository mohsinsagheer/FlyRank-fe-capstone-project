import React, { useState } from 'react';
import type { Product } from '../../models/Product';
import type { AIReviewSummary as SummaryType } from '../../models/AI';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { AIReviewSummary } from './AIReviewSummary';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  aiReviewSummary?: SummaryType | null;
  isAiReviewLoading?: boolean;
  onFetchAIReview?: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  aiReviewSummary,
  isAiReviewLoading = false,
  onFetchAIReview
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '90%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Image Gallery */}
          <div>
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[product.image, product.image].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  style={{ width: '60px', height: '60px', borderRadius: '8px', border: '2px solid var(--brand-primary)', cursor: 'pointer', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                {product.categoryName} • {product.brand}
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{product.name}</h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontWeight: 700 }}>{product.rating.rate}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({product.rating.count} verified ratings)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--success)' }}>${product.price}</span>
                {product.originalPrice > product.price && (
                  <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {product.description}
              </p>

              {/* Specifications Table */}
              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.8rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Technical Specifications:</div>
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{key}:</span>
                    <span style={{ fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '0.5rem 0.8rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 0.8rem', fontWeight: 700 }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '0.5rem 0.8rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.75rem' }}
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart (${product.price * quantity})</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  style={{
                    padding: '0.75rem',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                  title="Save to Wishlist"
                >
                  <Heart size={20} color="var(--brand-accent)" fill={isInWishlist ? 'var(--brand-accent)' : 'none'} />
                </button>
              </div>

              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Truck size={14} /> Free Express Delivery</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><ShieldCheck size={14} /> 100% Authentic</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><RefreshCw size={14} /> 30-Day Returns</span>
              </div>
            </div>

          </div>

        </div>

        {/* AI Review Summary Section */}
        {onFetchAIReview && (
          <AIReviewSummary
            product={product}
            summary={aiReviewSummary || null}
            isLoading={isAiReviewLoading}
            onFetch={onFetchAIReview}
          />
        )}
      </div>
    </div>
  );
};
