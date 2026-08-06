import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { INITIAL_CONTACT } from '../data/initialData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow?: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onBuyNow
}) => {
  if (!product) return null;

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    if (onBuyNow) onBuyNow(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 p-6 bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
          <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-inner">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.promo && (
              <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-md">
                -{product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-orange-600 scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specifications & Actions */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-orange-600 dark:text-orange-400">
              <span className="uppercase tracking-wider">{product.brand}</span>
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                {product.availability}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-mono">
                Réf: {product.ref}
              </span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-mono">
                SKU: {product.sku}
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-2xl border border-orange-200/60 dark:border-orange-900/40 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Prix spécial ELECTRO_FENNASSA</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white flex items-baseline gap-1">
                  <span>{product.price.toLocaleString('fr-FR')}</span>
                  <span className="text-sm font-bold text-orange-600">DH</span>
                </div>
              </div>
              {product.originalPrice && (
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through block">
                    {product.originalPrice.toLocaleString('fr-FR')} DH
                  </span>
                  <span className="text-xs font-bold text-rose-600">
                    Économie: {(product.originalPrice - product.price).toLocaleString('fr-FR')} DH
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Specs List */}
            {product.specs && (
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Spécifications Techniques</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                      <span className="text-slate-400 font-medium block text-[10px]">{key}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3 mt-6">
            <div className="flex items-center gap-3">
              {/* Qty Selector */}
              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ajouter au Panier</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-colors ${
                  inWishlist
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-slate-300 dark:border-slate-700 text-slate-600 hover:text-rose-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Quick Order Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleBuyNow}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Acheter Maintenant
              </button>
              <a
                href={`https://wa.me/212644543909?text=Bonjour,%20je%20suis%20intéressé%20par%20le%20produit%20:${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Express</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
