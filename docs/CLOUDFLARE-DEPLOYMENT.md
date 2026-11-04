# MOD-PROD Dashboard — déploiement Cloudflare

## État et séparation

- Nouveau tableau de bord : `dashboard.modprod.app` (Worker `modprod-dashboard`).
- Ancienne console AppMod : `admin.modprod.app` (Worker `appmod`) — NE PAS modifier.
- Aucun domaine personnalisé n'est attaché automatiquement par ce dépôt.
- Aucun secret, token GitHub ou binding D1 n'est requis pour l'interface initiale.
- Le dashboard n'est PAS encore un remplacement sécurisé d'AppMod.

## Prérequis

- Cloudflare gère la zone DNS `modprod.app`.
- Accès administrateur à Cloudflare Zero Trust / Access.
- Node.js 24 et pnpm correspondant au lockfile.
- Wrangler authentifié localement (ou via CI avec secrets limités).
- Vérifier la compatibilité du preset Nitro avec les versions Nuxt/Nitro installées.

## 1. Protéger le nouveau domaine

Dans Cloudflare Zero Trust > Access > Applications, créer une application **Self-hosted** pour le hostname exact `dashboard.modprod.app`.

- Politique Allow limitée aux administrateurs autorisés (ne pas créer de règle Allow globale).
- Authentification forte/MFA via fournisseur d'identité ou politique Access adaptée.
- Durée de session courte et journalisation.
- Vérifier que les requêtes non authentifiées sont refusées.
- Garder la politique et le hostname `admin.modprod.app` inchangés.

**Important :** Access protège l'accès au site, mais ne remplace pas les contrôles d'autorisation et la vérification des jetons côté API. Avant d'activer des API d'administration, valider les JWT Access côté serveur (signature, issuer, audience, expiration) et les rôles applicatifs.

## 2. Installer, tester, construire

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
NITRO_PRESET=cloudflare_module pnpm build
```

Vérifier la présence de `.output/server/index.mjs` et `.output/public`. Si le preset émet des chemins différents, adapter `wrangler.jsonc` avant déploiement.

## 3. Déployer le Worker sans domaine public

```bash
pnpm exec wrangler deploy --config wrangler.jsonc
```

Le fichier Wrangler désactive `workers.dev` et les URLs de prévisualisation. Il n'attache pas le domaine ; le Worker peut être déployé sans endpoint public.

Ne pas utiliser `admin.modprod.app`, ni modifier le Worker `appmod`.

## 4. Connecter le domaine après protection Access

Après vérification de la politique Cloudflare Access, ajouter **Custom Domain** `dashboard.modprod.app` au Worker `modprod-dashboard` dans Cloudflare Workers > Settings > Domains & Routes.

Laisser Cloudflare gérer l'enregistrement DNS associé au domaine personnalisé. Vérifier les conflits DNS préexistants avant de l'attacher.

Tester :
- accès non connecté : redirection/refus par Access ;
- accès autorisé : page d'accueil et `/applications` ;
- accès non autorisé : refus ;
- `admin.modprod.app` : toujours opérationnel ;
- aucun endpoint sensible n'est exposé.

## 5. GitHub et automatisation

Le workflow CI effectue lint, typecheck et build Cloudflare. Il ne déploie pas automatiquement : l'activation d'un pipeline de production sera décidée après les tests d'accès et les contrôles de sécurité.

## Migration AppMod

1. Inventorier les contrats API et les réglages du dépôt `MOD-PROD/appmod`.
2. Ajouter au dashboard un registre d'applications alimenté par des données réelles.
3. Conserver les publications, retours arrière et réglages dans AppMod tant que les équivalents ne sont pas testés.
4. Ajouter les API serveur sécurisées et l'historique d'audit.
5. Migrer progressivement les fonctionnalités, avec tests de non-régression.
6. Basculer l'administration seulement après validation explicite.

Ne pas copier les jetons AppMod ni les données privées des testeurs dans le dépôt Dashboard.
