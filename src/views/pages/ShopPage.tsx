import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { AISearchBar } from '../components/AISearchBar';
import type { Product, ProductCategory } from '../../models/Product';
import type { SortOption } from '../../viewmodels/useShopViewModel';
import type { AISearchRequirement, AIReviewSummary } from '../../models/AI';
import { RotateCcw, SlidersHorizontal, Grid } from 'lucide-react';

interface ShopPageProps {
  categories: { key: ProductCategory; label: string; count: number }[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  priceRange: number;
  onPriceChange: (price: number) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  filteredProducts: Product[];
  totalCount: number;
  onClearFilters: () => void;
  quickViewProduct: Product | null;
  onSetQuickViewProduct: (p: Product | null) => void;
  isInWishlist: (id: string) => boolean;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product, qty?: number) => void;
  // AI Search Props
  aiNlQuery: string;
  onAiNlQueryChange: (val: string) => void;
  onExecuteAiSearch: (custom?: string) => void;
  onClearAiSearch: () => void;
  isAiSearching: boolean;
  aiRequirements: AISearchRequirement | null;
  isAiSearchActive: boolean;
  aiErrorMsg: string | null;
  // AI Compare Props
  isProductSelectedForCompare: (id: string) => boolean;
  onToggleCompare: (p: Product) => void;
  // AI Review Summary Props
  aiReviewSummary?: AIReviewSummary | null;
  isAiReviewLoading?: boolean;
  onFetchAIReview?: (p: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  sortBy,
  onSortChange,
  filteredProducts,
  totalCount,
  onClearFilters,
  quickViewProduct,
  onSetQuickViewProduct,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
  aiNlQuery,
  onAiNlQueryChange,
  onExecuteAiSearch,
  onClearAiSearch,
  isAiSearching,
  aiRequirements,
  isAiSearchActive,
  aiErrorMsg,
  isProductSelectedForCompare,
  onToggleCompare,
  aiReviewSummary,
  isAiReviewLoading,
  onFetchAIReview
}) => {
  return (
    <div className="shoppage-container animate-fade-in">
      <div className="container" style={{ padding: '2rem 1.5rem' }}>

        {/* Shop Page Banner Header */}
        <div
          className="glass-panel"
          style={{
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
            border: '1px solid var(--border-color-light)'
          }}
        >
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem', marginLeft: '0.25rem' }}>
            Product Catalog & Shop
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '700px', margin: 0, marginLeft: '12rem' }}>
            Discover our full line of electronics, laptops, tactical boots, bluetooth audio devices, hair grooming clippers/dryers, and professional sports equipment.
          </p>
        </div>

        {/* AI Natural Language Search Bar */}
        <AISearchBar
          query={aiNlQuery}
          onQueryChange={onAiNlQueryChange}
          onSearch={onExecuteAiSearch}
          onClear={onClearAiSearch}
          isSearching={isAiSearching}
          requirements={aiRequirements}
          isActive={isAiSearchActive}
          errorMsg={aiErrorMsg}
        />

        {/* Category Pills Selector Bar */}
        <div
          style={{
            display: 'flex',
            gap: '0.6rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '2rem'
          }}
        >
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => onSelectCategory(cat.key)}
              className={`btn ${selectedCategory === cat.key ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.5rem 1.15rem',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{cat.label}</span>
              <span
                style={{
                  background: selectedCategory === cat.key ? 'rgba(255,255,255,0.25)' : 'var(--bg-tertiary)',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '10px',
                  fontSize: '0.75rem'
                }}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Main Grid & Filters Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'start' }}>

          {/* Left Sidebar Filters Panel */}
          <aside className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800 }}>
                <SlidersHorizontal size={18} color="var(--brand-primary)" />
                <span>Filters</span>
              </div>
              <button
                onClick={onClearFilters}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem', cursor: 'pointer' }}
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>

            {/* Filter 1: Search within results */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                Search Keyword
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Filter name, brand..."
                  value={searchTerm}
                  onChange={e => onSearchChange(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'white',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.825rem'
                  }}
                />
              </div>
            </div>

            {/* Filter 2: Max Price Range */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Max Price</span>
                <span style={{ color: 'var(--brand-primary)' }}>${priceRange}</span>
              </div>
              <input
                type="range"
                min={50}
                max={3000}
                step={50}
                value={priceRange}
                onChange={e => onPriceChange(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--brand-primary)' }}
              />
            </div>

            {/* Filter 3: Rating */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                Minimum Rating
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[4.8, 4.5, 4.0, 0].map(rating => (
                  <label
                    key={rating}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', cursor: 'pointer' }}
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => onRatingChange(rating)}
                      style={{ accentColor: 'var(--brand-primary)' }}
                    />
                    <span>{rating === 0 ? 'All Ratings' : `${rating}+ Stars`}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Product Grid Area */}
          <div>

            {/* Top Toolbar: Total items count + Sort selector */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Showing <strong>{totalCount}</strong> products
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => onSortChange(e.target.value as SortOption)}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '0.45rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="featured">Featured & Exclusive</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div
                className="glass-panel"
                style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-md)' }}
              >
                <Grid size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Products Found</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  No items matched your specific search criteria or filters.
                </p>
                <button onClick={onClearFilters} className="btn btn-primary">
                  Clear Filters & Show All
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.5rem'
                }}
              >
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isInWishlist={isInWishlist(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    onAddToCart={onAddToCart}
                    onQuickView={onSetQuickViewProduct}
                    isCompared={isProductSelectedForCompare(product.id)}
                    onToggleCompare={onToggleCompare}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => onSetQuickViewProduct(null)}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={quickViewProduct ? isInWishlist(quickViewProduct.id) : false}
          aiReviewSummary={aiReviewSummary}
          isAiReviewLoading={isAiReviewLoading}
          onFetchAIReview={onFetchAIReview}
        />

      </div>
    </div>
  );
};
