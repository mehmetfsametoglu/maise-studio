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

## Traductions

Les versions anglaise et turque des pages de services, des études de cas, de la FAQ et de la page de confidentialité ont été écrites à partir du français, sans relecture par une personne dont c'est la langue. Faites-les relire, surtout le turc, qui touche vos clients à Istanbul. Les textes sont dans `src/lib/services.ts`, `projects.ts`, `faq.ts` et `l10n.ts`.

## Autres

- Hébergeur « Vercel Inc. » dans les mentions légales : à confirmer selon votre hébergement réel.
- « Deux interlocuteurs » sur `/studio` : repris de la liste de l'équipe de la page contact.
- Prix en livres turques : repris tels quels du configurateur. Voir `src/lib/pricing.ts`.
