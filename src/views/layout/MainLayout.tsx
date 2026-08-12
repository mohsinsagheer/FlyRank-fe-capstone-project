import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { WishlistDrawer } from '../components/WishlistDrawer';
import { NotificationToast } from '../components/NotificationToast';

import { useThemeViewModel } from '../../viewmodels/useThemeViewModel';
import { useHomeViewModel } from '../../viewmodels/useHomeViewModel';
import { useShopViewModel } from '../../viewmodels/useShopViewModel';
import { useCartViewModel } from '../../viewmodels/useCartViewModel';
import { useWishlistViewModel } from '../../viewmodels/useWishlistViewModel';
import { useOrderTrackingViewModel } from '../../viewmodels/useOrderTrackingViewModel';
import { usePolicyViewModel } from '../../viewmodels/usePolicyViewModel';

import { HomePage } from '../pages/HomePage';
import { ShopPage } from '../pages/ShopPage';
import { TrackOrderPage } from '../pages/TrackOrderPage';
import { PolicyPage } from '../pages/PolicyPage';

export const MainLayout: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => setToastMessage(msg);

  // ViewModels instantiation
  const themeVM = useThemeViewModel();
  const homeVM = useHomeViewModel();
  const shopVM = useShopViewModel(themeVM.searchQuery);
  const cartVM = useCartViewModel(showToast);
  const wishlistVM = useWishlistViewModel(showToast);
  const orderVM = useOrderTrackingViewModel();
  const policyVM = usePolicyViewModel();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      {/* 1. Global Header with Centered Platform Brand Logo */}
      <Header
        onNavigateHome={() => themeVM.navigateTo('home')}
      />

      {/* 2. Global Sticky Navbar with Category Search & Zenith Logo */}
      <Navbar
        activePage={themeVM.activePage}
        onNavigate={themeVM.navigateTo}
        cartCount={cartVM.summary.itemCount}
        wishlistCount={wishlistVM.wishlistCount}
        onOpenCart={() => cartVM.setIsCartOpen(true)}
        onOpenWishlist={() => wishlistVM.setIsWishlistOpen(true)}
        onSelectProductQuickView={product => shopVM.setQuickViewProduct(product)}
      />

      {/* 3. Active Page View Container with Full-Width Spread & Side Border Lines */}
      <main className="main-content-layout" style={{ flex: 1 }}>
        {themeVM.activePage === 'home' && (
          <HomePage
            deals={homeVM.deals}
            currentDeal={homeVM.currentDeal}
            currentIndex={homeVM.currentDealIndex}
            onSelectIndex={homeVM.setCurrentDealIndex}
            onNextDeal={homeVM.nextDeal}
            onPrevDeal={homeVM.prevDeal}
            isPlaying={homeVM.isPlaying}
            onTogglePlay={() => homeVM.setIsPlaying(!homeVM.isPlaying)}
            onClaimDeal={deal => {
              const matchedProduct = homeVM.exclusiveProducts.find(p => p.id === deal.productId);
              if (matchedProduct) {
                cartVM.addToCart(matchedProduct, 1);
                cartVM.setIsCartOpen(true);
              }
            }}
            qualities={homeVM.qualities}
            sponsors={homeVM.sponsors}
            exclusiveProducts={homeVM.exclusiveProducts}
            onNavigate={themeVM.navigateTo}
            isInWishlist={wishlistVM.isInWishlist}
            onToggleWishlist={wishlistVM.toggleWishlist}
            onAddToCart={cartVM.addToCart}
            onQuickView={shopVM.setQuickViewProduct}
          />
        )}

        {themeVM.activePage === 'shop' && (
          <ShopPage
            categories={shopVM.categories}
            selectedCategory={shopVM.selectedCategory}
            onSelectCategory={shopVM.setSelectedCategory}
            searchTerm={shopVM.searchTerm}
            onSearchChange={shopVM.setSearchTerm}
            priceRange={shopVM.priceRange}
            onPriceChange={shopVM.setPriceRange}
            minRating={shopVM.minRating}
            onRatingChange={shopVM.setMinRating}
            sortBy={shopVM.sortBy}
            onSortChange={shopVM.setSortBy}
            filteredProducts={shopVM.filteredProducts}
            totalCount={shopVM.totalCount}
            onClearFilters={shopVM.clearFilters}
            quickViewProduct={shopVM.quickViewProduct}
            onSetQuickViewProduct={shopVM.setQuickViewProduct}
            isInWishlist={wishlistVM.isInWishlist}
            onToggleWishlist={wishlistVM.toggleWishlist}
            onAddToCart={cartVM.addToCart}
          />
        )}

        {themeVM.activePage === 'track-order' && (
          <TrackOrderPage
            searchOrderId={orderVM.searchOrderId}
            onSearchOrderIdChange={orderVM.setSearchOrderId}
            emailInput={orderVM.emailInput}
            onEmailInputChange={orderVM.setEmailInput}
            activeOrder={orderVM.activeOrder}
            errorMsg={orderVM.errorMsg}
            isLoading={orderVM.isLoading}
            onSearch={orderVM.handleSearch}
            onLoadDemoOrder={orderVM.loadDemoOrder}
          />
        )}

        {themeVM.activePage === 'policy' && (
          <PolicyPage
            policies={policyVM.policies}
            filteredPolicies={policyVM.filteredPolicies}
            activeTabId={policyVM.activeTabId}
            onSelectTab={policyVM.setActiveTabId}
            searchTerm={policyVM.searchTerm}
            onSearchChange={policyVM.setSearchTerm}
            activePolicy={policyVM.activePolicy}
          />
        )}
      </main>

      {/* 4. Global Footer with Executive Dark Theme */}
      <Footer onNavigate={themeVM.navigateTo} />

      {/* 5. Drawers & Toasts */}
      <CartDrawer
        isOpen={cartVM.isCartOpen}
        onClose={() => cartVM.setIsCartOpen(false)}
        cartItems={cartVM.cartItems}
        summary={cartVM.summary}
        onUpdateQuantity={cartVM.updateQuantity}
        onRemoveItem={cartVM.removeFromCart}
        promoCode={cartVM.promoCode}
        onPromoCodeChange={cartVM.setPromoCode}
        onApplyPromo={cartVM.applyPromoCode}
        onCheckout={cartVM.processCheckout}
        isCheckoutOpen={cartVM.isCheckoutModalOpen}
        onCloseCheckout={() => cartVM.setIsCheckoutModalOpen(false)}
        checkoutSuccess={cartVM.checkoutSuccess}
        onConfirmCheckout={cartVM.confirmCheckout}
      />

      <WishlistDrawer
        isOpen={wishlistVM.isWishlistOpen}
        onClose={() => wishlistVM.setIsWishlistOpen(false)}
        wishlistItems={wishlistVM.wishlistItems}
        onToggleWishlist={wishlistVM.toggleWishlist}
        onAddToCart={cartVM.addToCart}
      />

      <NotificationToast message={toastMessage} onClear={() => setToastMessage(null)} />

    </div>
  );
};
