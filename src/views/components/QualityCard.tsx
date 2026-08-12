import React from 'react';
import type { PlatformQuality } from '../../models/Sponsor';
import { Truck, ShieldCheck, RefreshCw, Headphones, Award } from 'lucide-react';

interface QualityCardProps {
  qualities: PlatformQuality[];
}

export const QualityCard: React.FC<QualityCardProps> = ({ qualities }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Truck': return <Truck size={22} color="var(--brand-primary)" />;
      case 'ShieldCheck': return <ShieldCheck size={22} color="var(--success)" />;
      case 'RefreshCw': return <RefreshCw size={22} color="var(--brand-secondary)" />;
      case 'Headphones': return <Headphones size={22} color="var(--brand-accent)" />;
      default: return <Award size={22} color="var(--warning)" />;
    }
  };

  return (
    <div style={{ margin: '2.5rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <span className="badge badge-exclusive" style={{ marginBottom: '0.35rem', fontSize: '0.7rem' }}>ZENITH ASSURANCE</span>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Platform Quality & Service Guarantees</h3>
      </div>

      {/* Compact Single-Row Flex Container with Entrance & Float Animations */}
      <div
        className="quality-row-container"
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '1rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          scrollbarWidth: 'none'
        }}
      >
        {qualities.map((q, idx) => (
          <div
            key={q.id}
            className="glass-panel quality-card-item"
            style={{
              flex: '1 1 0',
              minWidth: '220px',
              padding: '0.9rem 1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              borderRadius: 'var(--radius-md)',
              background: '#ffffff',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-color)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: `qualityCardSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s both`
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                minWidth: '42px',
                borderRadius: '12px',
                background: 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
            >
              {getIcon(q.iconName)}
            </div>

            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {q.highlightText}
              </div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700, margin: '0.1rem 0 0.25rem 0', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {q.title}
              </h4>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {q.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes qualityCardSlide {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .quality-card-item:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 25px rgba(79, 70, 229, 0.15);
          border-color: var(--brand-primary) !important;
        }
        @media (max-width: 900px) {
          .quality-row-container {
            flex-wrap: nowrap;
          }
        }
      `}</style>
    </div>
  );
};
