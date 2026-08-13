import React from 'react';
import adidas from '../../assets/brands/adidas.png';
import apple from '../../assets/brands/apple.png';
import dyson from '../../assets/brands/dyson.png';
import nike from '../../assets/brands/nike.png';
import philips from '../../assets/brands/philips.png';
import razer from '../../assets/brands/razer.png';
import samsung from '../../assets/brands/samsung.png';
import sony from '../../assets/brands/sony.png';

interface SponsorTickerProps {
  sponsors?: any; // Kept to avoid breaking parent component prop passing
}

const brandLogos = [
  { name: 'Adidas', src: adidas },
  { name: 'Apple', src: apple },
  { name: 'Dyson', src: dyson },
  { name: 'Nike', src: nike },
  { name: 'Philips', src: philips },
  { name: 'Razer', src: razer },
  { name: 'Samsung', src: samsung },
  { name: 'Sony', src: sony },
];

export const SponsorTicker: React.FC<SponsorTickerProps> = () => {
  // Duplicate array to ensure seamless infinite looping animation marquee
  const tickerItems = [...brandLogos, ...brandLogos];

  return (
    <div style={{ margin: '2.25rem 0', overflow: 'hidden' }}>
      <div
        style={{
          padding: '1.5rem 0',
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
              key={`${brand.name}-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.10rem',
                borderRadius: 'var(--radius-sm)',
                background: '#ffffffff',
                border: '1px solid #ffffffff',
                boxShadow: '0 1px 4px #ffffffff',
                width: '200px',
                height: '120px',
                flexShrink: 0
              }}
            >
              <img
                src={brand.src}
                alt={brand.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
