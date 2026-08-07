import React, { useState, useMemo } from 'react';
import { X, Scale, Trash2, Plus, Check, ShoppingBag, MessageCircle, Eye, ShieldCheck, CheckCircle2, Sparkles, Filter, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView: (product: Product) => void;
  onNavigateShop?: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  onQuickView,
  onNavigateShop
}) => {
  const { 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    addToCart, 
    storeContact, 
    products: allProducts,
    addToCompare
  } = useCart();

  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [showAddSelector, setShowAddSelector] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  // Gather all unique specification keys across all currently compared products
  const allSpecKeys = useMemo(() => {
    const keysSet = new Set<string>();
    compareList.forEach(product => {
      if (product.specs) {
        Object.keys(product.specs).forEach(key => keysSet.add(key));
      }
    });
    return Array.from(keysSet);
  }, [compareList]);

  // Available products that are NOT already in compare list
  const availableProductsToAdd = useMemo(() => {
    return allProducts.filter(p => !compareList.some(cp => cp.id === p.id)).filter(p => {
      const matchesSearch = productSearch.trim() === '' || 
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.ref.toLowerCase().includes(productSearch.toLowerCase());
      
      const matchesCategory = selectedCategoryFilter === 'all' || p.categoryId === selectedCategoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, compareList, productSearch, selectedCategoryFilter]);

  if (!isOpen) return null;

  // Check if a specific row has differing values across compared products
  const isSpecDifferent = (key: string): boolean => {
    if (compareList.length < 2) return false;
    const firstVal = compareList[0]?.specs?.[key] || '-';
    return compareList.some(p => (p.specs?.[key] || '-') !== firstVal);
  };

  const isPriceDifferent = (): boolean => {
    if (compareList.length < 2) return false;
    const firstPrice = compareList[0].price;
    return compareList.some(p => p.price !== firstPrice);
  };

  const handleWhatsAppOrder = (product: Product) => {
    const text = encodeURIComponent(
      `Bonjour ELECTRO_FENNASSA, je souhaite commander après comparaison :\n- ${product.name} (Réf: ${product.ref})\n- Prix: ${product.price.toLocaleString('fr-FR')} DH`
    );
    window.open(`https://wa.me/${storeContact.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  Comparateur de Produits
                </h2>
                <span className="bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                  {compareList.length}/3 Produits
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Comparez les spécifications techniques, garanties et prix côte à côte
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareList.length > 1 && (
              <button
                onClick={() => setHighlightDifferences(!highlightDifferences)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  highlightDifferences
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Surligner les différences</span>
              </button>
            )}

            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-3 py-1.5 bg-slate-800 hover:bg-rose-900/40 hover:text-rose-400 text-slate-400 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors border border-slate-700"
                title="Vider la sélection"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Vider</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {compareList.length === 0 ? (
            /* Empty State */
            <div className="py-16 px-4 text-center max-w-lg mx-auto space-y-4">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700">
                <Scale className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Votre comparateur est vide
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Vous n'avez sélectionné aucun produit. Cliquez sur l'icône <Scale className="w-4 h-4 inline text-red-500 mx-0.5" /> sur n'importe quel produit de notre boutique pour comparer jusqu'à 3 articles côte à côte.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateShop) onNavigateShop();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                >
                  Découvrir les produits
                </button>
              </div>
            </div>
          ) : (
            /* Comparison Table Container */
            <div className="space-y-6">
              {/* Informational Tip Bar */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 text-xs text-amber-700 dark:text-amber-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                  <span>
                    Vous comparez actuellement <strong>{compareList.length}</strong> produit{compareList.length > 1 ? 's' : ''}. Vous pouvez ajouter jusqu'à <strong>3</strong> produits au total.
                  </span>
                </div>
                {compareList.length < 3 && (
                  <button
                    onClick={() => setShowAddSelector(!showAddSelector)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shrink-0 transition-colors shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Ajouter un {compareList.length + 1}ème produit</span>
                  </button>
                )}
              </div>

              {/* Add Product Inline Selector Drawer */}
              {showAddSelector && compareList.length < 3 && (
                <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-red-600" />
                      Sélectionner un produit à ajouter à la comparaison
                    </h4>
                    <button
                      onClick={() => setShowAddSelector(false)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
                    >
                      Fermer
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Rechercher par nom, marque, réf..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* List of candidates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pt-1">
                    {availableProductsToAdd.length === 0 ? (
                      <div className="col-span-full text-center py-4 text-xs text-slate-400">
                        Aucun produit correspondant trouvé.
                      </div>
                    ) : (
                      availableProductsToAdd.slice(0, 9).map(p => (
                        <div
                          key={p.id}
                          onClick={() => {
                            addToCompare(p);
                            if (compareList.length + 1 >= 3) {
                              setShowAddSelector(false);
                            }
                          }}
                          className="flex items-center gap-3 p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-500 cursor-pointer transition-colors group"
                        >
                          <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                          <div className="flex-1 min-w-0 text-left">
                            <span className="text-[10px] font-bold text-red-600 dark:text-red-400 block uppercase truncate">
                              {p.brand}
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate block">
                              {p.name}
                            </span>
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                              {p.price.toLocaleString('fr-FR')} DH
                            </span>
                          </div>
                          <button className="p-1.5 bg-red-600 text-white rounded-lg group-hover:scale-110 transition-transform">
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Main Side-by-Side Comparison Grid */}
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs bg-white dark:bg-slate-900">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-4 w-48 text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
                        Caractéristique
                      </th>
                      {compareList.map((product) => (
                        <th key={product.id} className="p-4 min-w-[220px] max-w-[280px] align-top border-l border-slate-200 dark:border-slate-800">
                          <div className="relative group space-y-3">
                            <button
                              onClick={() => removeFromCompare(product.id)}
                              className="absolute -top-1 -right-1 p-1 bg-slate-200 dark:bg-slate-700 hover:bg-rose-600 hover:text-white text-slate-600 dark:text-slate-300 rounded-full transition-colors z-10"
                              title="Retirer du comparateur"
                            >
                              <X className="w-4 h-4" />
                            </button>

                            <div 
                              onClick={() => onQuickView(product)}
                              className="aspect-4/3 w-full rounded-xl bg-slate-50 dark:bg-slate-950 overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-800 group-hover:border-red-500 transition-colors"
                            >
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] font-black uppercase text-red-600 dark:text-red-400 tracking-wider">
                                {product.brand}
                              </span>
                              <h3 
                                onClick={() => onQuickView(product)}
                                className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-2 hover:text-red-600 cursor-pointer transition-colors"
                              >
                                {product.name}
                              </h3>
                              <span className="text-[10px] font-mono text-slate-400 block">
                                Réf: {product.ref}
                              </span>
                            </div>
                          </div>
                        </th>
                      ))}

                      {/* Empty Slot Placeholder if < 3 products */}
                      {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                        <th key={idx} className="p-4 min-w-[220px] max-w-[280px] align-middle text-center border-l border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
                          <div className="py-8 px-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center space-y-2">
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                              <Plus className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                              Emplacement {compareList.length + idx + 1} libre
                            </span>
                            <button
                              onClick={() => setShowAddSelector(true)}
                              className="text-xs font-extrabold text-red-600 hover:text-red-700 dark:text-red-400 underline"
                            >
                              + Ajouter un produit
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                    {/* Price Row */}
                    <tr className={highlightDifferences && isPriceDifferent() ? 'bg-amber-500/10 dark:bg-amber-500/20' : ''}>
                      <td className="p-4 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/80 dark:bg-slate-800/40">
                        Prix & Offre
                      </td>
                      {compareList.map((product) => (
                        <td key={product.id} className="p-4 border-l border-slate-200 dark:border-slate-800 align-middle">
                          <div className="text-base font-black text-slate-900 dark:text-white">
                            {product.price.toLocaleString('fr-FR')} <span className="text-xs text-red-600">DH</span>
                          </div>
                          {product.originalPrice && (
                            <div className="text-[11px] text-slate-400 line-through">
                              {product.originalPrice.toLocaleString('fr-FR')} DH
                            </div>
                          )}
                          {product.promo && (
                            <span className="inline-block mt-1 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded">
                              PROMO -{product.discountPercent}%
                            </span>
                          )}
                        </td>
                      ))}
                      {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                        <td key={idx} className="p-4 border-l border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20"></td>
                      ))}
                    </tr>

                    {/* Garantie Row */}
                    <tr>
                      <td className="p-4 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/80 dark:bg-slate-800/40">
                        Garantie
                      </td>
                      {compareList.map((product) => (
                        <td key={product.id} className="p-4 border-l border-slate-200 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                          <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-bold">
                            <ShieldCheck className="w-4 h-4" />
                            {product.guaranteeYears} an{product.guaranteeYears > 1 ? 's' : ''} garantie officielle
                          </span>
                        </td>
                      ))}
                      {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                        <td key={idx} className="p-4 border-l border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20"></td>
                      ))}
                    </tr>

                    {/* Disponibilité Row */}
                    <tr>
                      <td className="p-4 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/80 dark:bg-slate-800/40">
                        Disponibilité
                      </td>
                      {compareList.map((product) => (
                        <td key={product.id} className="p-4 border-l border-slate-200 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            {product.availability} ({product.stock} en stock)
                          </span>
                        </td>
                      ))}
                      {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                        <td key={idx} className="p-4 border-l border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20"></td>
                      ))}
                    </tr>

                    {/* Catégorie Row */}
                    <tr>
                      <td className="p-4 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/80 dark:bg-slate-800/40">
                        Catégorie
                      </td>
                      {compareList.map((product) => (
                        <td key={product.id} className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                          {product.categoryName}
                        </td>
                      ))}
                      {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                        <td key={idx} className="p-4 border-l border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20"></td>
                      ))}
                    </tr>

                    {/* Dynamic Technical Specs Rows */}
                    {allSpecKeys.length > 0 && (
                      <tr className="bg-slate-100 dark:bg-slate-800/60 font-black text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        <td colSpan={4} className="p-3 pl-4">
                          Spécifications Techniques
                        </td>
                      </tr>
                    )}

                    {allSpecKeys.map((key) => {
                      const isDiff = isSpecDifferent(key);
                      return (
                        <tr key={key} className={highlightDifferences && isDiff ? 'bg-amber-500/10 dark:bg-amber-500/20' : ''}>
                          <td className="p-4 font-bold text-slate-800 dark:text-slate-200 bg-slate-50/80 dark:bg-slate-800/40 flex items-center justify-between gap-1">
                            <span>{key}</span>
                            {highlightDifferences && isDiff && (
                              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" title="Différence détectée" />
                            )}
                          </td>
                          {compareList.map((product) => {
                            const val = product.specs?.[key] || '-';
                            return (
                              <td key={product.id} className="p-4 border-l border-slate-200 dark:border-slate-800 font-medium text-slate-800 dark:text-slate-200">
                                {val !== '-' ? (
                                  <span className="font-semibold">{val}</span>
                                ) : (
                                  <span className="text-slate-400 italic text-[11px]">- Non renseigné</span>
                                )}
                              </td>
                            );
                          })}
                          {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                            <td key={idx} className="p-4 border-l border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20"></td>
                          ))}
                        </tr>
                      );
                    })}

                    {/* Description Row */}
                    <tr>
                      <td className="p-4 font-bold text-slate-900 dark:text-slate-100 bg-slate-50/80 dark:bg-slate-800/40">
                        Description
                      </td>
                      {compareList.map((product) => (
                        <td key={product.id} className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          <p className="line-clamp-4">{product.description}</p>
                        </td>
                      ))}
                      {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                        <td key={idx} className="p-4 border-l border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20"></td>
                      ))}
                    </tr>

                    {/* Actions Row */}
                    <tr className="bg-slate-50/80 dark:bg-slate-800/40">
                      <td className="p-4 font-bold text-slate-900 dark:text-slate-100">
                        Commander
                      </td>
                      {compareList.map((product) => (
                        <td key={product.id} className="p-4 border-l border-slate-200 dark:border-slate-800">
                          <div className="space-y-2">
                            <button
                              onClick={() => addToCart(product, 1)}
                              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm text-xs"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Ajouter au Panier</span>
                            </button>

                            <button
                              onClick={() => handleWhatsAppOrder(product)}
                              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-3 rounded-xl flex items-center justify-center gap-1 transition-colors text-[11px]"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp Express</span>
                            </button>

                            <button
                              onClick={() => onQuickView(product)}
                              className="w-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-1 px-3 rounded-xl flex items-center justify-center gap-1 transition-colors text-[11px]"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Aperçu détaillé</span>
                            </button>
                          </div>
                        </td>
                      ))}
                      {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                        <td key={idx} className="p-4 border-l border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20"></td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
