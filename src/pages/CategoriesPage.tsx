import React, { useState } from 'react';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CategoriesPageProps {
  setCurrentView: (view: string) => void;
  setSelectedCategory: (cat: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  setCurrentView,
  setSelectedCategory
}) => {
  const { categories } = useCart();
  const [filterText, setFilterText] = useState('');

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(filterText.toLowerCase()) ||
    c.description.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-950 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 relative overflow-hidden space-y-4 text-center">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        
        <span className="bg-red-500/10 text-red-400 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-2 border border-red-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          Nos Rayons Spécialisés
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Catégories Électroménager & Ameublement
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
          Trouvez facilement tous les équipements pour votre domicile à Taourirt avec garantie fabricant officielle et livraison rapide.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative pt-2">
          <input
            type="text"
            placeholder="Rechercher une catégorie (ex: Réfrigérateurs, Lave-Linge)..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full bg-slate-900 text-white placeholder-slate-400 text-xs px-10 py-3 rounded-2xl border border-slate-700 focus:outline-none focus:border-red-500 transition-all shadow-lg"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentView('shop');
            }}
            className="group relative bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-2xl hover:border-red-500/50 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="aspect-16/10 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="bg-red-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded inline-block mb-1">
                  RAYON OFFICIEL ({cat.productCount || 8}+)
                </span>
                <h3 className="text-lg font-black text-white">{cat.name}</h3>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {cat.description || "Découvrez notre sélection complète d'équipements récents."}
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-red-600 dark:text-red-400">
                <span>Parcourir les produits</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

