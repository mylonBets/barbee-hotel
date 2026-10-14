# Barbee Hotel & Danny's Sports Bar

Static site, no framework. `sh build.sh` assembles `dist/`, which is what ships.

## Three pages
| URL | What | Look |
|---|---|---|
| `/` | The door. Pick which business you want. | Navy, both photos side by side |
| `/hotel/` | Barbee Hotel dining room, **downstairs** | Navy + gold, Cormorant |
| `/dannys/` | Danny's Sports Bar & Pizza, **upstairs, with the deck** | Charcoal + red, from their own logo |

One stylesheet. Danny's is a `body.brand-dannys` theme that re-points the CSS
variables, so both sites share every component and stay in sync.
`site.js` is shared and tolerates elements a given page does not have.

## What is in the build
- **WebP everywhere.** Every photo ships as WebP with the JPEG/PNG kept as a `<picture>`
  fallback, so old browsers still work. Modern browsers pull about 1.4MB instead of 2.6MB.
  The lightbox requests the WebP and falls back on error.
- `picture{display:contents}` keeps the wrappers out of the layout, so every existing
  CSS selector still targets the `img` directly.
- **Share card** at `assets/og-card.jpg`, 1200x630, built from the real room photo with
  the hotel's own badge. Wired to Open Graph and Twitter.
- **Favicons** generated from their badge: `favicon.ico`, 32px, Apple touch icon,
  192 and 512 for `site.webmanifest`.
- `robots.txt`, `sitemap.xml`, `llms.txt`, a branded `404.html`.
- Reveal on scroll, and a slow drift on the hero image. Both disabled under
  `prefers-reduced-motion`.

## Previewing locally
The preview server is sandboxed out of `~/Downloads`, so it serves a mirror:

```bash
rsync -a --delete --exclude preview "/Users/mylonbetts/Downloads/Claude code1/barbee-hotel-site/" /private/tmp/claude-501/-Users-mylonbetts-Downloads-Claude-code1/511965f6-b1ad-4008-969c-308ee1bad7c9/scratchpad/barbee-serve/
```

Then start the `barbee-hotel-site` config (port 8766). Re-run the rsync after each edit.
`index.html` has a capture hook: `?y=1500` jumps to that scroll offset with all images
eager loaded and reveals settled, for screenshots.

## Deploying
Drag the folder into Netlify, or connect the repo. `netlify.toml` sets the publish dir,
long cache on `/assets/*`, and no-cache on `index.html`. The `preview/` folder is only
reference renders and `incoming/` is a photo inbox. Neither needs to ship.

---

Internal working notes (client corrections, open questions, pitch ideas) are kept in
`NOTES.md`, which is deliberately not committed.
