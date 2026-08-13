import React, { useState } from 'react';
import type { PageView } from '../../viewmodels/useThemeViewModel';
import { SearchDropdown } from './SearchDropdown';
import type { Product, ProductCategory } from '../../models/Product';
import { Home, ShoppingBag, Truck, ShieldCheck, Heart, ShoppingCart, Search, Menu, X, User as UserIcon, LogOut } from 'lucide-react';

interface NavbarProps {
  activePage: PageView;
  onNavigate: (page: PageView, searchParam?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectProductQuickView?: (product: Product) => void;
  isAuthenticated: boolean;
  user: any;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectProductQuickView,
  isAuthenticated,
  user,
  onOpenAuth,
  onLogout
}) => {
  const [navSearch, setNavSearch] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<ProductCategory>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      onNavigate('shop', navSearch.trim());
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinkStyle = (page: PageView) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.55rem 0.95rem',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.875rem',
    fontWeight: activePage === page ? 700 : 500,
    color: activePage === page ? '#ffffff' : 'var(--nav-text-secondary)',
    background: activePage === page ? 'var(--brand-primary)' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  });

  return (
    <nav className="glass-nav" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 2rem', gap: '1.25rem', flexWrap: 'wrap' }}>
        
        {/* Left: Mobile Navigation Drawer Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation Links */}
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <button onClick={() => onNavigate('home')} style={navLinkStyle('home')}>
              <Home size={16} />
              <span>Home</span>
            </button>
            <button onClick={() => onNavigate('shop')} style={navLinkStyle('shop')}>
              <ShoppingBag size={16} />
              <span>Shop All</span>
            </button>
            <button onClick={() => onNavigate('track-order')} style={navLinkStyle('track-order')}>
              <Truck size={16} />
              <span>Track Order</span>
            </button>
            <button onClick={() => onNavigate('policy')} style={navLinkStyle('policy')}>
              <ShieldCheck size={16} />
              <span>Policies</span>
            </button>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="nav-search-container" style={{ position: 'relative', flex: 1, maxWidth: '500px', minWidth: '220px' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <div className="search-wrapper">
              
              {/* Category Selector Dropdown */}
              <select
                value={selectedCatFilter}
                onChange={e => setSelectedCatFilter(e.target.value as ProductCategory)}
                className="search-category"
              >
                <option value="all" style={{ color: '#000' }}>All</option>
                <option value="electronics" style={{ color: '#000' }}>Electronics</option>
                <option value="laptops" style={{ color: '#000' }}>Laptops</option>
                <option value="boots" style={{ color: '#000' }}>Boots</option>
                <option value="bluetooth" style={{ color: '#000' }}>Bluetooth</option>
                <option value="hair-care" style={{ color: '#000' }}>Hair Care</option>
                <option value="sports" style={{ color: '#000' }}>Sports</option>
              </select>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search products..."
                value={navSearch}
                onChange={e => {
                  setNavSearch(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                className="search-input"
              />

              <button
                type="submit"
                className="search-btn"
                title="Search"
              >
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && (
            <SearchDropdown
              searchTerm={navSearch}
              onSelectProduct={product => {
                if (onSelectProductQuickView) onSelectProductQuickView(product);
                setIsDropdownOpen(false);
              }}
              onClose={() => setIsDropdownOpen(false)}
            />
          )}
        </div>

        {/* Right Action Buttons: Wishlist & Cart (Cart Icon Only) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Auth Button */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.1)', padding: '0.45rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--nav-border)' }}>
              <UserIcon size={16} color="white" />
              <span className="nav-btn-text" style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>
                {user?.name?.split(' ')[0]}
              </span>
              <button onClick={onLogout} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '0.25rem', padding: 0 }} title="Log out" onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid var(--brand-primary)',
                color: 'white',
                borderRadius: 'var(--radius-sm)',
                padding: '0.55rem 0.85rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--brand-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)';
              }}
            >
              <UserIcon size={16} />
              <span className="nav-btn-text">Sign In</span>
            </button>
          )}

          <button
            onClick={onOpenWishlist}
            style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid var(--nav-border)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              padding: '0.55rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
            title="View Wishlist"
          >
            <Heart size={18} color="var(--brand-accent)" fill={wishlistCount > 0 ? "var(--brand-accent)" : "none"} />
            <span className="nav-btn-text">Saved</span>
            {wishlistCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: 'var(--brand-accent)',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Option displaying ONLY Cart Icon and Badge */}
          <button
            onClick={onOpenCart}
            style={{
              position: 'relative',
              background: 'var(--brand-gradient)',
              border: 'none',
              color: 'white',
              borderRadius: 'var(--radius-sm)',
              padding: '0.55rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-glow)'
            }}
            title="View Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: '#ffffff',
                  color: 'var(--brand-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div
          style={{
            background: 'var(--nav-bg)',
            borderTop: '1px solid var(--nav-border)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} style={navLinkStyle('home')}>
            <Home size={16} />
            <span>Home</span>
          </button>
          <button onClick={() => { onNavigate('shop'); setIsMobileMenuOpen(false); }} style={navLinkStyle('shop')}>
            <ShoppingBag size={16} />
            <span>Shop All</span>
          </button>
          <button onClick={() => { onNavigate('track-order'); setIsMobileMenuOpen(false); }} style={navLinkStyle('track-order')}>
            <Truck size={16} />
            <span>Track Order</span>
          </button>
          <button onClick={() => { onNavigate('policy'); setIsMobileMenuOpen(false); }} style={navLinkStyle('policy')}>
            <ShieldCheck size={16} />
            <span>Policies</span>
          </button>
        </div>
      )}

      {/* Responsive Styles for Navbar */}
      <style>{`
        .search-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 2rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .search-wrapper:focus-within {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }
        .search-category {
          background: transparent;
          color: #ffffff;
          border: none;
          border-right: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.6rem 0.5rem 0.6rem 1.2rem;
          font-size: 0.8rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          transition: background 0.2s ease;
          border-radius: 2rem 0 0 2rem;
          appearance: none;
        }
        .search-category:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .search-input {
          flex: 1;
          width: 100%;
          background: transparent;
          color: #ffffff;
          border: none;
          padding: 0.6rem 3rem 0.6rem 1rem;
          font-size: 0.9rem;
          outline: none;
          border-radius: 0 2rem 2rem 0;
        }
        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .search-btn {
          position: absolute;
          right: 6px;
          background: var(--brand-gradient);
          border: none;
          border-radius: 50%;
          color: white;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;
        }
        .search-btn:hover {
          transform: scale(1.08);
          box-shadow: var(--shadow-glow);
        }
        .search-btn:active {
          transform: scale(0.95);
        }

        @media (max-width: 900px) {
          .nav-links-desktop {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (max-width: 550px) {
          .nav-btn-text {
            display: none;
          }
          .nav-search-container {
            order: 3;
            max-width: 100% !important;
            width: 100%;
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </nav>
  );
};
