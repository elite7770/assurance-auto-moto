# Assurance Auto & Moto - Espace Client

Une application web moderne et complète pour la gestion des assurances automobiles et motos au Maroc, avec un espace client sécurisé et convivial.

## 🚀 Fonctionnalités Principales

### **Espace Client (Dashboard)**
- **Vue d'ensemble** : Tableau de bord avec statistiques et actions rapides
- **Gestion des polices** : Consultation, renouvellement et suivi des contrats
- **Gestion des sinistres** : Déclaration, suivi et documentation
- **Facturation** : Historique des factures et paiements en ligne
- **Documents** : Téléchargement et gestion des documents d'assurance
- **Profil utilisateur** : Mise à jour des informations personnelles

### **Système d'Authentification**
- Connexion sécurisée avec email/mot de passe
- Inscription de nouveaux clients
- Gestion des sessions et déconnexion
- Protection des routes sensibles

### **Devis en Ligne**
- Formulaire multi-étapes pour devis d'assurance
- Calcul automatique des primes en MAD
- Options de couverture adaptées au marché marocain
- Validation des données en temps réel

## 🛠️ Technologies Utilisées

- **Frontend** : React 18 avec Hooks
- **Routing** : React Router v7
- **Gestion d'état** : Context API + Local Storage
- **Formulaires** : React Hook Form
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **Styling** : CSS Modules avec design system personnalisé

## 📁 Structure du Projet

```
src/
├── components/
│   ├── auth/           # Composants d'authentification
│   ├── contact/        # Composants de contact
│   ├── coverage/       # Composants de couverture
│   ├── forms/          # Composants de formulaires
│   ├── home/           # Composants de la page d'accueil
│   └── layout/         # Composants de mise en page
├── context/            # Contextes React (Auth)
├── pages/              # Pages principales
├── styles/             # Fichiers CSS
└── utils/              # Utilitaires et helpers
```

## 🔐 Système d'Authentification

### **Connexion**
- Email : `client@example.com`
- Mot de passe : `password123`

### **Fonctionnalités de Sécurité**
- Validation des données côté client
- Gestion des sessions avec Local Storage
- Protection des routes avec `ProtectedRoute`
- Déconnexion automatique

## 💼 Gestion des Polices

### **Types de Couverture**
- **RC Obligatoire** : Responsabilité civile obligatoire
- **Vol** : Protection contre le vol
- **Incendie** : Protection contre l'incendie
- **Bris de glace** : Protection des vitres
- **Assistance** : Services d'assistance routière
- **Défense** : Protection juridique

### **Informations des Polices**
- Numéro de police unique
- Détails du véhicule (marque, modèle, année)
- Plaque d'immatriculation
- Dates de début et fin
- Prime annuelle en MAD
- Franchise configurable
- Statut (Active, En attente, Expirée)

## 📋 Gestion des Sinistres

### **Types de Sinistres**
- Accidents de voiture
- Vol
- Dégâts
- Incendie
- Autres

### **Processus de Déclaration**
1. Sélection du type de sinistre
2. Date et description détaillée
3. Police concernée
4. Montant estimé
5. Upload de documents de preuve
6. Suivi de l'avancement

### **Statuts des Sinistres**
- **En cours** : En cours de traitement
- **En attente** : En attente de documents
- **Terminé** : Traitement terminé

## 💳 Système de Facturation

### **Gestion des Factures**
- Historique complet des factures
- Statuts de paiement (Payée, En attente)
- Dates d'échéance
- Montants en MAD
- Téléchargement des factures

### **Paiements**
- Interface de paiement en ligne
- Suivi des échéances
- Historique des transactions

## 📄 Gestion des Documents

### **Types de Documents**
- Certificats d'assurance
- Factures de réparation
- Permis de conduire
- Constats amiable
- Photos de dégâts
- Autres justificatifs

### **Fonctionnalités**
- Upload de fichiers (PDF, JPG, PNG)
- Organisation par police
- Téléchargement sécurisé
- Historique des uploads

## 🔔 Système de Notifications

### **Types de Notifications**
- **Renouvellement** : Expiration des polices
- **Paiement** : Confirmation de paiement
- **Sinistre** : Mise à jour des dossiers

### **Fonctionnalités**
- Badge de notifications non lues
- Panel déroulant interactif
- Marquage comme lu
- Historique des notifications

## 🎨 Design et Interface

### **Thème Visuel**
- Palette de couleurs bleues professionnelles
- Design moderne et épuré
- Composants réutilisables
- Responsive design (mobile-first)

### **Composants UI**
- Cartes interactives avec hover effects
- Boutons avec états et icônes
- Formulaires avec validation
- Navigation par onglets
- Modales et dropdowns

## 📱 Responsive Design

### **Breakpoints**
- **Desktop** : 1200px+
- **Tablet** : 768px - 1199px
- **Mobile** : 320px - 767px

### **Adaptations Mobile**
- Navigation adaptée
- Grilles flexibles
- Boutons tactiles
- Formulaires optimisés

## 🚀 Installation et Démarrage

### **Prérequis**
- Node.js 16+
- npm ou yarn

### **Installation**
```bash
# Cloner le projet
git clone [url-du-repo]

# Installer les dépendances
npm install

# Démarrer en mode développement
npm start

# Build de production
npm run build
```

### **Variables d'Environnement**
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
```

## 🔧 Configuration

### **Authentification**
- Modifier les données utilisateur dans `AuthContext.js`
- Configurer les endpoints API
- Ajuster la logique de validation

### **Données Mock**
- Polices d'exemple dans `AuthContext.js`
- Sinistres et factures de démonstration
- Notifications système

## 📊 Données et Modèles

### **Structure Utilisateur**
```javascript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  postalCode: string,
  city: string,
  clientSince: string,
  status: string,
  policies: Policy[],
  claims: Claim[],
  invoices: Invoice[],
  documents: Document[],
  notifications: Notification[]
}
```

### **Structure Police**
```javascript
{
  id: string,
  type: string,
  vehicle: string,
  brand: string,
  model: string,
  year: number,
  plateNumber: string,
  startDate: string,
  endDate: string,
  status: string,
  premium: number,
  franchise: number,
  coverage: string[],
  nextRenewal: string
}
```

## 🔒 Sécurité

### **Mesures Implémentées**
- Validation des données côté client
- Protection des routes sensibles
- Gestion sécurisée des sessions
- Validation des types de fichiers

### **Recommandations de Production**
- Implémenter HTTPS
- Ajouter l'authentification à deux facteurs
- Intégrer un système de logs
- Mettre en place un WAF

## 🚧 Développement Futur

### **Fonctionnalités Prévues**
- Intégration API backend
- Système de chat en direct
- Notifications push
- Application mobile
- Intégration paiement en ligne
- Système de bonus-malus

### **Améliorations Techniques**
- Tests unitaires et d'intégration
- Optimisation des performances
- PWA (Progressive Web App)
- Internationalisation (arabe/français)

## 📞 Support et Contact

### **Documentation**
- Ce README contient toutes les informations nécessaires
- Code commenté et structuré
- Composants réutilisables

### **Développement**
- Architecture modulaire
- Séparation des responsabilités
- Code maintenable et extensible

## 📄 Licence

Ce projet est développé pour Assurance Auto & Moto Maroc.
Tous droits réservés.

---

**Version** : 2.0.0  
**Dernière mise à jour** : Décembre 2024  
**Développé par** : Équipe de développement Assurance Auto & Moto
