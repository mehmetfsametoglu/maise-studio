# Client site credit — "Site conçu par Maisé Studio"

Every site Maisé Studio ships carries the same quiet footer line, linking to
Maisé Studio in a new tab.

## Option A — one script tag (any site, no build step)

Paste once before `</body>`:

```html
<script src="https://maisestudio.com/embed/maise-credit.js" defer></script>
```

- Appends the line to the page's `<footer>` (or the end of `<body>` if there
  is none).
- Language follows `<html lang>`; force it with `data-lang="fr|en|tr"`.
- Changing `public/embed/maise-credit.js` in this repo updates every client
  site at once.

## Option B — React component (Next.js / Vite / Lovable)

Copy `SiteCredit.tsx` into the project and render it last in the footer:

```tsx
<footer>
  {/* … */}
  <SiteCredit lang="en" />
</footer>
```

## New client checklist

1. Add the script tag (or component) to the client's layout.
2. Check it is visible on mobile and does not clash with the footer colours.
3. Confirm the link opens https://maisestudio.com in a new tab.

Current client sites that need it: Route 95, Le 40, Vøler Coffee, Bloom Mosaic.
Their code lives in separate repositories, not in this one.
