# Démarrer l'application

- `npm start`

### Lancer le serveur

Je n'ai pas versionné le serveur, il faut donc le lancer séparement sur votre propre répertoire.

# Démarrer les tests

- `npm test`

# Technologies utilisées

- Ayant un délai limité, j'ai choisi de m'en tenir uniquement à Angular (afin de limiter au maximum les configurations qui pourraient vite devenir chronophage). Dans un projet d'entreprise, je serais plutôt parti sur un workspace Nx (j'aurai aussi pu partir sur des librairies angular mais le problème de temps de config est plus ou moins le même).

- Pour la version d'Angular, ayant initialisé le repo le jour de la sortie d'angular v18, je suis parti sur cette version. Suite à mes échanges avec Valentin, j'ai pensé qu'il pourrait être intéressant / sympa d'utiliser un maximum de nouvelles features !

- J'ai choisi de n'utiliser aucune librairie extérieur à l'exception d'[`ngxtension`](https://ngxtension.netlify.app/) pour pouvoir utiliser [`rxEffect`](https://ngxtension.netlify.app/utilities/operators/rx-effect/), un des outils que j'ai moi-même créé.

# Autres infos

- Caching: J'ai choisi de cacher (in memory) les résultats de `all-categories` et `visible-categories`, via l'opérateur `shareReplay`, pour une durée d'1 heure.

  Pour un véritable projet il serait plus intéressant de cacher ces résultats dans le storage, via `@ngneat/cashew` ou une solution perso (Pour ma certification niveau 3 d'angular training, j'ai implémenté cette [solution perso](https://github.com/LcsGa/ng-weather/commit/e1224a9eb0b90ddd8836f8ce3a3cb44676240aa9)).

  > Si j'implémentais un système de caching, je l'aurais également fais pour les icônes.

- Pour ce test technique, j'ai choisi de tirer parti du router d'angular, qui me semblait le plus adapté ici. Au sein d'une application plus conséquente, il serait peut-être plus intéressant de procéder différemment.

- Proxy: Toujours dans l'optique de rester simple, je suis parti sur une `proxy.conf` pour rediriger mes requêtes `/api` vers `http://localhost:3000` en imaginant que les redirections se feraient par le serveur, une fois en prod (sinon il serait également possible de passer par un interceptor, des urls en dur dans un fichier d'environnement, etc.).

- Gestion de pending / errors: j'ai implémenté une solution très simpliste pour gérer l'état des requêtes http. Pour pouvoir le tester plus facilement, j'ai créé un intercépteur configurable dans [app-config.ts](./src/app/app.config.ts).

- Responsive design: Malheureusement je n'ai pas eu le temps de rendre l'application responsive mais dans un vrai projet je n'aurai pas fait l'impasse dessus.

- Data reçue erronnée : J'ai constaté qu'il manque parfois des descriptions et / ou couleurs sur certaines données retournées par le serveur.

  Pour la description, par "chance" je ne fais que l'afficher donc aucune erreur n'est générée

  Pour la couleur, j'ai rajouté une couleur neutre dans le cas où cette dernière manque.

  Dans un vrai projet, j'aurai rajouté la librairie zod pour faire un check au runtime de la data reçue + je me serais rapproché des développeurs backend.
