# 🎨 Plan de Redesign - Panel Admin

## Objectif
Créer un panel d'administration moderne, professionnel et complet pour gérer tous les aspects de l'application mobile "Merci Saint-Esprit".

---

## 📱 Fonctionnalités à Gérer

### 1. Contenus
- ✅ **Vidéos** : Créer, modifier, supprimer, publier/dépublier
- ✅ **Podcasts** : Créer, modifier, supprimer, publier/dépublier
- ✅ **Témoignages** : Modérer, approuver, supprimer
- ✅ **Événements** : Créer, modifier, supprimer, gérer participants

### 2. Interactions
- **Vues** : Statistiques par contenu
- **Likes** : Voir qui a liké quoi
- **Partages** : Tracking des partages
- **Commentaires** : Modération (si implémenté)

### 3. Utilisateurs
- **Liste des utilisateurs**
- **Profils utilisateurs**
- **Activité utilisateur**
- **Modération**

### 4. Prières
- **Demandes de prière** : Modérer, approuver
- **Groupes de prière** : Gérer
- **Statistiques de prières**

### 5. Notifications
- **Envoyer notifications push**
- **Notifications programmées**
- **Historique des notifications**

### 6. Dons (futur)
- **Transactions**
- **Statistiques**
- **Rapports**

### 7. Paramètres
- **Configuration app**
- **Gestion des admins**
- **Logs système**

---

## 🎨 Design System Admin

### Couleurs
```javascript
Primary: #2563EB (Bleu - cohérent avec l'app mobile)
Secondary: #10B981 (Vert)
Warning: #F59E0B (Orange)
Error: #EF4444 (Rouge)
Background: #F9FAFB (Gris très clair)
Surface: #FFFFFF (Blanc)
Text: #111827 (Noir doux)
TextSecondary: #6B7280 (Gris)
Border: #E5E7EB (Gris clair)
```

### Typographie
```javascript
Heading 1: 32px, Bold (700)
Heading 2: 24px, Bold (700)
Heading 3: 20px, SemiBold (600)
Body: 14px, Regular (400)
Small: 12px, Medium (500)
```

### Composants
- **Sidebar** : Navigation principale
- **Header** : Logo, recherche, profil admin
- **Cards** : Statistiques et contenus
- **Tables** : Listes de données
- **Forms** : Création/édition
- **Modals** : Actions rapides
- **Charts** : Graphiques (Recharts)

---

## 📊 Structure des Pages

### 1. Dashboard (Page d'accueil)
```
┌─────────────────────────────────────────┐
│ Header (Logo + Recherche + Profil)     │
├──────┬──────────────────────────────────┤
│      │ Statistiques Globales            │
│      │ ┌────┐ ┌────┐ ┌────┐ ┌────┐    │
│ Side │ │Vues│ │Like│ │User│ │Cont│    │
│ bar  │ └────┘ └────┘ └────┘ └────┘    │
│      │                                  │
│      │ Graphiques                       │
│      │ ┌──────────────────────────┐    │
│      │ │ Vues par jour            │    │
│      │ └──────────────────────────┘    │
│      │                                  │
│      │ Activité Récente                │
│      │ ┌──────────────────────────┐    │
│      │ │ Liste des dernières...   │    │
│      │ └──────────────────────────┘    │
└──────┴──────────────────────────────────┘
```

### 2. Content Manager
```
Onglets:
- Vidéos
- Podcasts
- Témoignages
- Événements

Pour chaque type:
- Liste avec filtres
- Bouton "Ajouter"
- Actions: Modifier, Supprimer, Publier/Dépublier
- Statistiques par item (vues, likes)
```

### 3. User Manager
```
- Liste des utilisateurs
- Recherche et filtres
- Profil utilisateur détaillé
- Activité utilisateur
- Actions de modération
```

### 4. Analytics
```
- Graphiques de vues
- Graphiques de likes
- Contenus les plus populaires
- Utilisateurs actifs
- Statistiques par période
```

### 5. Prayer Manager
```
- Demandes de prière
- Modération
- Groupes de prière
- Statistiques
```

### 6. Notifications
```
- Envoyer notification
- Notifications programmées
- Historique
- Templates
```

---

## 🔧 Composants à Créer

### 1. Sidebar
```jsx
- Logo en haut
- Menu items avec icônes
- Active state
- Collapse/Expand
- Logout en bas
```

### 2. Header
```jsx
- Logo (gauche)
- Barre de recherche (centre)
- Notifications (droite)
- Profil admin (droite)
```

### 3. StatCard
```jsx
Props:
- title: string
- value: number
- icon: string
- color: string
- trend: number (%)

Design:
- Card blanche
- Icône colorée
- Valeur grande
- Trend avec flèche
```

### 4. ContentTable
```jsx
Props:
- data: array
- columns: array
- onEdit: function
- onDelete: function
- onPublish: function

Features:
- Tri par colonne
- Pagination
- Actions par ligne
- Sélection multiple
```

### 5. ContentForm
```jsx
Props:
- type: 'video' | 'podcast' | 'testimony' | 'event'
- initialData: object
- onSubmit: function

Fields:
- Titre
- Description
- Média (upload)
- Catégorie
- Tags
- Date (pour événements)
- Statut (publié/brouillon)
```

### 6. AnalyticsChart
```jsx
Props:
- data: array
- type: 'line' | 'bar' | 'pie'
- title: string

Library: Recharts
```

---

## 📱 Pages Détaillées

