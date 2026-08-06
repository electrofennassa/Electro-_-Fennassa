import React, { useState } from 'react';
import { PackageCheck, Check, ShoppingCart, Eye, Tag, ArrowRight, ShieldCheck, Truck, Percent } from 'lucide-react';
import { INITIAL_PACKS } from '../data/initialData';
import { Pack, Product } from '../types';
import { useCart } from '../context/CartContext';

interface PacksPageProps {
  setCurrentView: (view: string) => void;
  onQuickView: (product: Product) => void;
}

export const PacksPage: React.FC<PacksPageProps> = ({ setCurrentView, onQuickView }) => {
  const { addPackToCart, packs } = useCart();
  const [selectedFilter, setSelectedFilter] = useState<'all' | '2' | '3' | '4'>('all');
  const [addedPackId, setAddedPackId] = useState<string | null>(null);

  const filteredPacks = packs.filter(pack => {
    if (selectedFilter === 'all') return true;
    return pack.itemCount.toString() === selectedFilter;
  });

  const handleOrderPack = (pack: Pack) => {
    addPackToCart(pack);
    setAddedPackId(pack.id);
    setTimeout(() => {
      setAddedPackId(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-orange-500/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="bg-orange-500/20 text-orange-400 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-orange-500/30">
            <PackageCheck className="w-4 h-4" />
            Équipement Clé en Main
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Packs Spéciaux Électroménager <span className="text-orange-500">jusqu'à -22%</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Profitez de nos offres groupées exclusives : combinez vos appareils électroménagers et multimédia essentiels (Réfrigérateur + Télévision + Micro-ondes, Packs Duo ou Pack Mariage) et bénéficiez de réductions garanties avec livraison et installation gratuites à Taourirt.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Garantie Constructeur
            </span>
            <span className="flex items-center gap-1.5 font-bold">
              <Truck className="w-4 h-4 text-orange-400" /> Livraison Gratuite Taourirt
            </span>
            <span className="flex items-center gap-1.5 font-bold">
              <Percent className="w-4 h-4 text-amber-400" /> Remises Automatiques
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Nos Offres de Packs Disponibles
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sélectionnez la formule adaptée à vos besoins et à votre budget.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'all'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tous les Packs ({INITIAL_PACKS.length})
          </button>
          <button
            onClick={() => setSelectedFilter('2')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === '2'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Packs 2 Produits
          </button>
          <button
            onClick={() => setSelectedFilter('3')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === '3'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Packs 3 Produits
          </button>
          <button
            onClick={() => setSelectedFilter('4')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === '4'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Packs Mariage (4 Produits)
          </button>
        </div>
      </div>

      {/* Packs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredPacks.map((pack) => (
          <div
            key={pack.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between hover:border-orange-500/50 transition-all duration-300 group"
          >
            {/* Top Banner */}
            <div>
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  src={pack.image}
                  alt={pack.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-orange-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {pack.badge || pack.type}
                  </span>
                  <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
                    {pack.itemCount} Éléments inclus
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {pack.name}
                  </h3>
                </div>
              </div>

              {/* Description & Savings */}
              <div className="p-6 space-y-6">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pack.description}
                </p>

                {/* Savings Box */}
                <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-orange-800 dark:text-orange-300 font-bold uppercase tracking-wider">
                      Prix du Pack Complet
                    </div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
                        {pack.packPrice.toLocaleString('fr-FR')} DH
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {pack.originalPrice.toLocaleString('fr-FR')} DH
                      </span>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-black text-xs px-3.5 py-2 rounded-xl text-center">
                    Économie
                    <div className="text-sm">-{pack.savings.toLocaleString('fr-FR')} DH</div>
                  </div>
                </div>

                {/* Products Included */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Produits inclus dans ce Pack :
                  </h4>
                  <div className="space-y-2">
                    {pack.products.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-orange-500/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-xl bg-slate-200"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                              {product.name}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              Marque: {product.brand} • Réf: {product.ref}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onQuickView(product)}
                          className="p-2 text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-700 rounded-xl transition-colors"
                          title="Aperçu rapide du produit"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-6 pt-0">
              <button
                onClick={() => handleOrderPack(pack)}
                className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  addedPackId === pack.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-500/20 hover:scale-[1.02]'
                }`}
              >
                {addedPackId === pack.id ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Pack Ajouté au Panier !</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Commander ce Pack ({pack.packPrice.toLocaleString('fr-FR')} DH)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
