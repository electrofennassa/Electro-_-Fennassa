# ELECTRO_FENNASSA - Plateforme E-Commerce Électroménager & Ameublement

> Entreprise marocaine spécialisée dans l'électroménager (Réfrigérateurs, Lave-linge, Climatiseurs, TV, Fours) et l'ameublement (Matelas, Lits, Salles à manger) basée à **Taourirt, Maroc**.

---

## 📞 Coordonnées Officielles
- **Entreprise** : ELECTRO_FENNASSA
- **Email** : Electro_Fennassa@proton.me
- **Téléphone / WhatsApp** : +212644543909
- **Adresse** : BD la Résistance, Hay Jdid, Taourirt, Maroc

---

## 🔑 Compte Administrateur par Défaut
- **Identifiant** : `Electro_Fennassa@proton.me`
- **Mot de passe** : `Nour@1969`

---

## 📱 Guide Développement Mobile (Android + Termux + Acode)

### 1. Installation sous Android avec Termux
Open Termux et lancez le script automatisé :
```bash
chmod +x setup-termux-android.sh
./setup-termux-android.sh
```
Ou manuellement :
```bash
pkg update && pkg upgrade -y
pkg install nodejs git sqlite python -y
git clone https://github.com/VOTRE_USERNAME/electro-fennassa.git
cd electro-fennassa
npm install
```

### 2. Édition du code avec Acode
1. Téléchargez **Acode - code editor** depuis le Google Play Store ou F-Droid.
2. Donnez l'autorisation d'accès aux fichiers à Termux (`termux-setup-storage`).
3. Dans Acode, ouvrez le dossier du projet situant dans `~/$HOME/electro-fennassa`.
4. Éditez les fichiers TypeScript / React directement depuis votre smartphone.

### 3. Lancer l'application localement
```bash
npm run dev
```
Ouvrez le navigateur mobile sur `http://localhost:3000`.

---

## 🚀 Déploiement en Production

### 1. GitHub
```bash
git init
git add .
git commit -m "Initial commit ELECTRO_FENNASSA"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/electro-fennassa.git
git push -u origin main
```

### 2. Frontend (Vercel / Netlify)
- Connectez votre dépôt GitHub à **Vercel** ou **Netlify**.
- **Build Command** : `npm run build`
- **Output Directory** : `dist`
- Définissez la variable d'environnement `VITE_API_URL` si le backend est séparé.

### 3. Backend (Render / Railway)
- Créez un nouveau service Web sur **Render** ou **Railway**.
- **Environment** : Node.js
- **Build Command** : `npm run build`
- **Start Command** : `npm start`
- Définissez la variable `JWT_SECRET` dans les variables d'environnement.

---

## 🗄️ Migration Base de Données (SQLite → MySQL / PostgreSQL Neon)

Par défaut, le projet utilise un adaptateur d'accès aux données interchangeable (`/server/db.ts`).

### Passer à Neon / PostgreSQL ou MySQL :
1. Dans `.env`, modifiez :
   ```env
   DB_TYPE="mysql" # ou "neon"
   DATABASE_URL="mysql://user:password@host:3306/electro_fennassa"
   ```
2. Installez le driver correspondant : `npm install mysql2` ou `npm install pg`.

---

## 🛡️ Sécurité & Fonctionnalités
- Authentification **JWT** avec hashage **bcrypt**
- Protection contre les attaques **Helmet**, **CORS**, et validation des formulaires
- Export des produits et factures en formats **CSV** et **PDF**
- Génération automatique du **sitemap.xml** et **robots.txt**
