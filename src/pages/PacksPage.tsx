import React, { useState } from 'react';
import { PackageCheck, Sparkles, Check, ShoppingBag, Plus, Trash2, ArrowRight } from 'lucide-react';
import { INITIAL_PACKS, INITIAL_PRODUCTS } from '../data/initialData';
import { Product, Pack } from '../types';
import { useCart } from '../context/CartContext';

interface PacksPageProps {
  setCurrentView: (view: string) => void;
  onQuickView: (product: Product) => void;
}

export const PacksPage: React.FC<PacksPageProps> = ({ setCurrentView, onQuickView }) => {
  const { addToCart } = useCart();
  const [customPackItems, setCustomPackItems] = useState<Product[]>([]);

  const handleAddPackToCart = (pack: Pack) => {
    pack.products.forEach(product => {
      addToCart(product, 1);
    });
    setCurrentView('cart');
  };

  const handleAddProductToCustomPack = (p: Product) => {
    if (customPackItems.length < 4 && !customPackItems.some(item => item.id === p.id)) {
      setCustomPackItems(prev => [...prev, p]);
    }
  };

  const handleRemoveProductFromCustomPack = (id: string) => {
    setCustomPackItems(prev => prev.filter(item => item.id !== id));
  };

  // Custom pack price calculation
  const customOriginalTotal = customPackItems.reduce((acc, p) => acc + p.price, 0);
  let customDiscountPercent = 0;
  if (customPackItems.length === 2) customDiscountPercent = 10;
  if (customPackItems.length === 3) customDiscountPercent = 15;
  if (customPackItems.length >= 4) customDiscountPercent = 20;

  const customSavings = (customOriginalTotal * customDiscountPercent) / 100;
  const customFinalPrice = customOriginalTotal - customSavings;

  const handleOrderCustomPack = () => {
    if (customPackItems.length < 2) return;
    customPackItems.forEach(p => addToCart(p, 1));
    setCurrentView('cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-orange-500/20">
          <PackageCheck className="w-4 h-4" />
          Économies Majeures Garantie
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Packs Spéciaux 2, 3 et 4 Produits
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Achetez plusieurs appareils ensemble pour votre maison ou mariage et bénéficiez de remises automatiques jusqu'à -22% sur le total.
        </p>
      </div>

      {/* Pre-built Packs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {INITIAL_PACKS.map((pack) => (
          <div
            key={pack.id}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all p-6 flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            {pack.badge && (
              <span className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                {pack.badge}
              </span>
            )}

            <div className="space-y-4">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
                {pack.type}
              </span>

              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {pack.name}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {pack.description}
              </p>

              {/* Products included in pack */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Produits inclus dans ce pack ({pack.itemCount}) :
                </h4>
                <div className="space-y-2">
                  {pack.products.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => onQuickView(prod)}
                      className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-900/60 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/30 cursor-pointer transition-colors"
                    >
                      <img src={prod.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{prod.name}</h5>
                        <span className="text-[10px] text-slate-400">{prod.brand} • {prod.price.toLocaleString('fr-FR')} DH</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-[11px] text-slate-400 block">Prix Pack Avantageux</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {pack.packPrice.toLocaleString('fr-FR')} <span className="text-sm font-bold text-orange-600">DH</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through block">
                    {pack.originalPrice.toLocaleString('fr-FR')} DH
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    Remise : -{pack.savings.toLocaleString('fr-FR')} DH
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleAddPackToCart(pack)}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Commander ce Pack Complet</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Pack Builder Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Générateur de Pack Personnalisé
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              Créez Votre Propre Pack Sur-Mesure
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Sélectionnez 2, 3 ou 4 produits dans le catalogue et profitez automatiquement d'une remise allant jusqu'à -20%.
            </p>
          </div>

          {/* Discount Counter */}
          <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-2xl text-center">
            <span className="text-xs text-slate-400 block">Remise Automatique</span>
            <span className="text-2xl font-black text-amber-400">-{customDiscountPercent}%</span>
          </div>
        </div>

        {/* Selected Products in Custom Pack */}
        <div className="bg-slate-800/60 p-4 sm:p-6 rounded-2xl border border-slate-700/60 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Votre Sélection Personnalisée ({customPackItems.length}/4 max) :
          </h4>

          {customPackItems.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400 italic">
              Aucun produit sélectionné. Choisissez des produits ci-dessous pour composer votre pack.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {customPackItems.map((item) => (
                <div key={item.id} className="bg-slate-900 p-3 rounded-xl border border-slate-700 flex items-center gap-3 relative">
                  <img src={item.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold truncate text-white">{item.name}</h5>
                    <span className="text-[10px] text-amber-400 font-mono">{item.price.toLocaleString('fr-FR')} DH</span>
                  </div>
                  <button
                    onClick={() => handleRemoveProductFromCustomPack(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Custom Pack Price Summary */}
          {customPackItems.length >= 2 && (
            <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Prix Total du Pack Personnalisé</span>
                <span className="text-2xl font-black text-white">
                  {customFinalPrice.toLocaleString('fr-FR')} <span className="text-sm font-bold text-orange-400">DH</span>
                </span>
                <span className="text-xs text-emerald-400 font-bold ml-2">
                  (Économie: {customSavings.toLocaleString('fr-FR')} DH)
                </span>
              </div>

              <button
                onClick={handleOrderCustomPack}
                className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ajouter ce Pack au Panier</span>
              </button>
            </div>
          )}
        </div>

        {/* Selector Grid of Available Products */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Sélectionnez les produits à ajouter à votre pack :
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {INITIAL_PRODUCTS.map((prod) => {
              const isAdded = customPackItems.some(item => item.id === prod.id);
              return (
                <button
                  key={prod.id}
                  disabled={isAdded || customPackItems.length >= 4}
                  onClick={() => handleAddProductToCustomPack(prod)}
                  className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isAdded
                      ? 'bg-orange-950/40 border-orange-500 text-orange-300 opacity-60'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-white'
                  }`}
                >
                  <img src={prod.images[0]} alt="" className="w-full h-20 object-cover rounded-xl mb-2" />
                  <div>
                    <h5 className="text-[11px] font-bold line-clamp-1">{prod.name}</h5>
                    <span className="text-[10px] text-amber-400 font-mono font-bold block mt-1">{prod.price.toLocaleString('fr-FR')} DH</span>
                  </div>
                  <div className="mt-2 text-[10px] font-bold text-orange-400 flex items-center gap-1">
                    {isAdded ? <Check className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3" />}
                    <span>{isAdded ? 'Sélectionné' : 'Ajouter'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
