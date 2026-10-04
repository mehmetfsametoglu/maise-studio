# Maisé Studio

Site du studio web Maisé Studio (Paris). Next.js 16 (App Router), React 19, Tailwind 4, Framer Motion.

```bash
npm run dev      # http://localhost:3003
npm run build    # build de production, tout est statique sauf /api/contact-redirect
npm run lint
```

## Où modifier quoi

| Je veux changer | Fichier |
|---|---|
| Nom, e-mail, description, équipe, profils sociaux | `src/lib/site.ts` |
| Prix et formules | `src/lib/pricing.ts` (le configurateur, la FAQ, le JSON-LD et `llms.txt` les lisent) |
| Un projet ou en ajouter un | `src/lib/projects.ts` + captures dans `public/work/shots/` |
| Une page de service | `src/lib/services.ts` |
| La FAQ | `src/lib/faq.ts` |
| Textes du film, de l'accueil, du configurateur (fr, en, tr) | `src/lib/i18n.tsx` |
| Titres, descriptions, Open Graph, JSON-LD | `src/lib/seo.tsx` |
| Robots, sitemap, `llms.txt` | `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/llms.txt/route.ts` |

Un nouveau projet dans `projects.ts` crée sa page `/realisations/[slug]`, sa carte de partage, son entrée dans le sitemap et dans `llms.txt`.

## Variables d'environnement

`WHATSAPP_NUMBER` (serveur seulement, voir `.env.local` en local et les variables Vercel). Le numéro ne doit jamais apparaître dans le code, le HTML ni les requêtes du navigateur : les boutons passent par `/api/contact-redirect`.

## Documentation

`docs/` : profil officiel de l'entreprise, audit, liste de contrôle de mise en ligne, textes à confirmer, feuille de route de visibilité.
