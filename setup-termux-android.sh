#!/bin/bash

# =========================================================
# ELECTRO_FENNASSA - Script d'installation automatique Termux (Android)
# =========================================================

echo "================================================="
echo "  Initialisation du projet ELECTRO_FENNASSA"
echo "  Spécialiste Électroménager & Ameublement (Taourirt)"
echo "================================================="

# Mise à jour des paquets Termux
echo "[1/5] Mise à jour des dépôts Termux..."
pkg update -y && pkg upgrade -y

# Installation des outils indispensables (Node.js, Git, SQLite, Python)
echo "[2/5] Installation de Node.js, Git et SQLite..."
pkg install -y nodejs git sqlite python build-essential

# Vérification de Node.js
NODE_VER=$(node -v)
NPM_VER=$(npm -v)
echo "Node.js installé: $NODE_VER | npm: $NPM_VER"

# Installation des dépendances du projet
echo "[3/5] Installation des packages npm..."
npm install

# Création du dossier database si inexistant
mkdir -p database uploads

# Copie du fichier d'environnement
if [ ! -f .env ]; then
  cp .env.example .env
  echo "[4/5] Fichier .env créé à partir de .env.example"
fi

echo "[5/5] Préparation terminée !"
echo ""
echo "Pour démarrer le serveur de développement :"
echo "  npm run dev"
echo ""
echo "Accédez ensuite à l'application sur votre navigateur Android :"
echo "  http://localhost:3000"
echo "================================================="
