import React from 'react';
import { Tag, Sparkles, Clock } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

interface PromotionsPageProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const PromotionsPage: React.FC<PromotionsPageProps> = ({ products, onQuickView }) => {
  const promoProducts = products.filter(p => p.promo);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-rose-600 via-orange-600 to-rose-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Ventes Flash & Bons Plans
          </span>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight">
            Offres Exceptionnelles Électro à Taourirt
          </h1>
          <p className="text-rose-100 text-xs sm:text-sm">
            Profitez de remises exclusives immédiates allant jusqu'à -25% sur les plus grandes marques avec garantie et livraison rapide.
          </p>
        </div>
      </div>

      {/* Promotions Product Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Tag className="w-5 h-5 text-rose-600" />
          <span>Tous les Produits en Promotion ({promoProducts.length})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promoProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
