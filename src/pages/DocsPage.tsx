import React from 'react';
import { Terminal, Smartphone, GitBranch, Server, Database, Code2, BookOpen, Layers } from 'lucide-react';

export const DocsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <div className="text-center space-y-3">
        <span className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-orange-500/20">
          <BookOpen className="w-4 h-4" />
          Documentation Technique Lead Software Engineer
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Guide Développeur & Déploiement ELECTRO_FENNASSA
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Instructions pas à pas pour développer le projet à 100% depuis Android (Acode + Termux) et le déployer en production sur Neon, Vercel ou Render.
        </p>
      </div>

      {/* Android Termux Section */}
      <section className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              1. Développer depuis Android (Acode & Termux)
            </h2>
            <p className="text-xs text-slate-400">Installation 1-Click sans ordinateur</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <p>
            Le projet contient un script automatisé <code className="bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded text-orange-600 font-mono">setup-termux-android.sh</code>.
          </p>

          <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-[11px] space-y-2 overflow-x-auto">
            <p className="text-emerald-400"># 1. Ouvrir Termux et exécuter les commandes suivantes :</p>
            <p>pkg update && pkg upgrade -y</p>
            <p>pkg install git nodejs-lts -y</p>
            <p className="text-emerald-400"># 2. Cloner le dépôt et lancer le setup :</p>
            <p>git clone https://github.com/votre-user/ELECTRO_FENNASSA.git</p>
            <p>cd ELECTRO_FENNASSA</p>
            <p>chmod +x setup-termux-android.sh</p>
            <p>./setup-termux-android.sh</p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 text-amber-800 dark:text-amber-300 text-[11px]">
            <strong>Astuce Acode :</strong> Ouvrez Acode, appuyez sur "Ouvrir un dossier", sélectionnez le dossier <code className="font-mono">ELECTRO_FENNASSA</code> depuis Termux (<code className="font-mono">/data/data/com.termux/files/home</code>).
          </div>
        </div>
      </section>

      {/* Deploy Vercel / Render */}
      <section className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="p-2.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              2. Déploiement en Production (Vercel & Render)
            </h2>
            <p className="text-xs text-slate-400">Architecture Full-Stack optimisée</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <h4 className="font-bold text-slate-900 dark:text-white">Déploiement Vercel (Frontend & Serverless API)</h4>
          <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-[11px] space-y-1">
            <p className="text-sky-400"># Installer la CLI Vercel sur Termux ou PC :</p>
            <p>npm i -g vercel</p>
            <p>vercel --prod</p>
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white pt-2">Déploiement Render / Railway (Backend Node Express)</h4>
          <p>
            Créez un <strong>Web Service</strong> sur Render avec la commande de Build <code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded text-orange-600 font-mono">npm run build</code> et la commande de Start <code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded text-orange-600 font-mono">npm start</code>.
          </p>
        </div>
      </section>

      {/* Database Migration */}
      <section className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="p-2.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              3. Migration Base de Données (JSON vers Neon PostgreSQL / MySQL)
            </h2>
            <p className="text-xs text-slate-400">Pattern d'Adapter Modulaire</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
          <p>
            L'architecture de l'application utilise une abstraction dans <code className="bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded text-orange-600 font-mono">server/db.ts</code>. Pour passer à Neon PostgreSQL ou MySQL, modifiez simplement cette classe sans changer les routes d'API.
          </p>

          <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-[11px] space-y-1">
            <p className="text-purple-400">// Pour activer Neon PostgreSQL, ajoutez l'URL dans .env :</p>
            <p>DATABASE_URL="postgres://user:password@ep-cool-name.neon.tech/neondb"</p>
          </div>
        </div>
      </section>
    </div>
  );
};
