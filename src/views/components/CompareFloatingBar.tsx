import React from 'react';
import { Sparkles, X, Layers } from 'lucide-react';
import type { Product } from '../../models/Product';

interface CompareFloatingBarProps {
  selectedProducts: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onCompare: () => void;
}

export const CompareFloatingBar: React.FC<CompareFloatingBarProps> = ({
  selectedProducts,
  onRemove,
  onClear,
  onCompare
}) => {
  if (selectedProducts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 900,
      background: 'var(--nav-bg)',
      color: '#ffffff',
      padding: '0.75rem 1.25rem',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      maxWidth: '90vw',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      animation: 'slideUp 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Layers size={18} style={{ color: 'var(--brand-primary)' }} />
        <span style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
          Compare ({selectedProducts.length}/4)
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '2px' }}>
        {selectedProducts.map(p => (
          <div key={p.id} style={{
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.25rem 0.5rem 0.25rem 0.35rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.8rem'
          }}>
            <img src={p.image} alt={p.name} style={{ width: '24px', height: '24px', objectFit: 'cover', borderRadius: '4px' }} />
            <span style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {p.name}
            </span>
            <button
              onClick={() => onRemove(p.id)}
              style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
        <button
          onClick={onClear}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}
        >
          Clear
        </button>
        <button
          onClick={onCompare}
          disabled={selectedProducts.length < 2}
          style={{
            background: selectedProducts.length >= 2 ? 'linear-gradient(135deg, #2563eb, #ec4899)' : 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '0.5rem 1rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: selectedProducts.length >= 2 ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            whiteSpace: 'nowrap'
          }}
        >
          <Sparkles size={16} />
          Compare with AI
        </button>
      </div>
    </div>
  );
};
