import React from 'react';
import type { Product } from '../../models/Product';
import { Heart, ShoppingCart, Eye, Star, Layers } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isCompared?: boolean;
  onToggleCompare?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  isCompared,
  onToggleCompare
}) => {
  return (
    <div
      className="glass-panel glass-panel-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Top Image Container */}
      <div
        style={{
          position: 'relative',
          paddingTop: '75%', // 4:3 aspect ratio
          background: 'var(--bg-tertiary)',
          overflow: 'hidden'
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-normal)'
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1.0)')}
        />

        {/* Category & Badge Overlay */}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.4rem', flexDirection: 'column' }}>
          {product.badge && (
            <span className="badge badge-exclusive" style={{ fontSize: '0.65rem' }}>
              {product.badge}
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="badge badge-discount" style={{ fontSize: '0.65rem' }}>
              -{product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Compare & Wishlist Toggles */}
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', gap: '0.35rem' }}>
          {onToggleCompare && (
            <button
              onClick={() => onToggleCompare(product)}
              style={{
                background: isCompared ? 'var(--brand-primary)' : 'rgba(18, 24, 36, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform var(--transition-fast)',
                color: isCompared ? '#ffffff' : 'var(--text-secondary)'
              }}
              title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
            >
              <Layers size={16} />
            </button>
          )}

          <button
            onClick={() => onToggleWishlist(product)}
            style={{
              background: 'rgba(18, 24, 36, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform var(--transition-fast)'
            }}
            title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart
              size={18}
              color="var(--brand-accent)"
              fill={isInWishlist ? 'var(--brand-accent)' : 'none'}
            />
          </button>
        </div>

        {/* Quick View Button Hover Overlay */}
        <button
          onClick={() => onQuickView(product)}
          className="btn btn-secondary"
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.75rem',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <Eye size={14} />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            {product.categoryName} • {product.brand}
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: '1.4' }}>
            {product.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', color: '#f59e0b' }}>
              <Star size={14} fill="#f59e0b" />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{product.rating.rate}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({product.rating.count} reviews)</span>
          </div>
        </div>

        {/* Price & Add to Cart Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          <div>
            {product.originalPrice > product.price && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ${product.originalPrice}
              </div>
            )}
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              ${product.price}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="btn btn-primary"
            style={{ padding: '0.5rem 0.9rem', fontSize: '0.825rem' }}
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
