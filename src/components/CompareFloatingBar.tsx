import React, { useEffect, useState } from 'react';
import { Scale, X, Trash2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CompareFloatingBar: React.FC = () => {
  const { 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    setIsCompareModalOpen, 
    isCompareModalOpen,
    compareToastMessage,
    clearCompareToastMessage
  } = useCart();

  const [isMinimized, setIsMinimized] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  // Auto hide toast after 3.5 seconds
  useEffect(() => {
    if (compareToastMessage) {
      setToastVisible(true);
      const timer = setTimeout(() => {
        setToastVisible(false);
        clearCompareToastMessage();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [compareToastMessage, clearCompareToastMessage]);

  return (
    <>
      {/* Toast Notification Box */}
      {toastVisible && compareToastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-fade-in backdrop-blur-md">
          <div className="p-2 bg-red-600 text-white rounded-xl shrink-0">
            <Scale className="w-4 h-4" />
          </div>
          <p className="text-xs font-semibold leading-snug flex-1">
            {compareToastMessage}
          </p>
          <button
            onClick={() => setToastVisible(false)}
            className="p-1 hover:bg-slate-800 text-slate-400 rounded-lg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Compare Bottom Bar */}
      {compareList.length > 0 && !isCompareModalOpen && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto bg-slate-950/95 text-white rounded-2xl sm:rounded-full p-2.5 sm:px-5 sm:py-3 shadow-2xl border border-slate-800 backdrop-blur-md flex items-center justify-between gap-3 sm:gap-6 animate-fade-in transition-all">
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Compare Icon Badge */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-white font-black text-xs shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform shrink-0">
                <Scale className="w-4 h-4" />
              </div>
              <div className="hidden min-[400px]:block">
                <div className="text-xs font-extrabold flex items-center gap-1.5 leading-none">
                  <span>Comparateur</span>
                  <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                    {compareList.length}/3
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  {compareList.length === 1 ? 'Ajoutez encore 1 ou 2 produits' : 'Prêt à comparer !'}
                </span>
              </div>
            </button>

            {/* Product Thumbnails Circle Row */}
            <div className="flex items-center -space-x-2 overflow-hidden py-1">
              {compareList.map((product) => (
                <div 
                  key={product.id} 
                  className="relative group shrink-0"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-slate-950 shadow-md bg-white"
                  />
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute -top-1 -right-1 p-0.5 bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                    title="Retirer"
                  >
                    <X className="w-2.5 h-2.5 stroke-[3]" />
                  </button>
                </div>
              ))}

              {/* Free Slot Circles */}
              {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-dashed border-slate-700 bg-slate-900/60 flex items-center justify-center text-slate-500 text-[10px] font-bold shrink-0"
                  title="Emplacement vide (jusqu'à 3 produits)"
                >
                  +
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-full shadow-lg shadow-red-600/30 flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <span>Comparer ({compareList.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={clearCompare}
              className="p-2 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-xl sm:rounded-full transition-colors"
              title="Vider la comparaison"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
