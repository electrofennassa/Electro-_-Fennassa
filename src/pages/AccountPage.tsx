import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Package, 
  Heart, 
  FileText, 
  LogOut, 
  Shield, 
  CheckCircle,
  Truck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { InvoiceModal } from '../components/InvoiceModal';
import { Order, Product } from '../types';

interface AccountPageProps {
  setCurrentView: (view: string) => void;
  onQuickView: (product: Product) => void;
  onOpenLoginModal: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  setCurrentView,
  onQuickView,
  onOpenLoginModal
}) => {
  const { user, logout, isAdmin } = useAuth();
  const { orders, wishlist } = useCart();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist'>('orders');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950/50 text-orange-600 rounded-2xl mx-auto flex items-center justify-center font-black text-2xl">
          EF
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Espace Mon Compte
        </h2>
        <p className="text-xs text-slate-500">
          Veuillez vous connecter pour consulter vos commandes et vos favoris.
        </p>
        <button
          onClick={onOpenLoginModal}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-md transition-all"
        >
          Se Connecter
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Account Profile Card Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 dark:text-white">{user.name}</h1>
              {isAdmin && (
                <span className="bg-orange-600 text-white text-[9px] uppercase px-2 py-0.5 rounded font-black">
                  ADMIN
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">{user.email} • {user.phone || '+212644543909'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <button
              onClick={() => setCurrentView('admin')}
              className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Shield className="w-4 h-4 text-orange-500" />
              <span>Tableau de Bord Admin</span>
            </button>
          )}

          <button
            onClick={logout}
            className="p-2.5 text-slate-500 hover:text-rose-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Se déconnecter"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 text-sm font-bold gap-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-orange-600 text-orange-600 dark:text-orange-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Mes Commandes ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'wishlist'
              ? 'border-orange-600 text-orange-600 dark:text-orange-400 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Mes Favoris ({wishlist.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' ? (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-xs text-slate-500 py-8 text-center">Aucune commande enregistrée pour le moment.</p>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs border-b border-slate-100 dark:border-slate-700 pb-3">
                  <div>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm block">
                      Commande {ord.orderNumber}
                    </span>
                    <span className="text-slate-400">
                      Du {new Date(ord.createdAt).toLocaleDateString('fr-FR')} • {ord.items.length} article(s)
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      ord.status === 'Livrée'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {ord.status}
                    </span>

                    <button
                      onClick={() => setSelectedInvoiceOrder(ord)}
                      className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-orange-600" />
                      <span>Facture PDF</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{it.productName} (x{it.quantity})</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{it.totalPrice.toLocaleString('fr-FR')} DH</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-500">Total Réglé ({ord.paymentMethod})</span>
                  <span className="text-base font-black text-orange-600 font-mono">
                    {ord.totalAmount.toLocaleString('fr-FR')} DH
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.length === 0 ? (
            <p className="text-xs text-slate-500 py-8 col-span-full text-center">Aucun produit dans vos favoris.</p>
          ) : (
            wishlist.map(p => (
              <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
            ))
          )}
        </div>
      )}

      {/* Invoice Modal */}
      <InvoiceModal
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
      />
    </div>
  );
};
