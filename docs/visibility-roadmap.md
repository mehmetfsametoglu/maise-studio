# Feuille de route : visibilité hors du code

Le code rend le site lisible et indexable. Il ne peut pas créer de réputation. Les moteurs de recherche et les assistants IA s'appuient aussi sur ce que le reste du web dit de vous : des profils cohérents, des liens de clients, de vrais avis. Tout ce qui suit est à faire par vous, avec de vraies informations. Ne rien inventer, ne rien acheter en masse.

## 1. À faire en premier (cette semaine)

1. **Google Search Console** : vérifier le domaine, envoyer `https://www.maisestudio.com/sitemap.xml`, demander l'indexation de l'accueil, de `/realisations`, de `/services` et des 5 pages de service.
2. **Google Business Profile** : créer la fiche seulement si Maisé a une adresse où recevoir des clients, ou en zone de service sans afficher d'adresse. Reprendre le profil de `docs/entity-profile.md` mot pour mot. Ne pas inventer d'adresse.
3. **Un seul nom, une seule description, une seule URL** partout (voir `docs/entity-profile.md`).
4. **LinkedIn** : page entreprise Maisé Studio avec la même description. Ajouter l'URL dans `SITE.sameAs`.
5. **Instagram** : profil au même nom. Ajouter l'URL dans `SITE.sameAs` et dans le pied de page (commentaire dans `footer.tsx`).

## 2. Ce qui apporte de la confiance (dans les 2 mois)

- **Liens des clients vers vous** : demander à Le 40, Route 95, Vøler et Bloom Mosaic d'ajouter « Site conçu par Maisé Studio » avec un lien vers `https://www.maisestudio.com/`. Le modèle prêt à coller est dans `templates/client-site-credit/` et `public/embed/maise-credit.js`. C'est le lien le plus utile : réel, local et pertinent.
- **Avis réels** : demander un avis Google (ou un témoignage écrit, avec accord) aux quatre clients. Ne publier sur le site que ce qui est reçu, avec le nom et l'accord de la personne.
- **Photos professionnelles** : une photo de l'équipe et, si possible, des captures propres et récentes de chaque projet.
- **Annuaires d'agences** : Sortlist, Clutch, DesignRush. Seulement ceux où vous pouvez remplir un profil complet et le tenir à jour. Les profils vides ou abandonnés font plus de mal que de bien.
- **Bing Webmaster Tools** et **Bing Places** si vous visez aussi Bing (qui alimente plusieurs assistants).
- **Behance, Dribbble** : uniquement si vous les alimentez vraiment.
- **Presse, blogs de secteur, partenaires** : un article sur un client ou une interview locale vaut plus que dix annuaires. À chercher au cas par cas.

## 3. Journal (à ne lancer que si quelqu'un l'écrit vraiment)

Pas de blog rempli de textes générés. Un article utile par mois vaut mieux que dix médiocres. Sujets à fort potentiel, à écrire avec votre expérience réelle :

1. Combien coûte un site internet pour un restaurant ?
2. Que doit contenir le site d'un café ?
3. PDF ou vrai menu web : que choisir pour un restaurant ?
4. Comment rendre un restaurant visible dans les recherches IA ?
5. Site internet d'hôtel : quelles fonctionnalités sont vraiment utiles ?
6. Restaurant : faut-il intégrer la réservation au site ?
7. Comment choisir une agence web pour un commerce à Paris ?
8. Pourquoi votre site est beau mais invisible sur Google ?
9. Site multilingue pour un hôtel : la bonne structure SEO
10. Google Business Profile et site web : comment les faire travailler ensemble ?

Quand un article est prêt : créer `/journal` et `/journal/[slug]`, ajouter une balise `Article` (auteur réel, date réelle) et l'ajouter au sitemap. Rien de tout cela n'existe dans le code aujourd'hui, volontairement.

## 4. Ce qui ne marche pas, à éviter

- Acheter des liens ou des avis.
- Publier des dizaines de pages « agence web + ville + secteur ».
- Promettre « première position sur ChatGPT » : personne ne peut le garantir.
- Compter sur `llms.txt` seul : le fichier existe (`/llms.txt`), il est un complément, pas un levier.
