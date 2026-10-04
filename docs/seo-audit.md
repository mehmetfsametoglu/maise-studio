# Audit SEO et technique (octobre 2026)

## Ce qui existait

- Next.js 16 (App Router), React 19, Tailwind 4, Framer Motion, déploiement Vercel. Rendu statique : le HTML contient déjà le texte des pages.
- Une description d'entreprise en anglais (JSON-LD `ProfessionalService`) et un `llms.txt` statique qui promettait de l'optimisation pour l'IA.
- `robots.txt` et `sitemap.xml` corrects mais courts, sans mention d'OAI-SearchBot, sur `maisestudio.com` sans `www`.
- Prix écrits à plusieurs endroits (configurateur, `i18n`, `llms.txt`).
- `images.unoptimized: true` : des PNG de 2 Mo servis tels quels, sans `srcset` ni format moderne.
- Pages de projet = un iframe plein écran, sans texte : rien à indexer.
- Photos de couverture des projets qui n'étaient pas des captures des sites.
- Une carte Google Maps chargée dès l'arrivée sur `/examples` (cookies Google avant tout choix).
- Un seul niveau de pages : `/`, `/work`, `/examples`, `/studio`, `/contact`.
- Pas de 404 personnalisée, pas de pages légales, pas de FAQ.
- Dépendance `lenis` inutilisée.

## Ce qui a été changé

Source unique pour les faits (`site.ts`), les prix (`pricing.ts`), les projets, les services et la FAQ. Système de métadonnées (`seo.tsx`). JSON-LD sans donnée inventée. 5 pages de service, 4 études de cas avec vraies captures bureau et mobile. Redirections `/work` et `/ornek/*`. `robots.txt` avec OAI-SearchBot. `llms.txt` généré depuis les mêmes données. Images optimisées. Carte Google au clic. Formulaire validé, avec préremplissage depuis le configurateur. 404, mentions légales et confidentialité.

## Mesures Lighthouse (build de production local, mobile)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Page de service | 77 | 100 | 100 | 100 |
| Étude de cas | 71 | 100 | 100 | 100 |
| Contact | 79 | 100 (après correction du bouton vert) | 100 | 100 |
| Accueil, simulation « 4G lente + processeur 4x plus lent » | 51 | 100 | 100 | 100 |
| Accueil, sans simulation (conditions réelles de cette machine) | 96 (LCP 2,2 s) | n/a | n/a | n/a |

Lecture : la simulation par défaut de Lighthouse est très sévère. L'accueil y perd des points parce que le film charge 289 images (11,7 Mo) et que l'écran d'attente attend les 24 premières. Sur une vraie connexion rapide, la page est prête en 2,2 s. Sur une connexion lente, le film se complète progressivement et l'écran d'attente se ferme au plus tard après 5 s. Ce sont les chiffres d'un ordinateur, pas d'un téléphone réel : à refaire sur PageSpeed Insights après la mise en ligne.

Améliorations faites pendant la mesure : menu mobile chargé à la demande (blocage du thread principal divisé par deux), logo du pied de page lisible (il était sombre sur fond sombre), contrastes du configurateur et du bouton WhatsApp. L'option expérimentale `inlineCss` a été testée puis retirée : aucun gain mesurable.

## Limites connues

- Les mentions légales sont en français seulement (texte de droit français). Tout le reste, y compris la page de confidentialité, est en français, anglais et turc. Les traductions anglaises et turques des pages de services, études de cas et FAQ sont de moi : faites-les relire par une personne qui parle ces langues avant de compter dessus.
- Titres et descriptions des pages (balises `<title>`, Open Graph) et données structurées restent en français, car chaque page n'a qu'une seule adresse.
- Pas testé sur de vrais téléphones.
- `/examples` est lié depuis le pied de page mais n'est pas dans le sitemap.
