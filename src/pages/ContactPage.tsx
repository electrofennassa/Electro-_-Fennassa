import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Building2,
  Navigation
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ContactPage: React.FC = () => {
  const { storeContact } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-orange-500/20">
          <Building2 className="w-4 h-4" />
          Magasin Physique & Support Client
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Contactez ELECTRO_FENNASSA
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Rendez-nous visite dans notre showroom à Taourirt ou posez vos questions à nos conseillers techniques.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-700 pb-3">
              Coordonnées du Magasin
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">Adresse du Showroom</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    {storeContact.address}, {storeContact.city}, {storeContact.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">Téléphone Direct</h4>
                  <a href={`tel:${storeContact.phone}`} className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                    {storeContact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">Email Officiel</h4>
                  <a href={`mailto:${storeContact.email}`} className="text-sky-600 dark:text-sky-400 font-bold hover:underline">
                    {storeContact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">Horaires d'ouverture</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    {storeContact.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Button */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
              <a
                href={`https://wa.me/${storeContact.whatsapp.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(storeContact.name)},%20je%20souhaite%20une%20information.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuter directement sur WhatsApp ({storeContact.whatsapp})</span>
              </a>
            </div>
          </div>

          {/* Map Preview Mockup */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm flex items-center gap-2">
                <Navigation className="w-4 h-4 text-orange-400" />
                <span>Localisation Taourirt</span>
              </h4>
              <span className="text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded font-bold">
                BD LA RÉSISTANCE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Notre magasin est situé en plein cœur de Hay Jdid sur le Boulevard la Résistance à Taourirt.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-700 pb-3">
              Envoyez-nous un Message
            </h3>

            {submitted && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-400 text-xs rounded-2xl flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Votre message a été envoyé avec succès ! Nous vous répondrons très vite.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Votre Nom Complet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Rachid El Kadi"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                    placeholder="ex: +212 6 44 54 39 09"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Adresse Email (optionnel)
                </label>
                <input
                  type="email"
                  placeholder="ex: contact@exemple.ma"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Sujet de votre demande *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Demande de prix pack matelas ou disponibilité réfrigérateur"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Votre Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Posez-nous vos questions..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer le Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
