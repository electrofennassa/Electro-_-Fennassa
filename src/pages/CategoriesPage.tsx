import React from 'react';
import { ArrowRight, Box, Grid } from 'lucide-react';
import { INITIAL_CATEGORIES } from '../data/initialData';

interface CategoriesPageProps {
  setCurrentView: (view: string) => void;
  setSelectedCategory: (cat: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  setCurrentView,
  setSelectedCategory
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
          Nos Rayons Spécialisés
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Catégories Électroménager & Ameublement
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Trouvez facilement tous les équipements pour votre domicile à Taourirt avec garantie fabricant.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {INITIAL_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentView('shop');
            }}
            className="group relative bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="aspect-4/3 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-lg font-bold">{cat.name}</h3>
                <span className="text-[11px] text-orange-300 font-medium">
                  {cat.productCount || 8}+ modèles disponibles
                </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {cat.description}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-orange-600 dark:text-orange-400">
                <span>Parcourir le rayon</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
