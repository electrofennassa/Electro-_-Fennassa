import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const faqs = [
    {
      q: "Où se trouve le magasin ELECTRO_FENNASSA à Taourirt ?",
      a: "Notre magasin principal est situé sur le Boulevard la Résistance, Hay Jdid à Taourirt, Maroc. Nous vous accueillons du lundi au samedi de 09h00 à 21h00."
    },
    {
      q: "Quels sont les modes de paiement acceptés ?",
      a: "Nous privilégions le Paiement à la Livraison (Cash on Delivery) : vous réglez votre commande en espèces après déballage et inspection de votre appareil. Nous acceptons également la Carte Bancaire Marocaine et le Virement Bancaire."
    },
    {
      q: "Comment fonctionne la livraison à Taourirt et au Maroc ?",
      a: "La livraison est 100% GRATUITE dans toute la ville de Taourirt sous 24h. Pour les autres villes (Oujda, Nador, Berkane, Fès, Casablanca, etc.), nous expédions par nos livreurs spécialisés sous 24 à 48 heures."
    },
    {
      q: "Quelle est la garantie appliquée sur les appareils ?",
      a: "Tous nos produits électroménagers et literies sont 100% neufs, authentiques et accompagnés d'une garantie constructeur de 1 à 5 ans. Les moteurs de réfrigérateurs Samsung et lave-linge LG bénéficient de garanties jusqu'à 10 ans."
    },
    {
      q: "Qu'est-ce qu'un Pack Spécial Électroménager ?",
      a: "Un Pack regroupe 2, 3 ou 4 produits complémentaires (par exemple un Réfrigérateur + Lave-linge + Smart TV 4K). En les achetant sous forme de pack, vous bénéficiez d'une remise automatique jusqu'à -22% par rapport au prix unitaire."
    },
    {
      q: "Comment obtenir ma facture PDF après achat ?",
      a: "Lors de la validation de votre commande sur le site, ou depuis votre espace client, vous pouvez télécharger instantanément votre facture officielle au format PDF d'un simple clic."
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(search.toLowerCase()) || 
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-orange-500/20">
          <HelpCircle className="w-4 h-4" />
          Foire Aux Questions
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Questions Fréquemment Posées
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Trouvez des réponses immédiates sur nos livraisons, garanties et modes de paiement.
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto relative pt-4">
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-900 dark:text-white shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-7" />
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-orange-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
