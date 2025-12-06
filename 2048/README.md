# 🎮 Projet Fusioncraft — React / Vite (HETIC - S1)

Ce projet est une version web du célèbre jeu **2048**, développée en **React** avec **Vite**, dans le cadre du module de développement Front-End.  
L’objectif est de créer un jeu fonctionnel, moderne, responsive et connecté à un **leaderboard via une API REST**.

---

## 🚀 Fonctionnalités principales

### 🧩 Niveau 1 — Fonctionnalités de base
- Grille 4×4 et 5×5 jouable  
- Apparition aléatoire de tuiles (2 ou 4)  
- Déplacements via les flèches du clavier  
- Fusion des tuiles selon les règles du 2048  
- Calcul du score en temps réel  
- Détection automatique de fin de partie (**Game Over**)  

---

### 🌐 Niveau 2 — API & Leaderboard

Le jeu est connecté à une API MockAPI.io pour :
- 🔸 **Enregistrer le score final** (`POST`)  
- 🔸 **Afficher le classement global** (`GET`)  
- 🔸 Afficher les meilleurs scores  
- 🔸 Associer chaque score à un **pseudo joueur**, demandé lors de la première visite  

---

### 📦 Installation des modules

Tous les modules nécessaires — dont **react-router-dom**, React, Axios, etc. — sont automatiquement installés avec la commande :

```bash
npm install
