import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, ShieldCheck, CheckCircle, MessageCircle, Share2, Check } from 'lucide-react';
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
  const { addToCart, toggleWishlist, isInWishlist, storeContact } = useCart();
  const [hoveredImage, setHoveredImage] = useState(false);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleShareProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('product', product.id);
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Bonjour ELECTRO_FENNASSA, je souhaite commander l'article :\n- ${product.name} (Réf: ${product.ref})\n- Prix: ${product.price.toLocaleString('fr-FR')} DH`
    );
    window.open(`https://wa.me/${storeContact.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
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
      className="group relative bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/90 dark:border-slate-700/80 overflow-hidden shadow-xs hover:shadow-2xl hover:border-orange-500/40 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Area */}
      <div 
        className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-900/60 overflow-hidden"
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
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.promo && (
            <span className="bg-gradient-to-r from-rose-600 to-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider">
              {product.discountPercent ? `-${product.discountPercent}% OFF` : 'PROMO'}
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider">
              VEDETTE
            </span>
          )}
        </div>

        {/* Top Right Action Buttons (Wishlist & Share) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handleShareProduct}
            aria-label="Partager le lien du produit"
            title={copied ? "Lien copié !" : "Copier le lien du produit"}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md relative ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {copied && (
              <span className="absolute -bottom-7 right-0 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                Lien copié !
              </span>
            )}
          </button>

          <button
            onClick={handleToggleWishlist}
            aria-label="Ajouter aux favoris"
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              inWishlist
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-xs font-bold py-2 px-3 rounded-xl shadow-lg backdrop-blur-sm flex items-center justify-center gap-1.5 transition-all hover:bg-slate-900"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Aperçu</span>
          </button>

          <button
            onClick={handleWhatsAppOrder}
            title="Commander rapidement sur WhatsApp"
            className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Stock Row */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-1">
            <span className="uppercase tracking-wider text-red-600 dark:text-red-500 font-extrabold">
              {product.brand}
            </span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium text-[10px]">
              <CheckCircle className="w-3 h-3" />
              {product.availability}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {product.name}
          </h3>

          {/* Specs / SKU Line */}
          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="bg-slate-100 dark:bg-slate-700/60 px-1.5 py-0.5 rounded font-mono text-[10px]">
              {product.ref}
            </span>
            <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-medium text-[10px]">
              <ShieldCheck className="w-3 h-3" />
              {product.guaranteeYears} an{product.guaranteeYears > 1 ? 's' : ''} garantie
            </span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-black text-slate-900 dark:text-white flex items-baseline gap-1">
              <span>{product.price.toLocaleString('fr-FR')}</span>
              <span className="text-xs font-bold text-red-600 dark:text-red-500">DH</span>
            </div>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {product.originalPrice.toLocaleString('fr-FR')} DH
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              added
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-red-600 hover:bg-red-700 text-white active:scale-95 shadow-red-600/20'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{added ? 'Ajouté !' : 'Commander'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

