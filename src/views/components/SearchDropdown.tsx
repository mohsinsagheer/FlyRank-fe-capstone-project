import React from 'react';
import { MOCK_PRODUCTS } from '../../models/mockData';
import type { Product } from '../../models/Product';
import { ChevronRight } from 'lucide-react';

interface SearchDropdownProps {
  searchTerm: string;
  onSelectProduct: (product: Product) => void;
  onClose: () => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({ searchTerm, onSelectProduct, onClose }) => {
  if (!searchTerm || searchTerm.trim().length < 2) return null;

  const matches = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  return (
    <div
      className="glass-panel animate-fade-in"
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: 0,
        right: 0,
        zIndex: 500,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color-light)',
        boxShadow: 'var(--shadow-lg)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden'
      }}
    >
      <div style={{ padding: '0.6rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
        SEARCH RESULTS FOR "{searchTerm}"
      </div>
      {matches.length === 0 ? (
        <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          No products found matching "{searchTerm}"
        </div>
      ) : (
        matches.map(product => (
          <div
            key={product.id}
            onClick={() => {
              onSelectProduct(product);
              onClose();
            }}
            style={{
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              borderBottom: '1px solid var(--border-color)',
              transition: 'background var(--transition-fast)'
            }}
            className="search-item"
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{product.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{product.categoryName} • {product.brand}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--brand-primary)', fontSize: '0.9rem' }}>${product.price}</span>
              <ChevronRight size={16} color="var(--text-muted)" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};
