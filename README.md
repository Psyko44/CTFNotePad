# CTF NotePad

CTF NotePad est un outil de prise de notes avancé conçu pour les compétitions Capture The Flag (CTF). Il permet aux participants de documenter, organiser et gérer leurs découvertes, techniques et exploits en toute simplicité.

## Fonctionnalités

- **Éditeur Markdown Intégré** : Rédigez vos notes avec EasyMDE et prévisualisation en direct
- **Organisation par Projets et Zones** : Gérez plusieurs challenges CTF simultanément avec des espaces dédiés
- **Base de Données des Techniques** : Stockez et classez vos méthodes d'exploitation pour les retrouver rapidement
- **Générateur de Shells** : Accédez à une collection de reverse shells, bind shells et web shells prêts à l'emploi
- **Thème Clair/Sombre** : Personnalisation complète de l'interface pour un meilleur confort visuel
- **Export JSON & PDF** : Sauvegardez vos projets avec notes, checklist et scripts pour les partager ou les analyser plus tard
- **Prise en Charge des CTFs Réels** : Adapté aux besoins des pentesters et compétiteurs de CTF

## Installation

### Cloner le projet
```sh
git clone https://github.com/yourusername/CTFNotePad.git
cd CTFNotePad
```

### Installer les dépendances
```sh
npm install
```

## Utilisation

### Mode Développement (Hot Reload)
```sh
npm run dev
```
Accédez à http://localhost:5173/ (ou le port configuré)

### Mode Production (Build Optimisé)
```sh
npm run build
```

### Vérification du Code (Linting)
```sh
npm run lint
```

## Technologies Utilisées

| Technologie | Description |
|-------------|-------------|
| Vue.js 3 | Framework JavaScript progressif |
| Vuetify | Bibliothèque UI basée sur Material Design |
| Vite | Outil de build rapide et performant |
| EasyMDE | Éditeur Markdown avec prévisualisation intégrée |
| html2pdf.js | Conversion des notes en PDF |
| vuedraggable | Drag & Drop pour organiser les zones |

## Configuration Recommandée

### IDE
- Visual Studio Code

### Extensions
- Volar (désactivez Vetur)
- ESLint

## Personnalisation

Vous pouvez modifier la configuration selon vos besoins en consultant la documentation de Vite.

## Avertissement Légal

- CTF NotePad est destiné uniquement à un usage pédagogique et légal
- L'outil doit être utilisé dans un cadre autorisé et éthique (CTF, pentest avec permission)
- L'auteur ne pourra être tenu responsable d'une utilisation abusive ou illégale

## Contact & Contribution

### Vous souhaitez améliorer le projet ?
- Forkez le dépôt et proposez vos améliorations via une PR
- Signalez un bug ou suggérez une fonctionnalité via les Issues

### Besoin d'aide ?
- Ouvrez une issue sur GitHub
- Contactez-moi sur Twitter ou via LinkedIn

---

CTF NotePad – Optimisez votre workflow CTF et devenez un compétiteur redoutable !
