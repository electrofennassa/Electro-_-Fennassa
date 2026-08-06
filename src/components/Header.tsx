import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Sun, 
  Moon, 
  Search, 
  User as UserIcon, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { INITIAL_CONTACT } from '../data/initialData';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenSearch?: () => void;
  onOpenLoginModal: () => void;
  setSelectedCategory?: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onOpenLoginModal,
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const { itemCount, wishlist, storeContact } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'shop', label: 'Boutique' },
    { id: 'categories', label: 'Catégories' },
    { id: 'packs', label: 'Packs Spéciaux', badge: '-20%' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'contact', label: 'Contact & Magasin' },
    { id: 'faq', label: 'FAQ' },
    { id: 'docs', label: 'Guide Termux/Acode', badge: 'DEV' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('shop');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Top Banner Bar with Contact & City info */}
      <div className="bg-slate-950 text-slate-300 py-1.5 px-3 sm:px-4 text-xs font-medium border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-amber-400 font-bold truncate max-w-[280px] sm:max-w-none">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{storeContact.city}, {storeContact.country} ({storeContact.address})</span>
            </span>
            <span className="hidden md:inline-block text-slate-700">|</span>
            <a href={`tel:${storeContact.phone}`} className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-semibold">{storeContact.phone}</span>
            </a>
            <span className="hidden md:inline-block text-slate-700">|</span>
            <a href={`mailto:${storeContact.email}`} className="hidden lg:flex items-center gap-1 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{storeContact.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <a
              href={`https://wa.me/${storeContact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-emerald-300" />
              <span>WhatsApp</span>
            </a>
            <span className="hidden sm:inline-block bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-semibold">
              Garantie 1 an
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2 sm:gap-4 overflow-hidden">
        {/* Brand Logo */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none group shrink-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 flex items-center justify-center text-white font-black text-base sm:text-xl shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
            EF
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              ELECTRO<span className="text-red-600 dark:text-red-500 font-black">_FENNASSA</span>
            </h1>
            <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400 hidden xs:block">
              Électroménager & Ameublement
            </p>
          </div>
        </button>

        {/* Desktop Instant Search Bar */}
        <form 
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 max-w-md relative"
        >
          <input
            type="text"
            placeholder="Rechercher produit, matelas, marque (ex: Samsung, LG, Daiko)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full pl-10 pr-10 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            title={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setCurrentView('account')}
            className="relative p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            title="Mes favoris"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setCurrentView('cart')}
            className="relative p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            title="Mon Panier"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse">
                {itemCount}
              </span>
            )}
          </button>

          {/* User Account / Admin Badge (Desktop) */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setCurrentView(isAdmin ? 'admin' : 'account')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold rounded-full border border-slate-300 dark:border-slate-700 transition-colors"
              >
                <UserIcon className="w-4 h-4 text-red-600" />
                <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                {isAdmin && (
                  <span className="bg-red-600 text-white text-[9px] uppercase px-1.5 py-0.5 rounded font-black">
                    ADMIN
                  </span>
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-full hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all shadow-sm"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Connexion</span>
            </button>
          )}

          {/* User Icon Button for Mobile (Compact) */}
          <button
            onClick={() => {
              if (user) {
                setCurrentView(isAdmin ? 'admin' : 'account');
              } else {
                onOpenLoginModal();
              }
            }}
            className="sm:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative"
            title={user ? (isAdmin ? 'Administration' : 'Mon Compte') : 'Connexion'}
          >
            <UserIcon className="w-5 h-5 text-red-600" />
            {isAdmin && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white dark:border-slate-900 animate-ping" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Primary Navigation Bar (Desktop) */}
      <nav className="hidden md:block bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center gap-1 text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setCurrentView(link.id);
                      if (setSelectedCategory) setSelectedCategory('');
                    }}
                    className={`px-4 py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
                      isActive
                        ? 'border-red-600 text-red-600 dark:text-red-500 font-bold'
                        : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                        link.badge === 'PROMO' || link.badge === '-20%'
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-800 text-white'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <Tag className="w-3.5 h-3.5 text-red-600" />
            <span>Paiement à la livraison dans tout le Maroc</span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3 shadow-2xl">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Rechercher produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          {/* Admin / Account Quick Tile inside Mobile Drawer */}
          <div className="pt-1 pb-2">
            {user ? (
              <button
                onClick={() => {
                  setCurrentView(isAdmin ? 'admin' : 'account');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-extrabold shadow-sm transition-all ${
                  isAdmin
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  <span>{isAdmin ? 'Espace Administration & Gestion' : `Mon Compte (${user.name})`}</span>
                </div>
                {isAdmin && (
                  <span className="bg-white text-red-600 text-[9px] uppercase px-2 py-0.5 rounded font-black">
                    ADMIN
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenLoginModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 p-3 bg-red-600 text-white text-xs font-extrabold rounded-xl shadow-md"
              >
                <UserIcon className="w-4 h-4" />
                <span>Connexion / Accès Admin</span>
              </button>
            )}
          </div>

          {/* Mobile Nav Links */}
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentView(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  currentView === link.id
                    ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
