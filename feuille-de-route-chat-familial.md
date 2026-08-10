# Feuille de route — Chat Familial

**Objectif final :** une appli de messagerie privée façon Messenger, pour communiquer avec ta famille, disponible d'abord en web puis en mobile (React Native).

**Stack cible :** React → Node/Express + Socket.io → PostgreSQL → React Native

**Méthode :** à chaque session, tu codes de ton côté, puis on debug/révise ensemble. Pas de cours magistral, on avance par le projet.

---

## Vue d'ensemble des 4 phases

| Phase | Objectif | Résultat concret |
|---|---|---|
| 1. Chat web statique | Apprendre React | Interface de chat qui marche, sans backend |
| 2. Temps réel | Apprendre Node + WebSockets | Deux personnes se parlent en direct |
| 3. Persistance & comptes | Apprendre bases de données + auth | Les messages sont sauvegardés, chacun a un compte |
| 4. Version mobile | Apprendre React Native | L'appli existe sur téléphone |

On ne passe à la phase suivante que quand la précédente fonctionne. Chaque phase est un projet fini et démontrable en soi.

---

## Phase 1 — Chat web statique (React)

**But :** avoir une interface de chat qui a l'air vraie, même si les messages ne sont pas encore envoyés à personne.

### Session 1 — Setup et premier composant
- Créer le projet (Vite + React)
- Afficher un composant simple à l'écran

**Concepts à maîtriser :**
- **Composant** : un morceau d'interface réutilisable, écrit comme une fonction JavaScript qui retourne du HTML (JSX). Un bouton, une bulle de message, une liste de conversations — chacun peut être un composant.
- **JSX** : la syntaxe qui permet d'écrire du HTML directement dans du JavaScript. C'est du sucre syntaxique, ça se transforme en JS classique derrière.

### Session 2 — Afficher une liste de messages (données statiques)
- Créer un tableau JS de messages "en dur" (fake data)
- Les afficher à l'écran avec `.map()`

