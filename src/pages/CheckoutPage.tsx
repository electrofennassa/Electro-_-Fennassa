import React, { useState } from 'react';
import { 
  CheckCircle, 
  MapPin, 
  Phone, 
  User as UserIcon, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  FileText,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import { InvoiceModal } from '../components/InvoiceModal';

interface CheckoutPageProps {
  setCurrentView: (view: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ setCurrentView }) => {
  const { cart, totalAmount, createOrder } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+212');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || 'Taourirt');
  const [paymentMethod, setPaymentMethod] = useState<'Paiement à la livraison' | 'Carte Bancaire' | 'Virement Bancaire'>('Paiement à la livraison');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const moroccanCities = [
    'Taourirt',
    'Oujda',
    'Nador',
    'Berkane',
    'Fès',
    'Meknès',
    'Taza',
    'Casablanca',
    'Rabat',
    'Tanger',
    'Marrakech',
    'Agadir'
  ];

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !address) return;

    setSubmitting(true);

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      productRef: item.product.ref,
      unitPrice: item.product.price,
      quantity: item.quantity,
      totalPrice: item.product.price * item.quantity,
      image: item.product.images[0]
    }));

    const order = await createOrder({
      customerName,
      customerEmail: customerEmail || 'client@electro-fennassa.ma',
      customerPhone,
      address,
      city,
      totalAmount,
      shippingFee: city === 'Taourirt' ? 0 : 100,
      paymentMethod,
      items: orderItems,
      notes
    });

    setSubmitting(false);
    setCreatedOrder(order);
  };

  if (createdOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
          <CheckCircle className="w-10 h-10" />
        </div>

        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
          Commande Confirmée avec Succès
        </span>

        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Merci pour votre commande, {createdOrder.customerName} !
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
          Votre commande <span className="font-mono font-bold text-orange-600">{createdOrder.orderNumber}</span> d'un montant de <span className="font-bold">{createdOrder.totalAmount.toLocaleString('fr-FR')} DH</span> a été prise en compte. Notre équipe à Taourirt vous contactera très rapidement au <span className="font-bold">{createdOrder.customerPhone}</span>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setCreatedOrder(createdOrder)}
            className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs py-3.5 px-6 rounded-2xl flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <FileText className="w-4 h-4" />
            <span>Voir / Télécharger Facture PDF</span>
          </button>

          <button
            onClick={() => setCurrentView('shop')}
            className="bg-orange-600 text-white font-extrabold text-xs py-3.5 px-6 rounded-2xl shadow-md hover:bg-orange-500 transition-colors"
          >
            Continuer mes achats
          </button>
        </div>

        {/* Render Invoice Modal */}
        <InvoiceModal order={createdOrder} onClose={() => setCreatedOrder(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Finaliser ma Commande
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Livraison rapide & sécurisée à Taourirt et dans tout le Maroc
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Customer Details Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <UserIcon className="w-4 h-4 text-orange-600" />
              <span>Coordonnées de Livraison</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Mohamed Amrani"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Numéro de Téléphone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="ex: +212 6 12 34 56 78"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Adresse Email (optionnel pour la facture)
                </label>
                <input
                  type="email"
                  placeholder="ex: mohamed@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ville de Livraison *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white"
                >
                  {moroccanCities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Adresse de Livraison Exacte *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="ex: Hay Jdid, Rue 12, N° 45 (Près de la Grande Mosquée)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <CreditCard className="w-4 h-4 text-orange-600" />
              <span>Mode de Paiement</span>
            </h3>

            <div className="space-y-3 text-xs font-semibold">
              <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-colors ${
                paymentMethod === 'Paiement à la livraison'
                  ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-900 dark:text-orange-200'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Paiement à la livraison'}
                    onChange={() => setPaymentMethod('Paiement à la livraison')}
                    className="accent-orange-600"
                  />
                  <div>
                    <span className="font-bold block">Paiement à la Livraison (Cash on Delivery)</span>
                    <span className="text-[10px] text-slate-400">Payez en espèces après déballage et vérification de l'appareil à Taourirt.</span>
                  </div>
                </div>
                <Truck className="w-5 h-5 text-orange-600" />
              </label>

              <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-colors ${
                paymentMethod === 'Carte Bancaire'
                  ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-900 dark:text-orange-200'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Carte Bancaire'}
                    onChange={() => setPaymentMethod('Carte Bancaire')}
                    className="accent-orange-600"
                  />
                  <div>
                    <span className="font-bold block">Carte Bancaire Marocaine / Internationale</span>
                    <span className="text-[10px] text-slate-400">Transaction sécurisée CMI Maroc.</span>
                  </div>
                </div>
                <CreditCard className="w-5 h-5 text-sky-600" />
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary & Final Submit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-700 pb-3">
              Articles de votre commande ({cart.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={item.product.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg shrink-0" />
                    <div className="min-w-0">
                      <h5 className="font-bold text-slate-900 dark:text-slate-100 truncate">{item.product.name}</h5>
                      <span className="text-[10px] text-slate-400 font-mono">Qté: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    {(item.product.price * item.quantity).toLocaleString('fr-FR')} DH
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-700 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Frais de livraison</span>
                <span className="text-emerald-600 font-bold">
                  {city === 'Taourirt' ? 'Gratuit (Taourirt)' : '100 DH'}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-700">
                <span>Montant Total</span>
                <span className="text-orange-600 font-mono">
                  {(totalAmount + (city === 'Taourirt' ? 0 : 100)).toLocaleString('fr-FR')} DH
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs py-4 rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 mt-4"
            >
              <span>{submitting ? 'Confirmation en cours...' : 'Confirmer et Réserver ma Commande'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
