import React from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Tag, 
  Percent, 
  CheckCircle,
  Phone,
  MessageCircle,
  PackageCheck
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product, Category, Pack } from '../types';
import { INITIAL_CATEGORIES, INITIAL_PACKS, INITIAL_CONTACT } from '../data/initialData';

interface HomePageProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  setCurrentView: (view: string) => void;
  setSelectedCategory: (cat: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onQuickView,
  setCurrentView,
  setSelectedCategory
}) => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const promoProducts = products.filter(p => p.promo).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white py-16 md:py-24 px-4 sm:px-8 rounded-3xl mx-4 mt-4 border border-slate-800 shadow-2xl">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Leader Électroménager & Ameublement Taourirt</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              Équipez Votre Maison au <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Meilleur Prix</span> au Maroc
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Réfrigérateurs NoFrost, Lave-linge Inverter, Smart TV 4K, Climatiseurs et Literie de Luxe. Profitez de la livraison rapide et du paiement à la livraison après contrôle.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentView('shop')}
                className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm px-7 py-3.5 rounded-2xl shadow-lg shadow-orange-600/30 flex items-center gap-2 transition-all hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Découvrir la Boutique</span>
              </button>

              <button
                onClick={() => setCurrentView('packs')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm px-6 py-3.5 rounded-2xl border border-slate-700 flex items-center gap-2 transition-all"
              >
                <PackageCheck className="w-4 h-4 text-amber-400" />
                <span>Voir les Packs Spéciaux (-20%)</span>
              </button>
            </div>

            {/* Micro Specs Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div>
                <span className="text-white font-extrabold text-lg block">100%</span>
                <span>Garantie Constructeur</span>
              </div>
              <div>
                <span className="text-amber-400 font-extrabold text-lg block">24h - 48h</span>
                <span>Livraison Taourirt & Orient</span>
              </div>
              <div>
                <span className="text-emerald-400 font-extrabold text-lg block">Cash / CB</span>
                <span>Paiement à la Livraison</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1000&q=80"
                alt="Électroménager ELECTRO_FENNASSA"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="bg-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Nouveautés 2026
                </span>
                <h3 className="text-xl font-black text-white">
                  Pack Duo Cuisine NoFrost + Lave-linge LG
                </h3>
                <p className="text-xs text-slate-300">
                  Économisez jusqu'à 2 550 DH sur la combinaison de vos appareils.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              Catalogue Complet
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Explorez nos Rayons Électroménager & Ameublement
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('categories')}
            className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
          >
            <span>Voir toutes les catégories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {INITIAL_CATEGORIES.slice(0, 12).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentView('shop');
              }}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-lg hover:border-orange-500/50 transition-all cursor-pointer text-center flex flex-col items-center justify-between space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-xl" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{cat.productCount || 8}+ produits</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              Sélection Vedette
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Les Meilleures Ventes à Taourirt
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
          >
            <span>Voir toute la boutique</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* Special Packs Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Offre Spéciale Équipement Complete
            </span>

            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              Packs Électroménager 2, 3 ou 4 Produits avec Jusqu'à -22% de Remise !
            </h2>

            <p className="text-orange-100 text-sm">
              Combinez Réfrigérateur, Lave-linge, Téléviseur 4K et Lit Orthopédique pour équiper votre maison clé en main au meilleur tarif de l'Orient.
            </p>

            <button
              onClick={() => setCurrentView('packs')}
              className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Découvrir tous nos Packs Spéciaux</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
              Offres Limitées
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Promotions Flash du Moment
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('promotions')}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            <span>Voir toutes les promos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promoProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
