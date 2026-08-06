import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Download, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Code2, 
  Terminal,
  ExternalLink,
  MessageCircle,
  PackageCheck,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { downloadProjectZip } from '../utils/projectZip';

interface FooterProps {
  setCurrentView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  const { storeContact } = useCart();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Guarantees & Features Bar */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl border border-orange-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Livraison Rapide Maroc</h4>
              <p className="text-xs text-slate-400 mt-0.5">Livraison gratuite sur Taourirt & expédition sécurisée dans tout le Maroc.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Garantie 100% Officielle</h4>
              <p className="text-xs text-slate-400 mt-0.5">Tous nos produits sont garantis constructeur de 1 à 5 ans.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Paiement Sécurisé</h4>
              <p className="text-xs text-slate-400 mt-0.5">Payez à la livraison après inspection de votre appareil.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Support Client 7j/7</h4>
              <p className="text-xs text-slate-400 mt-0.5">Notre équipe à Taourirt est à votre écoute par téléphone & WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Bio */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-lg shadow-md">
              EF
            </div>
            <span className="text-xl font-extrabold text-white">
              ELECTRO<span className="text-red-500">_FENNASSA</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Spécialiste de référence à Taourirt pour la vente d'électroménager de grandes marques (Samsung, LG, Bosch, Whirlpool) et d'ameublement de qualité (Matelas orthopédiques, Lits capitonnés, Salles à manger).
          </p>

          <div className="pt-2">
            <a
              href={`https://wa.me/212644543909?text=Bonjour%20ELECTRO_FENNASSA,%20je%20souhaite%20des%20informations`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Commander via WhatsApp (+212 644-543909)</span>
            </a>
          </div>
        </div>

        {/* Quick Navigation */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
            Navigation Rapide
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentView('home')} className="hover:text-red-400 transition-colors">Accueil</button>
            </li>
            <li>
              <button onClick={() => setCurrentView('shop')} className="hover:text-red-400 transition-colors">Boutique & Catalogue</button>
            </li>
            <li>
              <button onClick={() => setCurrentView('categories')} className="hover:text-red-400 transition-colors">Toutes les Catégories</button>
            </li>
            <li>
              <button onClick={() => setCurrentView('packs')} className="hover:text-red-400 text-red-400 font-bold transition-colors flex items-center gap-1">
                <PackageCheck className="w-3.5 h-3.5" /> Packs Spéciaux (-20%)
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('promotions')} className="hover:text-red-400 text-rose-400 font-bold transition-colors flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Promotions Flash
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('faq')} className="hover:text-red-400 transition-colors">Foire Aux Questions (FAQ)</button>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
            Rayons Principaux
          </h4>
          <ul className="space-y-2 text-xs">
            <li>Réfrigérateurs & Congélateurs</li>
            <li>Lave-linge & Séchantes</li>
            <li>Téléviseurs Smart TV 4K</li>
            <li>Climatiseurs Inverter</li>
            <li>Fours, Plaques & Hottes</li>
            <li>Ameublement, Matelas & Lits</li>
          </ul>
        </div>

        {/* Store Contact & Android/Termux Download */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-red-600 pl-2">
            Magasin & Développeur
          </h4>
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{storeContact.address}, {storeContact.city}, {storeContact.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href={`tel:${storeContact.phone}`} className="hover:text-white">{storeContact.phone}</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <a href={`mailto:${storeContact.email}`} className="hover:text-white">{storeContact.email}</a>
            </div>
          </div>

          {/* Android / Termux Zip Download Button */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={downloadProjectZip}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-red-400 border border-slate-700 hover:border-red-500/50 text-xs font-bold py-2.5 px-3 rounded-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger le Projet (.ZIP pour Termux/Acode)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Developer Notice */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-4 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2026 ELECTRO_FENNASSA. Tous droits réservés. Taourirt, Maroc.</p>
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView('docs')} className="hover:text-slate-300 underline flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              Doc Android / Termux / Vercel
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
