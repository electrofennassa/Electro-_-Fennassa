import React, { useState } from 'react';
import { Tag, Zap, Percent, Clock, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

interface PromotionsPageProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const PromotionsPage: React.FC<PromotionsPageProps> = ({ products, onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const promoProducts = products.filter(p => p.promo || (p.discountPercent && p.discountPercent > 0));

  const filteredPromoProducts = promoProducts.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.categoryId === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-white/5 backdrop-blur-3xl transform skew-x-12 translate-x-20 pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            Ventes Flash & Bons Plans Electro
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Promotions Exclusives <span className="underline decoration-amber-300 decoration-4 underline-offset-4">ELECTRO_FENNASSA</span>
          </h1>

          <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
            Économisez sur une sélection d'appareils électroménagers et téléviseurs de grandes marques (Samsung, LG, TCL, Bosch, Whirlpool). Quantités limitées et tarifs directs magasin à Taourirt.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2 text-xs font-bold">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Valable jusqu meileurs stocks</span>
            </div>
            <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2 text-xs font-bold">
              <Percent className="w-4 h-4 text-emerald-300" />
              <span>Jusqu'à -20% de remise immédiate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon Codes Promo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Code Promo Bienvenue</span>
            <div className="text-xl font-black text-white">FENNASSA10</div>
            <p className="text-xs text-slate-400">10% de réduction immédiate sur tout le panier</p>
          </div>
          <div className="bg-orange-600/20 text-orange-400 text-xs font-black px-3 py-2 rounded-xl border border-orange-500/30">
            -10% Panier
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Code Promo Spécial Mariage</span>
            <div className="text-xl font-black text-white">MARIAGE15</div>
            <p className="text-xs text-slate-400">15% de réduction dès 15 000 DH d'achat</p>
          </div>
          <div className="bg-amber-600/20 text-amber-400 text-xs font-black px-3 py-2 rounded-xl border border-amber-500/30">
            -15% Mariage
          </div>
        </div>
      </div>

      {/* Products Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Articles en Promotion ({promoProducts.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tous les prix incluent la garantie constructeur officielle.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {filteredPromoProducts.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <Tag className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
            Aucune promotion dans cette catégorie pour le moment.
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPromoProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}
    </div>
  );
};
