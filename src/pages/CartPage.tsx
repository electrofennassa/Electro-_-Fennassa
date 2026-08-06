import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck, 
  X,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  setCurrentView: (view: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ setCurrentView }) => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    subtotalAmount, 
    totalAmount, 
    promoDiscount,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMsg(res);
    if (res.success) setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-orange-100 dark:bg-orange-950/50 text-orange-600 rounded-3xl mx-auto flex items-center justify-center">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Votre Panier est Actuellement Vide
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Découvrez notre catalogue d'électroménager et d'ameublement de qualité supérieure à Taourirt.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs py-3.5 px-8 rounded-2xl shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Explorer la Boutique</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Mon Panier d'Achat
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {cart.length} article{cart.length > 1 ? 's' : ''} sélectionné{cart.length > 1 ? 's' : ''}
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:underline font-bold flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          <span>Vider le panier</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-2xl bg-slate-100 dark:bg-slate-900 shrink-0"
                />
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase">
                    {item.product.brand}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-2">
                    {item.product.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Réf: {item.product.ref}
                  </div>
                </div>
              </div>

              {/* Qty & Controls */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-700">
                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <button
                    onClick={() => updateQuantity(item.product.id, -1)}
                    className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, 1)}
                    className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-slate-900 dark:text-white block font-mono">
                    {(item.product.price * item.quantity).toLocaleString('fr-FR')} DH
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.product.price.toLocaleString('fr-FR')} DH / un.
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6 sticky top-24">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-700 pb-3">
              Récapitulatif de Commande
            </h3>

            {/* Coupon Code Form */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-orange-600" />
                <span>Code Promo (ex: FENNASSA10, MARIAGE15)</span>
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-400 p-2.5 rounded-xl text-xs font-bold">
                  <span>Code : {appliedCoupon} (-10%)</span>
                  <button onClick={removeCoupon} className="text-rose-600 hover:underline">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Saisir code..."
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs uppercase text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold px-4 py-2 rounded-xl"
                  >
                    Appliquer
                  </button>
                </form>
              )}

              {couponMsg && (
                <p className={`text-[11px] font-semibold ${couponMsg.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {couponMsg.message}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs border-t border-slate-100 dark:border-slate-700 pt-4">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Sous-total articles</span>
                <span className="font-bold font-mono">{subtotalAmount.toLocaleString('fr-FR')} DH</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Remise code promo</span>
                  <span className="font-mono">-{promoDiscount.toLocaleString('fr-FR')} DH</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Livraison Taourirt & Région</span>
                <span className="text-emerald-600 font-bold">Gratuite</span>
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-3 border-t border-slate-100 dark:border-slate-700">
                <span>Total TTC</span>
                <span className="text-orange-600 font-mono">{totalAmount.toLocaleString('fr-FR')} DH</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('checkout')}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Valider la Commande</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
