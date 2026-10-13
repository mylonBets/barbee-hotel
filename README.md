# Barbee Hotel & Restaurant — website

Static site. No build step. `index.html` + `styles.css` + `assets/`.

**Structure:** fixed left "front desk" rail (identity, hours, phone, nav) beside a
scrolling content pane. Collapses to a compact header plus a sticky call bar under 980px.

**Palette:** navy `#16283a`, sand `#f8f4ed`, gold `#a8854c`, ember `#b1552c`.
Display face Marcellus, body Karla.

## Sections
Hero · lake horizon band · Between Two Lakes · The Dining Room · Danny's Sports Bar
(full menu + weekly specials) · History · Gallery · Gatherings · Find Us + map

## Where the content came from
Everything factual is pulled from barbee-hotel.com, their own gallery, and the Indiana
State Library record for the building.

| Thing | Source |
|---|---|
| Hours, phone, email, address | their current site |
| Menu items and prices | their current site and menu listing |
| Hero room, dining room, Danny's bar and taps, all 15 gallery plates | their own photos, pulled from their site |
| Barbee Hotel badge and the Danny's Sports Bar logo | their own logo files, used as supplied |
| 1897 Ormond, fire 17 Aug 1921, rebuilt spring 1923, Davison & Lincoln, "Kuhns Landing" | Indiana Album record, Indiana State Library |
| Capone / Room 301 / cigar smoke / booking the whole hotel | their own history page, presented as lore |
| 4.1 stars, #7 of 74 in Warsaw | Tripadvisor listing |
| 86% recommend, 456 reviews; outdoor seating; carryout; $$ price range; 9.2K followers | their Facebook page |
| Dock on Little Barbee | their listings and local coverage |

The dusk lake band between the hero and the first section is drawn in SVG. It is the only
invented image on the page and reads as a graphic, not a photograph. Their old site's
"food photos" were mostly WordPress theme stock, so none of those were reused.

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

## Getting their Facebook photos onto the site
Their page is public and I could read it, but photo files cannot be pulled
programmatically: Facebook rejects server side requests outright, and in the browser the
image URLs come back redacted because they carry session query strings. I did not try to
work around that.

Two ways to finish it:
1. **Best:** ask the client for the originals. Facebook recompresses hard and strips the
   resolution you want for a full width hero.
2. **Fine:** open the page's Photos tab while logged in, download what you want, and drop
   the files in `incoming/`. Tell me they are there and I will crop, compress, make the
   WebP versions and wire them in.

`incoming/README-DROP-PHOTOS-HERE.txt` lists what the site needs, in priority order.

## THE ROOMS ARE GONE
The hotel no longer rents rooms. The whole Rooms section, the nav item, the hero
mention, the wedding "rooms upstairs" line and the schema wording were all removed on
2026-10-13 and `llms.txt` now explicitly tells AI summarisers not to say people can stay
the night. Room 301 and the Gable & Lombard suite survive only in the history timeline,
in past tense. If anyone re-adds room content, that is wrong.

## Danny's is a co-equal half of the business
Danny's Sports Bar & Pizza has its own Google listing (4.4 across ~441 reviews) and its
own pages on the old site. It now has: the real logo, four of its own food photos, its
full menu with real prices, the weekly specials, a mention in the page title and hero,
and its own Restaurant schema block with `parentOrganization` pointing at the hotel.
Danny's content came from `/dannys-pizza/` and `/menu-dannys-pizza/`, two pages I had
missed on the first pass.

### Weekly specials, from their own site
Mon hot dog night · Tue Italian beef · Wed tacos · Thu Bingo & Bites · Fri & Sat karaoke.
Danny's hours are listed as 4:30 to 10. **Confirm which days** — the dining room is shut
Sunday and Monday, but Danny's advertises a Monday special, so Danny's may open on days
the restaurant does not.

## Things to confirm with the hotel
1. **Town.** Their address is Warsaw, IN 46582. The site leads with "Barbee Lakes" and
   names Syracuse only as a nearby town. Change it if they market as Syracuse.
2. **"SINCE 1920".** One of their own graphics says 1920. The record says Ormond 1897,
   fire 1921, rebuild 1923. The site uses 1897 with 1923 for the current building.
   Pick one and make it consistent everywhere.
3. **The map pin is approximate.** The hotel is not a mapped point in OpenStreetMap, so
   the marker sits on North Barbee Road at the neck between the two lakes, within about a
   block. The Google and Apple buttons use the exact street address and navigate correctly.
   Ask them to drop an exact pin if they want it perfect.
4. **Ratings go stale.** "4.5" and "504 Google reviews" are hardcoded in the hero proof
   strip. Recheck before launch and every few months.
5. **The patio.** Facebook lists outdoor seating, so the site says the patio opens with
   the weather. Confirm it exists, whether it looks over the water, and which months.
   If it overlooks the lake, say so loudly, it is a strong draw.
6. **Carryout.** Facebook lists in-store pickup. The site says call ahead and pick it up
   at the bar. Confirm that is how they actually run it.
7. **Missing prices.** Prime rib, flat iron and rack of lamb show "ask". Danny's has no
   prices at all. Need the current bar and dining menus.
8. **Still no exterior shot** of the building, which a lakeside hotel really wants. This
   is the single biggest remaining gap.
9. **Chef.** A 2022 article named Kyle Manning as executive chef. Left off as possibly stale.
10. **Online reservations.** Everything is "call to reserve". If they run OpenTable, Resy
   or Toast, swap the CTAs for booking links.

## Two things worth buying
- **Archival photo.** The Indiana Album holds "New Barbee Hotel, Big Barbee Lake, circa
  1925" and "Hotel Barbee, circa 1935". They are marked *No Copyright, Educational Use
  Permitted*, which does **not** cover a commercial site, so they are deliberately not
  used here. The Indiana State Library will usually grant a local business permission if
  asked. One of those in the history section would be excellent.
- **Testimonials.** Real review text is owned by the reviewer and the platform, so only
  the aggregate rating is shown. If they collect a few quotes with permission, there is
  an obvious place for them under the proof strip.

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
