import React from 'react';
import type { PageView } from '../../viewmodels/useThemeViewModel';
import { Globe, Share2, Mail, Shield, Lock, Award, CheckCircle2 } from 'lucide-react';
import applepay from '../../assets/applepay.png';
import gpay from '../../assets/gpay.png';
import mastercard from '../../assets/mastercard.jpg';
import paypal from '../../assets/paypal.png';
import stripe from '../../assets/stripe.png';
import visacard from '../../assets/visacard.png';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      style={{
        background: 'var(--footer-bg)',
        borderTop: '1px solid var(--footer-border)',
        padding: '4rem 0 2rem 0',
        marginTop: '5rem',
        color: 'var(--footer-text-secondary)'
      }}
    >
      <div className="container">

        {/* TOP BRAND BRANDING & INTRO SECTION */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '780px',
            margin: '0 auto 3.5rem auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem'
          }}
        >
          {/* Prominent Zenith Brand Logo */}
          <div
            onClick={() => onNavigate('home')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem'
            }}
          >
            <div
              className="animate-logo-badge"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 900,
                fontSize: '1.75rem',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              M
            </div>
            <span
              className="animate-logo-shimmer"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.4rem',
                fontWeight: 900,
                letterSpacing: '0.08em'
              }}
            >
              MOHSIN
            </span>
          </div>

          {/* Intro Paragraph */}
          <p style={{ fontSize: '0.95rem', lineHeight: '1.75', color: 'var(--footer-text-secondary)' }}>
            MOHSIN is a next-generation e-commerce ecosystem dedicated to curated tech electronics, tactical boots,
            flagship laptops, high-performance bluetooth audio, professional hair grooming machines, and authentic sports gear.
            We pair premium product selections with seamless global delivery, guaranteed authenticity, and 24/7 priority customer support.
          </p>

          {/* Social Links Bar */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: <Globe size={18} />, label: 'Global Portal', href: 'http://mohsin-sagheer.vercel.app/' },
              { icon: <Share2 size={18} />, label: 'Social Network', href: 'https://www.linkedin.com/in/mohsin-sagheer-7a2558341/' },
              { icon: <Mail size={18} />, label: 'Support Email', href: 'mailto:[mohsinca2008@gmail.com]' }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                title={social.label}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--footer-border)',
                  color: 'var(--footer-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--brand-primary)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--footer-text-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--footer-border)';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS & TRUST GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            padding: '2.5rem 0',
            borderTop: '1px solid var(--footer-border)',
            borderBottom: '1px solid var(--footer-border)'
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: 'var(--footer-text-primary)', letterSpacing: '0.02em' }}>Product Categories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li className="footer-nav-link" onClick={() => onNavigate('shop')}>Laptops & Computing</li>
              <li className="footer-nav-link" onClick={() => onNavigate('shop')}>Boots & Tactical Footwear</li>
              <li className="footer-nav-link" onClick={() => onNavigate('shop')}>Bluetooth Audio & Speakers</li>
              <li className="footer-nav-link" onClick={() => onNavigate('shop')}>Hair Dryers & Trimmers</li>
              <li className="footer-nav-link" onClick={() => onNavigate('shop')}>Sports Equipment & Gear</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: 'var(--footer-text-primary)', letterSpacing: '0.02em' }}>Customer Care</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li className="footer-nav-link" onClick={() => onNavigate('track-order')}>Track My Order</li>
              <li className="footer-nav-link" onClick={() => onNavigate('policy')}>30-Day Returns & Refunds</li>
              <li className="footer-nav-link" onClick={() => onNavigate('policy')}>Shipping & Express Delivery</li>
              <li className="footer-nav-link" onClick={() => onNavigate('policy')}>Privacy & Data Standards</li>
              <li className="footer-nav-link" onClick={() => onNavigate('policy')}>Terms of Service</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: 'var(--footer-text-primary)', letterSpacing: '0.02em' }}>Trust & Security</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Lock size={18} color="var(--success)" />
                <span style={{ color: 'var(--footer-text-primary)' }}>256-bit SSL Encryption</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Award size={18} color="var(--brand-primary)" />
                <span style={{ color: 'var(--footer-text-primary)' }}>100% Factory Authentic</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Shield size={18} color="var(--warning)" />
                <span style={{ color: 'var(--footer-text-primary)' }}>Full Buyer Warranty Protection</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: 'var(--footer-text-primary)', letterSpacing: '0.02em' }}>Payment Methods</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.85rem', color: 'var(--footer-text-secondary)' }}>We support global card processing & digital wallets:</p>

            {/* Styled Payment Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.12rem' }}>
              {[
                { name: 'VISA', src: visacard },
                { name: 'MASTERCARD', src: mastercard },
                { name: 'PAYPAL', src: paypal },
                { name: 'APPLE PAY', src: applepay },
                { name: 'G-PAY', src: gpay },
                { name: 'STRIPE', src: stripe }
              ].map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(220, 147, 147, 0.07)',
                    border: '1px rgba(220, 147, 147, 0.07)',
                    borderRadius: '6px',
                    padding: '0.3rem 0.3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '45px',
                    minWidth: '60px'
                  }}
                >
                  <img src={card.src} alt={card.name} style={{ height: '100%', objectFit: 'cover', borderRadius: '2px' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL, STYLING & COPYRIGHT FOOTER */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--footer-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--brand-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '1rem'
                }}
              >
                M
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--footer-text-primary)' }}>
                <h4 style={{ color: "#FF0084" }}>MOHSIN Inc.</h4>
                <li>All rights reserved. © 2026</li>
              </span>
            </div>

            {/* Formatted Legal Link Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.825rem' }}>
              {[
                { label: 'Privacy Policy', page: 'policy' as PageView },
                { label: 'Terms of Service', page: 'policy' as PageView },
                { label: 'Return Policy', page: 'policy' as PageView },
                { label: 'Track Order', page: 'track-order' as PageView }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate(item.page)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--footer-border)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.35rem 0.85rem',
                    color: 'var(--footer-text-secondary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = 'var(--brand-primary)';
                    e.currentTarget.style.background = 'rgba(79, 70, 229, 0.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--footer-text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--footer-border)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              fontSize: '0.775rem',
              color: 'rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <span>Engineered with Precision of FlyRank AI</span>
            <CheckCircle2 size={13} color="var(--success)" />
          </div>
        </div>

      </div>
      <style>{`
        .footer-nav-link {
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-block;
          width: fit-content;
        }
        .footer-nav-link:hover {
          color: var(--brand-primary);
          text-decoration: underline;
          text-underline-offset: 4px;
        }
      `}</style>
    </footer>
  );
};
