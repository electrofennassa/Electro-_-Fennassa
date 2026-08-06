import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { LoginModal } from './components/LoginModal';
import { Product } from './types';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';
import { DocsPage } from './pages/DocsPage';
import { PacksPage } from './pages/PacksPage';
import { PromotionsPage } from './pages/PromotionsPage';

function AppContent() {
  const { products } = useCart();

  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white transition-colors duration-200">
      {/* Header */}
      <Header
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onOpenLoginModal={() => setIsLoginOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            products={products}
            onQuickView={handleQuickView}
            setCurrentView={setCurrentView}
            setSelectedCategory={handleCategorySelect}
          />
        )}

        {currentView === 'shop' && (
          <ShopPage
            products={products}
            onQuickView={handleQuickView}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentView === 'categories' && (
          <CategoriesPage
            setCurrentView={setCurrentView}
            setSelectedCategory={handleCategorySelect}
          />
        )}

        {currentView === 'packs' && (
          <PacksPage
            onQuickView={handleQuickView}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'promotions' && (
          <PromotionsPage
            products={products}
            onQuickView={handleQuickView}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'contact' && <ContactPage />}

        {currentView === 'faq' && <FAQPage />}

        {currentView === 'account' && (
          <AccountPage
            setCurrentView={setCurrentView}
            onQuickView={handleQuickView}
            onOpenLoginModal={() => setIsLoginOpen(true)}
          />
        )}

        {currentView === 'admin' && <AdminPage />}

        {currentView === 'docs' && <DocsPage />}
      </main>

      {/* Footer */}
      <Footer
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={() => {
          setIsLoginOpen(false);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