**Concepts à maîtriser :**
- **Props** : comment un composant parent transmet des données à un composant enfant (ex : le composant `Message` reçoit le texte et l'auteur en props).
- **Key** : identifiant unique obligatoire quand on affiche une liste avec `.map()`, pour que React sache quel élément a changé.

### Session 3 — Rendre l'interface interactive (State)
- Créer un champ de saisie pour écrire un message
- L'ajouter à la liste quand on clique sur "Envoyer"

**Concepts à maîtriser :**
- **State (`useState`)** : la mémoire d'un composant. Contrairement à une variable JS classique, quand le state change, React réaffiche automatiquement l'interface. C'est LE concept central de React.
- **Contrôlé vs non contrôlé** : un input "contrôlé" a sa valeur pilotée par le state React (on tape → onChange met à jour le state → l'input affiche le state). C'est le pattern standard en React.

### Session 4 — Plusieurs conversations
- Créer une liste de conversations (une par membre de la famille)
- Cliquer sur une conversation affiche ses messages

**Concepts à maîtriser :**
- **Levage d'état (lifting state up)** : quand deux composants ont besoin de la même info (ex : "quelle conversation est sélectionnée"), on met le state dans leur parent commun et on le redescend en props.
- **Rendu conditionnel** : afficher différentes choses selon une condition (`{isSelected && <Chat />}` ou `condition ? A : B`).

### Session 5 — Effets de bord et persistance locale
- Sauvegarder les messages dans le `localStorage` du navigateur pour qu'ils survivent au rechargement de la page

**Concepts à maîtriser :**
- **`useEffect`** : permet d'exécuter du code en réaction à un changement (ex : à chaque fois que les messages changent, les sauvegarder). C'est ce qu'on utilise pour tout ce qui touche à l'extérieur du composant (API, localStorage, timers).
- **Cycle de vie d'un composant** : montage (premier affichage), mise à jour, démontage — `useEffect` permet de réagir à ces moments.

### Session 6 — Nettoyage et découpage des composants
- Réorganiser le code en petits composants clairs (`Sidebar`, `ChatWindow`, `MessageBubble`, `MessageInput`)
- Extraire la logique répétée dans des fonctions

**Concepts à maîtriser :**
- **Composition** : construire une interface complexe en assemblant des petits composants simples plutôt qu'un seul gros composant.
- **Custom hooks** (intro) : extraire une logique réutilisable (ex : `useLocalStorage`) dans une fonction commençant par `use`.

**✅ Fin de Phase 1 :** une appli de chat qui fonctionne dans un seul navigateur, avec plusieurs conversations, sans backend. C'est un projet complet et démontrable.

---

## Phase 2 — Temps réel (Node + Socket.io)

**But :** que deux personnes sur deux appareils différents puissent vraiment se parler.

### Étapes prévues
1. Monter un serveur Node/Express minimal
2. Ajouter Socket.io côté serveur et côté client
3. Envoyer/recevoir un message en direct entre deux onglets de navigateur
4. Gérer plusieurs "rooms" (une par conversation)
5. Indicateur "en train d'écrire..." et statut en ligne/hors ligne

**Concepts à maîtriser :**
- **Client/serveur** : le navigateur (client) et le programme Node (serveur) sont deux programmes séparés qui communiquent par le réseau.
- **WebSocket** : contrairement à une requête HTTP classique (question → réponse → connexion fermée), un WebSocket garde la connexion ouverte, ce qui permet au serveur d'envoyer des données au client sans que celui-ci les demande. C'est ce qui rend le "temps réel" possible.
- **Événements (`emit` / `on`)** : le modèle de Socket.io fonctionne par événements nommés qu'on envoie et qu'on écoute, plutôt que par requêtes classiques.
- **Rooms** : un groupe de connexions qui reçoivent les mêmes messages (utile pour isoler chaque conversation).

**✅ Fin de Phase 2 :** un chat qui marche vraiment en direct entre plusieurs personnes (sans sauvegarde persistante — si le serveur redémarre, tout est perdu).

---

## Phase 3 — Persistance et comptes (PostgreSQL)

**But :** que les messages et les comptes existent durablement, pas seulement en mémoire.

### Étapes prévues
1. Modéliser la base de données (utilisateurs, conversations, messages)
2. Connecter Node à PostgreSQL
3. Sauvegarder chaque message reçu par Socket.io en base
4. Charger l'historique d'une conversation à l'ouverture
5. Authentification (inscription/connexion avec mot de passe)
6. Sécuriser les routes (un utilisateur ne peut voir que ses propres conversations)

**Concepts à maîtriser :**
- **Base de données relationnelle** : les données sont organisées en tables liées entre elles (un utilisateur a plusieurs messages, un message appartient à une conversation).
- **Schéma / relations** : définir à l'avance la structure des tables et leurs liens (clés primaires, clés étrangères).
- **API REST** : un ensemble d'URLs (`/login`, `/conversations/:id/messages`...) que le client appelle pour lire/écrire des données, en complément du temps réel.
- **Hachage de mot de passe (bcrypt)** : on ne stocke jamais un mot de passe en clair, seulement une empreinte irréversible.
- **Token/session (JWT)** : comment le serveur "se souvient" qu'un utilisateur est connecté entre deux requêtes.

**✅ Fin de Phase 3 :** l'appli web est complète et fonctionnelle — c'est littéralement une messagerie privée utilisable par ta famille.

---

## Phase 4 — Version mobile (React Native)

**But :** porter l'appli web sur téléphone.

### Étapes prévues
1. Découvrir les différences React vs React Native (pas de HTML/CSS, mais `View`/`Text`/`StyleSheet`)
2. Réutiliser toute la logique déjà écrite (state, appels API, Socket.io — ça marche presque pareil)
3. Adapter l'UI aux composants natifs
4. Notifications push pour les nouveaux messages
5. Build et installation sur un vrai téléphone

**Concepts à maîtriser :**
- **Composants natifs** : pas de balises HTML, mais des équivalents (`View` ≈ `div`, `Text` ≈ `span/p`).
- **Navigation mobile** (React Navigation) : gestion des écrans façon appli mobile (pile d'écrans, onglets), très différent du routing web.
- **Notifications push** : comment une appli mobile peut alerter l'utilisateur même fermée.

**✅ Fin de Phase 4 :** l'objectif initial est atteint — l'appli tourne sur mobile.

---

## Notes
- Chaque phase peut être testée et montrée à la famille avant de passer à la suivante — c'est motivant et ça valide que ça marche vraiment.
- Si une phase prend plus de temps que prévu, ce n'est pas grave : mieux vaut bien comprendre le state et les hooks (Phase 1) que se précipiter.
- Le chiffrement de bout en bout (pour une vraie confidentialité) est un sujet avancé qu'on pourra ajouter plus tard, en bonus, une fois les 4 phases terminées.
