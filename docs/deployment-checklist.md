# Mise en ligne : liste de contrôle

## A. Ce que fait le code (déjà fait, à vérifier après le déploiement)

Après chaque déploiement, ces commandes doivent répondre comme indiqué.

```bash
curl -s https://www.maisestudio.com/robots.txt
```
Doit contenir `User-agent: OAI-SearchBot` avec `Allow: /`, `Disallow: /api/` et la ligne `Sitemap:`.

```bash
curl -s https://www.maisestudio.com/sitemap.xml | grep -c "<loc>"
```
Doit afficher 15 (accueil, réalisations + 4 projets, services + 5 pages, studio, faq, contact).

```bash
curl -s https://www.maisestudio.com/ | grep -o '<link rel="canonical"[^>]*>'
curl -s https://www.maisestudio.com/services/site-web-restaurant-cafe | grep -c 'application/ld+json'
curl -sI https://www.maisestudio.com/work | head -3
```
La canonique doit commencer par `https://www.maisestudio.com`. `/work` doit répondre 308 vers `/realisations`.

À contrôler aussi :
- Aucune page n'a de `noindex`, sauf `/mentions-legales` et `/confidentialite` (volontaire, voir C).
- Le numéro WhatsApp n'apparaît dans aucun fichier : `curl -s https://www.maisestudio.com/ | grep -c "wa.me"` doit afficher 0.
- Données structurées : https://validator.schema.org/ et https://search.google.com/test/rich-results (accueil, un service, un projet, /faq).
- PageSpeed Insights (mobile) sur `/`, `/services/site-web-restaurant-cafe` et `/realisations/le-40`.

## B. Ce que vous devez faire (impossible depuis le code)

1. **Variable `WHATSAPP_NUMBER`** dans Vercel (Settings, Environment Variables, Production). Sans elle, tous les boutons WhatsApp renvoient vers `/contact`. Redéployer après l'avoir ajoutée.
2. **Domaine** : déjà branché à Vercel, et `maisestudio.com` redirige déjà vers `www.maisestudio.com` (vérifié le 4 octobre 2026). `www.maisestudio.com` est donc l'adresse officielle, et c'est celle que le code utilise (`SITE.url` dans `src/lib/site.ts`). Ne changez pas le sens de cette redirection dans Vercel sans changer `SITE.url` en même temps.
3. **Search Console** : vérifier le domaine, envoyer le sitemap, inspecter les URL importantes, surveiller l'indexation et les erreurs 404.
4. **Bing Webmaster Tools** : importer le site depuis Search Console, envoyer le sitemap.
5. **Mentions légales** : compléter `src/app/mentions-legales/page.tsx` (forme juridique, numéro d'immatriculation, adresse), vérifier l'hébergeur indiqué, puis retirer `noindex` dans les deux pages légales (`confidentialite` aussi).
6. **Relire `docs/content-to-verify.md`** : réponses de la FAQ et phrases qui décrivent votre fonctionnement.
7. **Profils externes** : voir `docs/visibility-roadmap.md`.
8. **Essai sur de vrais téléphones** (iPhone Safari, Android Chrome) : barre du bas, fenêtre de rappel, formulaire, configurateur. Le code a été testé en simulation de petits écrans, pas sur appareils réels.
9. **Captures des projets** : elles sont prises sur les sites en ligne (`public/work/shots/`). Si un client change son site, refaire la capture.

## C. Pages volontairement hors du sitemap ou en `noindex`

| Page | Statut | Raison |
|---|---|---|
| `/examples` | indexable, pas dans le sitemap | démonstrations, pas du contenu à positionner |
| `/examples/maison-vesper`, `/examples/lumea-skin` | `noindex`, pas dans le sitemap | sites d'exemple, jamais présentés comme travail client |
| `/mentions-legales`, `/confidentialite` | `noindex` | à compléter d'abord |
| `/api/*` | bloqué dans `robots.txt` | redirection WhatsApp, jamais explorée |

## D. Mesure d'audience

Le site utilise **Vercel Web Analytics** (composant `<Analytics />` dans `src/app/layout.tsx`). C'est un outil sans cookie : le site n'affiche donc pas de bannière de cookies, et la page `/confidentialite` le dit. Pour qu'il compte les visites, il faut **l'activer une fois dans Vercel** : projet, onglet Analytics, bouton Enable. Sans cela, rien n'est mesuré (et rien n'est envoyé non plus). Les chiffres apparaissent quelques minutes après les premières visites sur le site déployé, pas en local. Si un jour vous ajoutez un autre outil qui utilise des cookies, il faudra un vrai bandeau de consentement et une mise à jour de `/confidentialite`.

Événements à suivre le jour où un outil est en place :

| Événement | Où |
|---|---|
| `portfolio_project_view` | page d'un projet |
| `portfolio_live_site_click` | bouton « Voir le site en ligne » |
| `service_cta_click` | boutons de contact des pages de service |
| `configurator_start` | premier clic dans le configurateur |
| `configurator_complete` | clic sur « Demander ce devis » |
| `contact_submit` | envoi du formulaire |
| `whatsapp_click` | boutons WhatsApp |
| `email_click` | liens `mailto:` |

Trafic venant de ChatGPT : il peut apparaître comme source de référence ou avec `utm_source=chatgpt.com` quand la plateforme l'ajoute. Cela dépend de leurs réglages et ne garantit rien.

## E. Demande de rappel (« On vous rappelle »)

Le bouton « Rappel » (barre du bas sur téléphone) et la fenêtre qui s'ouvre sont **cachés tant que la clé d'envoi n'existe pas**. Pour les activer :

1. Créer un compte sur resend.com, vérifier le domaine d'envoi (ou garder l'expéditeur de test `onboarding@resend.dev` au début), et créer une clé API.
2. Dans Vercel (Settings, Environment Variables, Production) : `RESEND_API_KEY` (obligatoire). Facultatif : `CALLBACK_TO_EMAIL` (par défaut `studiomaise@gmail.com`) et `CALLBACK_FROM_EMAIL`.
3. **Redéployer** : la page est préparée au moment du build, le bouton n'apparaît qu'après un nouveau déploiement.
4. **Faire un vrai essai** : envoyer une demande depuis le site en ligne et vérifier que l'e-mail arrive. Le code a été testé en local contre un faux serveur d'envoi (mêmes champs, mêmes réponses), pas contre Resend lui-même.

Protections en place : champ piège invisible, limite de 5 demandes par heure et par adresse IP (en mémoire, repart à zéro quand le serveur redémarre), case de consentement obligatoire, rien n'est conservé sur le site, le numéro n'est jamais écrit dans les journaux. La page `/confidentialite` décrit ce traitement.

## F. Couleurs et sections de l'accueil

Palette : fond crème, bordeaux pour les actions, vert pour les chiffres et les validations, bleu nuit pour le hero, « Pourquoi Maisé » et le pied de page, laiton uniquement en filet très fin. Tous les couples de couleurs texte/fond ont été vérifiés (WCAG AA, aucun échec) ; le script de contrôle n'est pas dans le dépôt, refaire ce contrôle si une couleur change dans `src/app/globals.css`.

Le film d'ouverture a été retiré à la demande (hero bleu nuit à la place). Il reste dans l'historique git : voir le commit `e1adf49` (`src/components/hero-film.tsx`, `public/film-*`).
