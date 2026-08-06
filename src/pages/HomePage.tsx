import React from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  PackageCheck,
  Flame,
  BadgeCheck,
  CreditCard
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { INITIAL_CONTACT } from '../data/initialData';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  setCurrentView: (view: string) => void;
  setSelectedCategory: (cat: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onQuickView,
  setCurrentView,
  setSelectedCategory
}) => {
  const { categories, packs, storeContact } = useCart();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const promoProducts = products.filter(p => p.promo || (p.discountPercent && p.discountPercent > 0)).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-950 text-white py-16 md:py-24 px-4 sm:px-8 rounded-3xl mx-4 mt-4 border border-slate-800 shadow-2xl">
        {/* Subtle decorative glow & grid background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Leader Électroménager & Ameublement Taourirt</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Équipez Votre Maison au <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-red-600">Meilleur Prix</span> au Maroc
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
              Réfrigérateurs NoFrost, Lave-linge Inverter, Smart TV 4K, Climatiseurs et Literie de Luxe. Profitez de nos offres spéciales, livraison rapide et du paiement à la livraison après contrôle.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentView('shop')}
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-red-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Voir le Catalogue</span>
              </button>

              <button
                onClick={() => setCurrentView('packs')}
                className="bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 border border-zinc-700"
              >
                <Zap className="w-4 h-4 text-red-500 fill-red-500" />
                <span>Packs Spéciaux (-20%)</span>
              </button>

              <a
                href={`https://wa.me/${storeContact.whatsapp.replace(/[^0-9]/g, '')}?text=Bonjour%20ELECTRO_FENNASSA,%20je%20souhaite%20obtenir%20des%20informations`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Commander sur WhatsApp</span>
              </a>
            </div>

            {/* Micro Specs Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="space-y-0.5">
                <span className="text-white font-black text-lg flex items-center gap-1">
                  100%
                  <BadgeCheck className="w-4 h-4 text-sky-400" />
                </span>
                <span className="text-slate-400">Garantie Constructeur</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-red-400 font-black text-lg block">24h - 48h</span>
                <span className="text-slate-400">Livraison Taourirt & Orient</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-emerald-400 font-black text-lg block">Cash / CB</span>
                <span className="text-slate-400">Paiement à la Livraison</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-800 group">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1000&q=80"
                alt="Électroménager ELECTRO_FENNASSA"
                className="w-full h-[390px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2 text-left">
                <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
                  Boutique Officielle Taourirt
                </span>
                <h3 className="text-xl font-black text-white">
                  Électroménager & Ameublement de Qualité
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  Qualité supérieure certifiée, service après-vente direct et meilleurs tarifs garantis à Taourirt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Livraison Express</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Taourirt & Région de l'Orient</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Garantie 2 ans</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Support Constructeur Direct</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Paiement à la livraison</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Contrôle avant paiement</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Service Client 7j/7</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Assistance WhatsApp Rapide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ventes Flash & Promos Bar */}
      {promoProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="bg-gradient-to-r from-red-700 via-rose-600 to-red-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <span className="bg-white/20 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded tracking-wider inline-flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
                Vente Flash de la Semaine
              </span>
              <h3 className="text-xl sm:text-2xl font-black">Offres Spéciales sur Électroménager Sélectionné</h3>
              <p className="text-xs text-rose-100">Remises immédiates allant jusqu'à -20% dans notre magasin à Taourirt</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('promotions')}
                className="bg-white text-red-600 hover:bg-rose-50 font-black text-xs py-3 px-5 rounded-2xl shadow-md flex items-center gap-1.5 transition-transform hover:scale-105"
              >
                <span>Toutes les Promos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {promoProducts.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
            ))}
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <span className="text-xs font-bold text-red-600 dark:text-red-500 uppercase tracking-widest">
              Catalogue & Rayons
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Nos Rayons Électroménager & Ameublement
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('categories')}
            className="text-xs font-bold text-red-600 dark:text-red-500 hover:underline flex items-center gap-1"
          >
            <span>Voir toutes les catégories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 12).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentView('shop');
              }}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-red-600/50 transition-all cursor-pointer flex flex-col aspect-4/3 sm:aspect-square"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:from-slate-950/95 transition-all" />

              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex flex-col justify-end text-left z-10">
                <span className="bg-red-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md w-fit mb-1 shadow-sm">
                  {cat.productCount || 8}+ MODÈLES
                </span>
                <h4 className="font-extrabold text-white text-sm sm:text-base leading-snug drop-shadow-md group-hover:text-red-400 transition-colors">
                  {cat.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packs Showcase Spotlight */}
      {packs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 relative overflow-hidden space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="bg-red-600/20 text-red-400 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-red-500/30">
                  <PackageCheck className="w-4 h-4" />
                  Packs Économiques Spécial Mariage & Maison
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-2">Équipez Toute la Maison d'un Seul Coup</h2>
                <p className="text-xs text-slate-400 max-w-xl">
                  Bénéficiez de remises considérables en achetant vos ensembles (Réfrigérateur + Lave Linge + Télévision + Four encastré).
                </p>
              </div>

              <button
                onClick={() => setCurrentView('packs')}
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2"
              >
                <span>Découvrir tous les Packs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {packs.slice(0, 3).map((pack) => (
                <div
                  key={pack.id}
                  onClick={() => setCurrentView('packs')}
                  className="bg-slate-900 hover:bg-slate-850 border border-slate-800 p-5 rounded-2xl cursor-pointer space-y-3 transition-all hover:border-red-500/50"
                >
                  <img src={pack.image} alt={pack.name} className="w-full h-36 object-cover rounded-xl" />
                  <div>
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded">
                      {pack.type}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-1 line-clamp-1">{pack.name}</h4>
                  </div>
                  <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
                    <span className="text-xs text-slate-400 line-through">{pack.originalPrice.toLocaleString('fr-FR')} DH</span>
                    <span className="text-lg font-black text-red-500">{pack.packPrice.toLocaleString('fr-FR')} DH</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <span className="text-xs font-bold text-red-600 dark:text-red-500 uppercase tracking-widest">
              Sélection Vedette
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Les Meilleures Ventes à Taourirt
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-bold text-red-600 dark:text-red-500 hover:underline flex items-center gap-1"
          >
            <span>Voir toute la boutique</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-red-600 dark:text-red-500 uppercase tracking-widest">
            Satisfaction Client
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Avis & Témoignages de nos Clients à Taourirt
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 italic">
              "J'ai acheté mon réfrigérateur LG NoFrost et mon lave-linge chez ELECTRO_FENNASSA à Taourirt. Service rapide, livraison le jour même et prix très correct par rapport aux autres magasins."
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Karim B.</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Achat Vérifié - Taourirt
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 italic">
              "J'ai commandé le Pack Spécial Mariage (Trio Réfrigérateur + TV + Lave Linge). Une économie réelle de plus de 1500 DH ! Je recommande vivement."
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Fatima Z.</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Achat Vérifié - Oujda
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 italic">
              "Livraison très professionnelle avec déballage et vérification sur place avant paiement. Très bonne garantie constructeur 2 ans."
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Youssef M.</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Achat Vérifié - Taourirt
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Physical Store Info Footer Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-red-500 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Visitez Notre Showroom Physique</span>
            </div>
            <h3 className="text-2xl font-black">ELECTRO_FENNASSA - Taourirt</h3>
            <p className="text-xs text-slate-300 max-w-md">
              {storeContact.address}, {storeContact.city}, Maroc. Ouvert du Lundi au Samedi de 09h00 à 21h00.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${storeContact.phone}`}
              className="bg-white text-slate-900 hover:bg-slate-100 font-black text-xs px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>{storeContact.phone}</span>
            </a>
            <a
              href={`https://wa.me/${storeContact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

