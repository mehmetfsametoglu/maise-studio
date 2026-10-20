# Textes à confirmer par vous

Le code ne peut pas savoir si ces phrases sont exactes. Elles sont écrites prudemment, à partir de ce que le site disait déjà. Corrigez-les dans `src/lib/faq.ts` et `src/lib/services.ts` si la réalité est différente.

## FAQ (`src/lib/faq.ts`)

| Réponse | Ce que dit le texte | À vérifier |
|---|---|---|
| Délai | Cela dépend, on donne une date dans le devis. | Si vous avez un délai habituel, vous pouvez l'écrire. |
| Propriété | À la fin du projet, le site est à vous. | Ce que contient « à vous » : code, domaine, hébergement. |
| Domaine et hébergement | La mise en ligne comprend le domaine, l'hébergement et une dernière vérification. Le devis précise ce qui est inclus. | Qui paie le domaine et l'hébergement, et combien ? |
| Reprise d'un site existant | Envoyez le lien, on regarde. | Acceptez-vous vraiment ces projets ? |
| Modifier soi-même | On peut mettre en place un espace pour modifier vos contenus. | Quel outil, et est-ce compris dans les formules ? |
| Essentiel et Signature | Reprend uniquement les phrases du configurateur. | Nombre de pages, ce qui est inclus ou non. |
| Maintenance | On met à jour et on corrige quand vous en avez besoin. | Gratuit, payant, pendant combien de temps ? |
| E-commerce | Présenté comme possible, sans projet cité. | Avez-vous déjà fait une boutique en ligne ? |
| Réservation | Présentée comme une option (WhatsApp, formulaire, lien). | Avez-vous déjà branché un outil de réservation ? |

## Pages de service (`src/lib/services.ts`)

- **Hôtels** : la page dit qu'il n'y a pas encore de site d'hôtel publié. Si vous en avez un, retirez ce bloc et ajoutez le projet.
- **Commerces** : la page dit qu'il n'y a pas de clinique ni de boutique en ligne publiée. Même chose.
- **Données structurées** pour les clients (« on ajoute les informations de votre établissement ») : c'est ce que le code de ce site sait faire. Les sites clients existants ne les ont peut-être pas.

## Études de cas (`src/lib/projects.ts`)

Chaque fiche reprend ce qui est visible sur le site en ligne du client (menus, horaires, langues, boutons). Rien n'est ajouté sur les résultats, le trafic ou les avis. « Rôle de Maisé : conception et développement du site » vient du texte existant « les sites que nous avons faits ». Si votre rôle a été différent sur un projet, corrigez `role` et `services`.

## Sites d'exemple (`src/lib/concepts.ts`)

Maison Vesper (hôtel) et Lumea Skin Clinic (clinique) sont des sites que vous avez fait dessiner pour des lieux imaginaires. Ils sont présentés partout comme « site d'exemple, pas un projet client » (page Démos, pages Hôtels et Commerces, page de chaque exemple). Gardez cette mention : ne les déplacez jamais dans « Réalisations ». Leurs boutons WhatsApp doivent passer par `https://www.maisestudio.com/api/contact-redirect?text=...` pour ne jamais publier votre numéro.

## Adresses des sites clients et d'exemple

Les adresses d'hébergement des six sites sont dans `src/lib/outbound.ts`, un fichier lu seulement par le serveur. Les pages ne les contiennent pas : les boutons et les aperçus passent par `/go/<nom>`. **Exception : Le 40**, qui a son propre nom de domaine (`le40bar.fr`, adresse canonique du site), est lié directement : la valeur `liveUrl` dans `src/lib/projects.ts` fait pointer les boutons, l'icône ↗ des cartes et l'aperçu vers cette adresse. Pour tout autre projet qui obtient son domaine, ajoutez `liveUrl` de la même façon (et mettez à jour `outbound.ts`). Tant qu'un projet reste sur une adresse `*.lovable.app`, il passe par `/go/<nom>` : c'est un choix volontaire pour ne pas afficher l'adresse d'hébergement. Si vous préférez un lien direct ou une mention « Démo » sur ces trois cartes, dites-le. Le badge « Edit with Lovable » est masqué dans les réglages Lovable des six projets (Settings, Publishing, Hide Lovable badge). Un nouveau projet Lovable aura le badge tant que ce réglage n'est pas activé.

## Traductions

Les versions anglaise et turque des pages de services, des études de cas, de la FAQ et de la page de confidentialité ont été écrites à partir du français, sans relecture par une personne dont c'est la langue. Faites-les relire, surtout le turc, qui touche vos clients à Istanbul. Les textes sont dans `src/lib/services.ts`, `projects.ts`, `faq.ts` et `l10n.ts`.

## Mesure d'audience

La page de confidentialité affirme que Vercel Web Analytics n'utilise pas de cookie et ne vous suit pas d'un site à l'autre. C'est ce que Vercel annonce dans sa documentation. Si vous voulez une certitude juridique (CNIL, RGPD), faites relire cette phrase par la personne qui rédigera vos mentions légales.

## Autres

- Hébergeur « Vercel Inc. » dans les mentions légales : à confirmer selon votre hébergement réel.
- « Deux interlocuteurs » sur `/studio` : repris de la liste de l'équipe de la page contact.
- Prix en livres turques : repris tels quels du configurateur. Voir `src/lib/pricing.ts`.

## Accueil (hero, bandeau de chiffres, « Pourquoi Maisé », formules, barres de contact)

Textes dans `src/lib/i18n.tsx` (clés `hero.*`, `proof.*`, `why.*`, `formulas.*`, `announce.*`, `bar.*`, `cb.*`).

- **Bandeau de chiffres** : « à partir de 399 € » (vient de `src/lib/pricing.ts`), « répondre en moins de 3 h » (vient de `SITE.responseTime`), « 4 projets réels en ligne » (compté sur `PROJECTS`), « 1 langue incluse dans le prix ». Si l'un de ces faits change, il change au même endroit que le reste du site. Aucun chiffre de clients, d'avis ou d'années d'expérience n'est affiché : il n'y en a pas de source.
- **« Pourquoi Maisé »** : cinq phrases qui reprennent ce que le site promet déjà (design sur mesure, pensé pour le téléphone, lisible par Google et les IA, le site vous appartient, le prix avant le travail). Vérifiez surtout « Le site est à vous » (voir la ligne Propriété de la FAQ).
- **Horaires** : « Tous les jours, 9h-19h » vient de la page Contact. Il est aussi affiché dans la fenêtre de rappel.
- **Manquent volontairement** : photos et courtes biographies des fondateurs, et un tableau de délais (réponse WhatsApp, premier visuel, mise en ligne). Rien n'a été inventé : envoyez les vraies valeurs et elles seront ajoutées.

## Vitrine des projets : ce qui attend vos fichiers

Le brief `maise-projects-showcase-spec.md` prévoit aussi une galerie de photos avec visionneuse, une grande photo en tête de chaque étude de cas et des nuanciers de couleurs. Ils ne sont **pas faits** : le dépôt ne contient que les captures d'écran (`public/work/shots/`) et trois anciennes images de couverture, aucune photo fournie par les clients. Pour chaque projet, il faut `public/work/<nom>/01-hero.jpg` à `08-....jpg` (noms : `le-40`, `route-95`, `voler-coffee`, `bloom-mosaic`), l'autorisation écrite du client pour les publier et, si des personnes sont reconnaissables, leur accord. Pour le lien « Site réalisé par Maisé Studio » sur les sites clients, l'accord de chaque client est aussi nécessaire.
