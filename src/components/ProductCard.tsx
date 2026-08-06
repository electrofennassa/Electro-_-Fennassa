import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, ShieldCheck, CheckCircle, Tag } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onSelectProduct
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [hoveredImage, setHoveredImage] = useState(false);
  const [added, setAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      onQuickView(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Area */}
      <div 
        className="relative aspect-4/3 w-full bg-slate-100 dark:bg-slate-900/50 overflow-hidden"
        onMouseEnter={() => setHoveredImage(true)}
        onMouseLeave={() => setHoveredImage(false)}
      >
        <img
          src={
            hoveredImage && product.images[1]
              ? product.images[1]
              : product.images[0] || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80'
          }
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.promo && (
            <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wide">
              {product.discountPercent ? `-${product.discountPercent}%` : 'PROMO'}
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wide">
              VEDETTE
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label="Ajouter aux favoris"
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            inWishlist
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-xs font-bold px-3.5 py-2 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1.5 transition-all duration-200"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Aperçu Rapide</span>
        </button>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Stock Row */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-1">
            <span className="uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold">
              {product.brand}
            </span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle className="w-3 h-3" />
              {product.availability}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>

          {/* Specs / SKU Line */}
          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="bg-slate-100 dark:bg-slate-700/60 px-1.5 py-0.5 rounded font-mono text-[10px]">
              {product.ref}
            </span>
            <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-medium">
              <ShieldCheck className="w-3 h-3" />
              {product.guaranteeYears} an{product.guaranteeYears > 1 ? 's' : ''} garantie
            </span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-black text-slate-900 dark:text-white flex items-baseline gap-1">
              <span>{product.price.toLocaleString('fr-FR')}</span>
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400">DH</span>
            </div>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {product.originalPrice.toLocaleString('fr-FR')} DH
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              added
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-orange-600 hover:bg-orange-500 text-white active:scale-95'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{added ? 'Ajouté !' : 'Ajouter'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
