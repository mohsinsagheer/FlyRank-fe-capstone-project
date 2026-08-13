import React from 'react';
import { X, Sparkles, ShoppingCart, Award } from 'lucide-react';
import type { Product } from '../../models/Product';
import type { AIComparisonResult } from '../../models/AI';

interface AICompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  result: AIComparisonResult | null;
  isLoading: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const AICompareModal: React.FC<AICompareModalProps> = ({
  isOpen,
  onClose,
  products,
  result,
  isLoading,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '1100px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-tertiary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #2563eb, #ec4899)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', color: '#fff' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                AI Product Comparison Analysis
              </h2>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Side-by-side specifications, pros & cons, and target recommendations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <Sparkles size={40} className="spin-animation" style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }} />
              <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Analyzing Product Specifications...</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Claude AI is comparing technical benchmarks, features, and value.
              </p>
            </div>
          ) : result ? (
            <div>
              {/* Overall AI Verdict Box */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)',
                border: '1px solid rgba(37, 99, 235, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  <Award size={20} /> AI Recommendation Verdict
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {result.verdict}
                </p>
              </div>

              {/* Product Header Cards Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `200px repeat(${products.length}, 1fr)`,
                gap: '1rem',
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Product
                </div>
                {products.map(p => {
                  const isWinner = result.recommendedProductId === p.id;
                  return (
                    <div key={p.id} style={{
                      background: isWinner ? 'rgba(37, 99, 235, 0.05)' : 'var(--bg-tertiary)',
                      border: isWinner ? '2px solid var(--brand-primary)' : '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      textAlign: 'center',
                      position: 'relative'
                    }}>
                      {isWinner && (
                        <span style={{
                          position: 'absolute',
                          top: '-10px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'var(--brand-primary)',
                          color: '#fff',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          textTransform: 'uppercase'
                        }}>
                          Top Pick
                        </span>
                      )}
                      <img src={p.image} alt={p.name} style={{ width: '80px', height: '80px', objectFit: 'contain', margin: '0 auto 0.5rem' }} />
                      <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', height: '2.6em', overflow: 'hidden' }}>
                        {p.name}
                      </h4>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '0.75rem' }}>
                        ${p.price}
                      </div>
                      <button
                        onClick={() => onAddToCart(p, 1)}
                        style={{
                          width: '100%',
                          background: 'var(--brand-primary)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.45rem',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Target Audience Best For Section */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  🎯 Best Suited For
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: `200px repeat(${products.length}, 1fr)`, gap: '1rem' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Ideal Use Case</div>
                  {products.map(p => (
                    <div key={p.id} style={{ background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {result.bestFor[p.id] || 'Standard user use-case.'}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros & Cons Section */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  ⚖️ Pros & Cons Comparison
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: `200px repeat(${products.length}, 1fr)`, gap: '1rem' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Key Highlights</div>
                  {products.map(p => {
                    const itemProsCons = result.prosAndCons[p.id] || { pros: [], cons: [] };
                    return (
                      <div key={p.id} style={{ background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--success)', marginBottom: '0.35rem' }}>Pros:</div>
                        <ul style={{ margin: '0 0 0.5rem 1rem', padding: 0, color: 'var(--text-secondary)' }}>
                          {itemProsCons.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                        </ul>
                        <div style={{ fontWeight: 600, color: 'var(--error)', marginBottom: '0.35rem' }}>Cons:</div>
                        <ul style={{ margin: '0 0 0 1rem', padding: 0, color: 'var(--text-muted)' }}>
                          {itemProsCons.cons.map((con, i) => <li key={i}>{con}</li>)}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Feature Specifications Matrix Table */}
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  📊 Detailed Feature Matrix
                </h3>
                <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  {result.featuresComparison.map((row, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: `200px repeat(${products.length}, 1fr)`,
                        gap: '1rem',
                        padding: '0.75rem 1rem',
                        background: idx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-tertiary)',
                        borderBottom: idx < result.featuresComparison.length - 1 ? '1px solid var(--border-color-light)' : 'none',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.featureName}</div>
                      {products.map(p => (
                        <div key={p.id} style={{ color: 'var(--text-secondary)' }}>
                          {row.values[p.id] || 'N/A'}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