### Dashboard.jsx
```jsx
Sections:
1. Stats Cards (4)
   - Total Vues
   - Total Likes
   - Utilisateurs Actifs
   - Contenus Publiés

2. Charts (2)
   - Vues par jour (7 derniers jours)
   - Contenus par type (pie chart)

3. Recent Activity
   - Derniers contenus ajoutés
   - Derniers utilisateurs inscrits
   - Dernières interactions

4. Quick Actions
   - Ajouter vidéo
   - Ajouter podcast
   - Ajouter événement
   - Envoyer notification
```

### ContentManager.jsx
```jsx
Tabs:
- Vidéos
- Podcasts
- Témoignages
- Événements

Pour chaque tab:
1. Header
   - Titre
   - Bouton "Ajouter"
   - Filtres (statut, date, catégorie)

2. Table
   - Thumbnail/Image
   - Titre
   - Auteur
   - Date
   - Vues
   - Likes
   - Statut
   - Actions

3. Pagination
```

### UserManager.jsx
```jsx
1. Header
   - Titre
   - Recherche
   - Filtres (actif, inactif, admin)

2. Table
   - Avatar
   - Nom
   - Email
   - Date d'inscription
   - Dernière activité
   - Statut
   - Actions

3. User Detail Modal
   - Profil complet
   - Activité récente
   - Contenus créés
   - Actions de modération
```

### EventManager.jsx
```jsx
1. Calendar View
   - Vue mensuelle
   - Événements par jour
   - Click pour détails

2. List View
   - Table des événements
   - Filtres par date
   - Statut (à venir, passé)

3. Event Form
   - Titre
   - Description
   - Date et heure
   - Lieu
   - Image
   - Capacité
   - Statut
```

### PrayerManager.jsx
```jsx
1. Prayer Requests
   - Liste des demandes
   - Modération (approuver/rejeter)
   - Statistiques de prières

2. Prayer Groups
   - Liste des groupes
   - Membres par groupe
   - Activité

3. Stats
   - Prières par jour
   - Groupes actifs
```

### NotificationManager.jsx
```jsx
1. Send Notification
   - Titre
   - Message
   - Cible (tous, groupe, utilisateur)
   - Type (info, success, warning)
   - Programmation (immédiat, planifié)

2. History
   - Liste des notifications envoyées
   - Statistiques d'ouverture
   - Filtres par date

3. Templates
   - Templates prédéfinis
   - Créer template
```

---

## 🎯 Fonctionnalités Avancées

### 1. Upload de Médias
```jsx
- Drag & drop
- Preview
- Progress bar
- Cloudinary integration
- Validation (taille, format)
```

### 2. Rich Text Editor
```jsx
- Pour descriptions
- Formatting (bold, italic, lists)
- Preview
- Markdown support
```

### 3. Analytics Dashboard
```jsx
- Date range picker
- Export data (CSV, PDF)
- Real-time updates
- Comparaison périodes
```

### 4. Bulk Actions
```jsx
- Sélection multiple
- Actions groupées:
  - Publier/Dépublier
  - Supprimer
  - Changer catégorie
  - Exporter
```

### 5. Search & Filters
```jsx
- Recherche globale
- Filtres avancés
- Sauvegarde de filtres
- Tri personnalisé
```

---

## 🔐 Sécurité

### Authentication
```jsx
- Firebase Auth
- Email/Password
- Rôles (admin, moderator)
- Session management
```

### Permissions
```jsx
Admin:
- Accès complet
- Gestion des utilisateurs
- Configuration système

Moderator:
- Gestion contenus
- Modération
- Pas d'accès config
```

---

## 📦 Technologies

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Lucide React (icônes)
- Recharts (graphiques)
- Axios (API calls)

### Backend
- Firebase Firestore
- Firebase Storage
- Firebase Auth
- Cloudinary (médias)

---

## 🚀 Plan d'Implémentation

### Phase 1 : Design System (1-2h)
- [ ] Créer composants de base
- [ ] Sidebar
- [ ] Header
- [ ] StatCard
- [ ] Layout

### Phase 2 : Dashboard (2-3h)
- [ ] Stats cards
- [ ] Charts
- [ ] Recent activity
- [ ] Quick actions

### Phase 3 : Content Manager (3-4h)
- [ ] Tabs navigation
- [ ] Tables pour chaque type
- [ ] Forms de création/édition
- [ ] Upload de médias
- [ ] Actions CRUD

### Phase 4 : User Manager (2h)
- [ ] Liste utilisateurs
- [ ] Recherche et filtres
- [ ] Profil détaillé
- [ ] Actions modération

### Phase 5 : Analytics (2h)
- [ ] Graphiques
- [ ] Statistiques
- [ ] Export data

### Phase 6 : Prayer & Notifications (2h)
- [ ] Prayer manager
- [ ] Notification sender
- [ ] Historique

**Temps total estimé : 12-15 heures**

---

## 🎨 Mockups Textuels

### Sidebar
```
┌─────────────────┐
│  [LOGO]         │
│  Merci Saint-   │
│  Esprit         │
├─────────────────┤
│ 📊 Dashboard    │
│ 📝 Contenus     │
│ 👥 Utilisateurs │
│ 📈 Analytics    │
│ 🙏 Prières      │
│ 🔔 Notifications│
│ ⚙️  Paramètres  │
├─────────────────┤
│ 🚪 Déconnexion  │
└─────────────────┘
```

### Dashboard Stats
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 👁️  Vues     │ │ ❤️  Likes    │ │ 👥 Users     │ │ 📝 Contenus  │
│              │ │              │ │              │ │              │
│   125,430    │ │    45,230    │ │    12,450    │ │      856     │
│   +12.5% ↗   │ │    +8.3% ↗   │ │    +5.2% ↗   │ │   +15.7% ↗   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

---

**Statut** : Prêt pour implémentation
**Priorité** : Haute
**Impact** : Gestion complète de l'application mobile
