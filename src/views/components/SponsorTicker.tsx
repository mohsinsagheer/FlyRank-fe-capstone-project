import React from 'react';
import type { SponsorBrand } from '../../models/Sponsor';
import { Zap } from 'lucide-react';

interface SponsorTickerProps {
  sponsors: SponsorBrand[];
}

export const SponsorTicker: React.FC<SponsorTickerProps> = ({ sponsors }) => {
  // Duplicate array to ensure seamless infinite looping animation marquee
  const tickerItems = [...sponsors, ...sponsors];

  return (
    <div style={{ margin: '2.25rem 0', overflow: 'hidden' }}>
      <div
        style={{
          padding: '1.15rem 0',
          overflow: 'hidden',
          borderRadius: 'var(--radius-md)',
          position: 'relative',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)'
        }}
      >
        {/* Left and Right Fade Gradients */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '70px', background: 'linear-gradient(to right, #ffffff, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '70px', background: 'linear-gradient(to left, #ffffff, transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <div className="animate-marquee" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {tickerItems.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                boxShadow: '0 1px 4px rgba(37, 99, 235, 0.06)',
                minWidth: '175px',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Zap size={16} color="var(--brand-primary)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.04em', color: '#0f172a' }}>
                  {brand.name}
                </div>
                <div style={{ fontSize: '0.725rem', color: '#64748b' }}>{brand.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
