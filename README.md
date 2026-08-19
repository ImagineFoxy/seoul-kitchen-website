# Seoul Kitchen im Hafen — Website

Marketing website for **Seoul Kitchen im Hafen**, a Korean kitchen in Düsseldorf's Medienhafen.

A self-contained, single-page site: no build step, no framework, no dependencies beyond Google Fonts and a Google Maps embed.

## Structure

```
.
├── index.html          # all page content/sections
├── styles.css           # all styling (design tokens live in :root at the top)
├── script.js             # nav toggle, scroll reveal, sticky nav
├── assets/                  # optimized WebP images actually used on the site
│   ├── hero-cutout.webp
│   ├── chicken-cutout.webp
│   ├── chicken-sauce-cutout.webp
│   └── noodles-cutout.webp
└── design/
    └── originals/        # untouched source files for provenance
        ├── landing_page_first_image.avif   # hero photo, pre-cutout
        ├── Chicken.avif
        ├── Chicken_with_sause.avif
        ├── Nuddles_with_chicken.avif
        └── logo-raw.png                    # original raw logo photo
```

The `assets/` images were produced from the files in `design/originals/` by removing the studio backdrop (OpenCV GrabCut + HSV background-family flood-fill, done locally — no AI image generation was used) and re-encoding to WebP. The site logo (the circular badge in the nav/hero/footer) is hand-built inline SVG in `index.html`, redrawn from `design/originals/logo-raw.png` rather than using the raw photo directly.

## Running locally

No build step — just serve the folder:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Or open `index.html` directly in a browser (all assets are relative paths).

## Deploying

Any static host works: drag the repo folder into Netlify, connect it on Vercel, or enable GitHub Pages on this repo (serve from the `main` branch, root directory).

## Content status

- **Menu & pricing**: intentionally not final yet — the "Signature Plates" section shows three house-favorite dishes with descriptions but no prices, pending the real menu.
- **Ordering links**: Wolt, Uber Eats, Lieferando, and direct online ordering are live-linked in the `#order` section and footer.
- **Photos**: currently only the four source photos in `design/originals/`. Interior/atmosphere shots are a planned addition.
