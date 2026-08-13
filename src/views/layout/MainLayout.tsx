import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { WishlistDrawer } from '../components/WishlistDrawer';
import { NotificationToast } from '../components/NotificationToast';
import { CompareFloatingBar } from '../components/CompareFloatingBar';
import { AICompareModal } from '../components/AICompareModal';
import { AuthModal } from '../components/AuthModal';

import { useThemeViewModel, type PageView } from '../../viewmodels/useThemeViewModel';
import { useHomeViewModel } from '../../viewmodels/useHomeViewModel';
import { useShopViewModel } from '../../viewmodels/useShopViewModel';
import { useCartViewModel } from '../../viewmodels/useCartViewModel';
import { useWishlistViewModel } from '../../viewmodels/useWishlistViewModel';
import { useOrderTrackingViewModel } from '../../viewmodels/useOrderTrackingViewModel';
import { usePolicyViewModel } from '../../viewmodels/usePolicyViewModel';
import { useAuthViewModel } from '../../viewmodels/useAuthViewModel';

import { useAISearchViewModel } from '../../viewmodels/useAISearchViewModel';
import { useAICompareViewModel } from '../../viewmodels/useAICompareViewModel';
import { useAIReviewViewModel } from '../../viewmodels/useAIReviewViewModel';
import { MOCK_PRODUCTS } from '../../models/mockData';

import { HomePage } from '../pages/HomePage';
import { ShopPage } from '../pages/ShopPage';
import { TrackOrderPage } from '../pages/TrackOrderPage';
import { PolicyPage } from '../pages/PolicyPage';

export const MainLayout: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const showToast = (msg: string) => setToastMessage(msg);

  // Core ViewModels
  const authVM = useAuthViewModel();
  const themeVM = useThemeViewModel();
  const homeVM = useHomeViewModel();
  
  // AI ViewModels
  const aiSearchVM = useAISearchViewModel(MOCK_PRODUCTS);
  const aiCompareVM = useAICompareViewModel(showToast);
  const aiReviewVM = useAIReviewViewModel();

  // Shop ViewModel bound with AI matched product IDs
  const shopVM = useShopViewModel(
    themeVM.searchQuery,
    aiSearchVM.isAiSearchActive ? aiSearchVM.aiMatchedProducts.map(p => p.id) : undefined
  );

  const cartVM = useCartViewModel(showToast);
  const wishlistVM = useWishlistViewModel(showToast);
  const orderVM = useOrderTrackingViewModel();
  const policyVM = usePolicyViewModel();

  // Action Interceptors for Auth
  const handleNavigate = (page: PageView, searchParam?: string) => {
    if (page === 'track-order' && !authVM.isAuthenticated) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to track your orders.');
      return;
    }
    themeVM.navigateTo(page, searchParam);
  };

  const handleAddToCart = (product: any, quantity: number = 1) => {
    if (!authVM.isAuthenticated) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to add items to cart.');
      return;
    }
    cartVM.addToCart(product, quantity);
  };

  const handleToggleWishlist = (product: any) => {
    if (!authVM.isAuthenticated) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to save items to your wishlist.');
      return;
    }
    wishlistVM.toggleWishlist(product);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      {/* 1. Global Header with Centered Platform Brand Logo */}
      <Header
        onNavigateHome={() => handleNavigate('home')}
      />

      {/* 2. Global Sticky Navbar with Category Search & Zenith Logo */}
      <Navbar
        activePage={themeVM.activePage}
        onNavigate={handleNavigate}
        cartCount={cartVM.summary.itemCount}
        wishlistCount={wishlistVM.wishlistCount}
        onOpenCart={() => cartVM.setIsCartOpen(true)}
        onOpenWishlist={() => wishlistVM.setIsWishlistOpen(true)}
        onSelectProductQuickView={product => shopVM.setQuickViewProduct(product)}
        isAuthenticated={authVM.isAuthenticated}
        user={authVM.user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => authVM.logout()}
      />

      {/* 3. Active Page View Container */}
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
                if (!authVM.isAuthenticated) {
                  setIsAuthModalOpen(true);
                  showToast('Please sign in to claim this deal.');
                  return;
                }
                cartVM.addToCart(matchedProduct, 1);
                cartVM.setIsCartOpen(true);
              }
            }}
            qualities={homeVM.qualities}
            sponsors={homeVM.sponsors}
            exclusiveProducts={homeVM.exclusiveProducts}
            onNavigate={handleNavigate}
            isInWishlist={wishlistVM.isInWishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={shopVM.setQuickViewProduct}
            isProductSelectedForCompare={aiCompareVM.isProductSelected}
            onToggleCompare={aiCompareVM.toggleSelectProduct}
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
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            // AI Search
            aiNlQuery={aiSearchVM.nlQuery}
            onAiNlQueryChange={aiSearchVM.setNlQuery}
            onExecuteAiSearch={aiSearchVM.executeAISearch}
            onClearAiSearch={aiSearchVM.clearAISearch}
            isAiSearching={aiSearchVM.isSearching}
            aiRequirements={aiSearchVM.structuredRequirements}
            isAiSearchActive={aiSearchVM.isAiSearchActive}
            aiErrorMsg={aiSearchVM.errorMsg}
            // AI Compare
            isProductSelectedForCompare={aiCompareVM.isProductSelected}
            onToggleCompare={aiCompareVM.toggleSelectProduct}
            // AI Review Summary
            aiReviewSummary={aiReviewVM.activeSummary}
            isAiReviewLoading={aiReviewVM.isLoading}
            onFetchAIReview={aiReviewVM.fetchReviewSummary}
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

      {/* 4. Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Drawers, Modals & Floating Widgets */}
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
        onCheckout={() => {
          if (!authVM.isAuthenticated) {
            setIsAuthModalOpen(true);
            showToast('Please sign in to proceed to checkout.');
            return;
          }
          cartVM.processCheckout();
        }}
        isCheckoutOpen={cartVM.isCheckoutModalOpen}
        onCloseCheckout={() => cartVM.setIsCheckoutModalOpen(false)}
        checkoutSuccess={cartVM.checkoutSuccess}
        onConfirmCheckout={cartVM.confirmCheckout}
      />

      <WishlistDrawer
        isOpen={wishlistVM.isWishlistOpen}
        onClose={() => wishlistVM.setIsWishlistOpen(false)}
        wishlistItems={wishlistVM.wishlistItems}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CompareFloatingBar
        selectedProducts={aiCompareVM.selectedProducts}
        onRemove={aiCompareVM.removeProduct}
        onClear={aiCompareVM.clearSelected}
        onCompare={aiCompareVM.generateComparison}
      />

      <AICompareModal
        isOpen={aiCompareVM.isCompareModalOpen}
        onClose={() => aiCompareVM.setIsCompareModalOpen(false)}
        products={aiCompareVM.selectedProducts}
        result={aiCompareVM.comparisonResult}
        isLoading={aiCompareVM.isGeneratingComparison}
        onAddToCart={handleAddToCart}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        authVM={authVM} 
      />

      <NotificationToast message={toastMessage} onClear={() => setToastMessage(null)} />

    </div>
  );
};
