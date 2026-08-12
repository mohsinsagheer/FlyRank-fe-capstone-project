import React from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { QualityCard } from '../components/QualityCard';
import { SponsorTicker } from '../components/SponsorTicker';
import { ProductCard } from '../components/ProductCard';
import type { ExclusiveDeal, Product } from '../../models/Product';
import type { PlatformQuality, SponsorBrand } from '../../models/Sponsor';
import type { PageView } from '../../viewmodels/useThemeViewModel';
import { ArrowRight, Flame, Laptop, Footprints, Headphones, Scissors, Trophy } from 'lucide-react';

interface HomePageProps {
  deals: ExclusiveDeal[];
  currentDeal: ExclusiveDeal;
  currentIndex: number;
  onSelectIndex: (idx: number) => void;
  onNextDeal: () => void;
  onPrevDeal: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClaimDeal: (deal: ExclusiveDeal) => void;
  qualities: PlatformQuality[];
  sponsors: SponsorBrand[];
  exclusiveProducts: Product[];
  onNavigate: (page: PageView, searchParam?: string) => void;
  isInWishlist: (id: string) => boolean;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  deals,
  currentDeal,
  currentIndex,
  onSelectIndex,
  onNextDeal,
  onPrevDeal,
  isPlaying,
  onTogglePlay,
  onClaimDeal,
  qualities,
  sponsors,
  exclusiveProducts,
  onNavigate,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView
}) => {
  return (
    <div className="homepage-container animate-fade-in">
      <div className="container">
        
        {/* 1. EXCLUSIVE DEALS AUTO-MOVING HERO CAROUSEL */}
        <HeroCarousel
          deals={deals}
          currentDeal={currentDeal}
          currentIndex={currentIndex}
          onSelectIndex={onSelectIndex}
          onNext={onNextDeal}
          onPrev={onPrevDeal}
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          onClaimDeal={onClaimDeal}
        />

        {/* 2. PLATFORM QUALITIES & LOGOS */}
        <QualityCard qualities={qualities} />

        {/* 3. SPONSOR LOGOS TICKER (Mobile, Electronics, Sports Brands) */}
        <SponsorTicker sponsors={sponsors} />

        {/* 4. FEATURED EXCLUSIVE DEALS GRID */}
        <section style={{ margin: '4rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-accent)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <Flame size={16} />
                <span>LIMITED TIME OFFERS</span>
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Exclusive Featured Deals</h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="btn btn-secondary"
            >
              <span>Explore All Products</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {exclusiveProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={isInWishlist(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </section>

        {/* 5. CATEGORY SPOTLIGHT DIRECTORY */}
        <section style={{ margin: '4rem 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="badge badge-exclusive">EXPLORE CATALOG</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem' }}>Shop By Product Category</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Browse high-performance products carefully classified for your needs</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
            {[
              { label: 'Laptops & Computers', icon: <Laptop size={28} color="var(--brand-primary)" />, cat: 'laptops' },
              { label: 'Tactical & Trail Boots', icon: <Footprints size={28} color="var(--brand-secondary)" />, cat: 'boots' },
              { label: 'Bluetooth Devices', icon: <Headphones size={28} color="var(--brand-accent)" />, cat: 'bluetooth' },
              { label: 'Hair Care Machines', icon: <Scissors size={28} color="var(--warning)" />, cat: 'hair-care' },
              { label: 'Sports & Equipment', icon: <Trophy size={28} color="var(--success)" />, cat: 'sports' }
            ].map((c, i) => (
              <div
                key={i}
                onClick={() => onNavigate('shop', c.cat)}
                className="glass-panel glass-panel-hover"
                style={{
                  padding: '1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <div style={{ background: 'var(--bg-tertiary)', padding: '0.85rem', borderRadius: '50%' }}>
                  {c.icon}
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{c.label}</h4>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
