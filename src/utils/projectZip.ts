import JSZip from 'jszip';

export async function downloadProjectZip() {
  const zip = new JSZip();

  // Root files
  zip.file('README.md', `# ELECTRO_FENNASSA - Project Archive
Projet e-commerce complet Électroménager & Ameublement (Taourirt, Maroc).
Développé pour Acode, Termux, Vercel, Render & Neon.

Coordonnées :
- Entreprise: ELECTRO_FENNASSA
- Email: Electro_Fennassa@proton.me
- Téléphone: +212644543909
- Adresse: BD la Résistance, Hay Jdid, Taourirt, Maroc
- Admin Login: Electro_Fennassa@proton.me / Nour@1969
`);

  zip.file('setup-termux-android.sh', `#!/bin/bash
echo "Initialisation ELECTRO_FENNASSA dans Termux..."
pkg update -y && pkg upgrade -y
pkg install -y nodejs git sqlite python build-essential
npm install
npm run dev
`);

  zip.file('.env.example', `PORT=3000
NODE_ENV=development
JWT_SECRET=electro_fennassa_secure_jwt_secret_2026_taourirt
ADMIN_EMAIL=Electro_Fennassa@proton.me
ADMIN_PASSWORD_HASH=Nour@1969
DB_TYPE=sqlite
DATABASE_URL=file:./database/electro_fennassa.db
STORE_PHONE=+212644543909
STORE_EMAIL=Electro_Fennassa@proton.me
STORE_ADDRESS=BD la Résistance, Hay Jdid, Taourirt, Maroc
`);

  zip.file('docker-compose.yml', `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
`);

  // Generate ZIP blob and trigger download
  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'electro_fennassa_project_termux_acode.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
