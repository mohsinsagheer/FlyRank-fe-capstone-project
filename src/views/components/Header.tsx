import React from 'react';

interface HeaderProps {
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
  return (
    <header className="header-wrapper" style={{ borderBottom: '1px solid var(--border-color)', background: '#ffffff' }}>
      {/* Main Header starting with Platform Brand Logo at the top */}
      <div className="container" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          onClick={onNavigateHome}
          style={{
            cursor: 'pointer',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.2rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              className="animate-logo-badge"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 900,
                fontSize: '1.6rem',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              M
            </div>
            <span
              className="animate-logo-shimmer"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.25rem',
                fontWeight: 900,
                letterSpacing: '0.08em'
              }}
            >
              MOHSIN
            </span>
          </div>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--text-muted)', fontWeight: 700 }}>
            PREMIUM GLOBAL E-COMMERCE ECOSYSTEM
          </span>
        </div>
      </div>
    </header>
  );
};
