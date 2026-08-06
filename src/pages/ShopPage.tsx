import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  X, 
  Check, 
  ArrowUpDown, 
  Sparkles,
  Tag
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product, FilterState } from '../types';
import { INITIAL_BRANDS } from '../data/initialData';
import { useCart } from '../context/CartContext';

interface ShopPageProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  onQuickView,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}) => {
  const { categories } = useCart();
  const [filters, setFilters] = useState<FilterState>({
    search: searchQuery,
    categoryId: selectedCategory,
    brand: '',
    minPrice: 0,
    maxPrice: 30000,
    inStockOnly: false,
    promoOnly: false,
    sortBy: 'featured'
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Synchronize category or search query updates from Header
  React.useEffect(() => {
    setFilters(prev => ({
      ...prev,
      categoryId: selectedCategory,
      search: searchQuery
    }));
  }, [selectedCategory, searchQuery]);

  // Compute filtered & sorted products list
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search term match
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesRef = product.ref.toLowerCase().includes(q);
        const matchesSku = product.sku.toLowerCase().includes(q);
        const matchesCat = product.categoryName.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesRef && !matchesSku && !matchesCat) {
          return false;
        }
      }

      // Category filter
      if (filters.categoryId && product.categoryId !== filters.categoryId) {
        return false;
      }

      // Brand filter
      if (filters.brand && product.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }

      // Price filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // Stock filter
      if (filters.inStockOnly && product.availability !== 'En Stock') {
        return false;
      }

      // Promo filter
      if (filters.promoOnly && !product.promo) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, filters]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      categoryId: '',
      brand: '',
      minPrice: 0,
      maxPrice: 30000,
      inStockOnly: false,
      promoOnly: false,
      sortBy: 'featured'
    });
    setSelectedCategory('');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Title & Filter Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Boutique & Catalogue Produit
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''} à Taourirt
          </p>
        </div>

        {/* Sorting Dropdown & Mobile Filter Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtres</span>
          </button>

          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-transparent focus:outline-none text-slate-900 dark:text-white cursor-pointer"
            >
              <option value="featured">Tri: Sélection Vedette</option>
              <option value="price-asc">Prix: Croissant</option>
              <option value="price-desc">Prix: Décroissant</option>
              <option value="newest">Nouveautés d'abord</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className={`lg:block ${mobileFiltersOpen ? 'block' : 'hidden'} space-y-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm h-fit sticky top-24`}>
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Filter className="w-4 h-4 text-red-600" />
              <span>Filtrer la Recherche</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-bold text-red-600 dark:text-red-400 hover:underline"
            >
              Réinitialiser
            </button>
          </div>

          {/* Search Term */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Recherche textuelle</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nom, SKU, référence..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Categories List Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Rayons & Catégories</label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, categoryId: '' }));
                  setSelectedCategory('');
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                  !filters.categoryId
                    ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>Toutes les catégories</span>
                <span>{products.length}</span>
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilters(prev => ({ ...prev, categoryId: cat.id }));
                    setSelectedCategory(cat.id);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                    filters.categoryId === cat.id
                      ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-slate-400">
                    {products.filter(p => p.categoryId === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Marque</label>
            <select
              value={filters.brand}
              onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
            >
              <option value="">Toutes les marques</option>
              {INITIAL_BRANDS.map(b => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold">
              <label className="text-slate-700 dark:text-slate-300">Prix Maximum</label>
              <span className="text-red-600 font-extrabold">{filters.maxPrice.toLocaleString('fr-FR')} DH</span>
            </div>
            <input
              type="range"
              min="500"
              max="30000"
              step="500"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <label className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
              />
              <span>Uniquement produits En Stock</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Output */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-950/50 text-red-600 rounded-2xl mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Aucun produit ne correspond à votre recherche
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Essayez de modifier vos filtres ou réinitialisez la recherche pour voir tout notre catalogue à Taourirt.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-colors inline-block"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
