import React from 'react';
import type { ExclusiveDeal } from '../../models/Product';
import { Sparkles, Clock, ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Tag, CheckCircle2 } from 'lucide-react';

interface HeroCarouselProps {
  deals: ExclusiveDeal[];
  currentDeal: ExclusiveDeal;
  currentIndex: number;
  onSelectIndex: (idx: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClaimDeal: (deal: ExclusiveDeal) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  deals,
  currentDeal,
  currentIndex,
  onSelectIndex,
  onNext,
  onPrev,
  isPlaying,
  onTogglePlay,
  onClaimDeal
}) => {
  if (!currentDeal) return null;

  return (
    <div className="hero-carousel-container" style={{ margin: '1.5rem 0 3rem 0' }}>
      <div
        className="glass-panel"
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid var(--border-color-light)',
          background: 'linear-gradient(135deg, rgba(74, 25, 105, 0.95) 0%, rgba(25, 51, 97, 0.85) 100%)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            minHeight: '460px',
            alignItems: 'center'
          }}
        >

          {/* Left Column: Half Width Deal Details */}
          <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>

            {/* Top Deal Badge & Timer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="badge badge-exclusive" style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}>
                <Tag size={12} style={{ marginRight: '4px' }} />
                {currentDeal.discountBadge}
              </span>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.25rem 0.7rem',
                  fontSize: '0.775rem',
                  fontWeight: 700
                }}
              >
                <Clock size={13} className="animate-pulse-glow" />
                <span>Ends in: {String(currentDeal.timerHours).padStart(2, '0')}h : {String(currentDeal.timerMinutes).padStart(2, '0')}m : {String(currentDeal.timerSeconds).padStart(2, '0')}s</span>
              </div>
            </div>

            {/* Deal Title & Subtitle */}
            <h2
              style={{
                fontSize: '2.25rem',
                lineHeight: '1.2',
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800
              }}
            >
              {currentDeal.title}
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.25rem' }}>
              {currentDeal.subtitle}
            </p>

            {/* Feature Bullet Points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
              {currentDeal.featureBullets.map((bullet, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={16} color="var(--brand-secondary)" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Pricing & CTA Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginRight: '0.5rem' }}>
                  ${currentDeal.originalPrice}
                </span>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--success)' }}>
                  ${currentDeal.dealPrice}
                </span>
              </div>

              <button
                onClick={() => onClaimDeal(currentDeal)}
                className="btn btn-primary animate-pulse-glow"
                style={{ padding: '0.85rem 1.75rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
              >
                <Sparkles size={18} />
                <span>Claim Exclusive Deal</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </div>

          {/* Right Column: Half Width Product Picture Showcase */}
          <div
            style={{
              position: 'relative',
              height: '100%',
              minHeight: '340px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)'
            }}
          >
            {/* Glowing Ambient Backdrop */}
            <div
              style={{
                position: 'absolute',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                background: 'var(--brand-gradient)',
                filter: 'blur(70px)',
                opacity: 0.35,
                zIndex: 0
              }}
            />

            {/* High Impact Changing Product Image */}
            <img
              src={currentDeal.bannerImage}
              alt={currentDeal.title}
              key={currentDeal.id}
              className="animate-fade-in animate-float"
              style={{
                maxHeight: '360px',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 1,
                border: '1px solid var(--border-color-light)'
              }}
            />

            {/* Auto Carousel Controls Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                zIndex: 3,
                background: 'rgba(0,0,0,0.5)',
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <button
                onClick={onPrev}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}
                title="Previous Deal"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={onTogglePlay}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}
                title={isPlaying ? 'Pause Auto Slide' : 'Play Auto Slide'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <button
                onClick={onNext}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}
                title="Next Deal"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Carousel Indicators Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', background: 'rgba(0,0,0,0.3)' }}>
          {deals.map((_, idx) => (
            <div
              key={idx}
              onClick={() => onSelectIndex(idx)}
              style={{
                height: '4px',
                width: idx === currentIndex ? '32px' : '10px',
                borderRadius: '2px',
                background: idx === currentIndex ? 'var(--brand-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)'
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
