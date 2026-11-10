# Milk Frog Field Guide

**Live site: <https://jizikami.github.io/my-website/>**

A four-page fan-made field guide to the internet's most doubtful frog. Static HTML, hand-written CSS, a little JavaScript. No build step, no server, no database.

The site lives in [`my_website/`](my_website/) and is designed to be published as a plain static folder.

## Pages

| File | Chapter | What it does |
| --- | --- | --- |
| `index.html` | Home | Hero, contents, specimen facts, call to action |
| `origin.html` | Chapter 01 | The character, the bottle, a chronology, sources |
| `memes.html` | Chapter 02 | Three reaction-image specimens, anatomy, etiquette |
| `predict.html` | Chapter 03 | The milk test: four questions, three results |
| `404.html` | Error | Friendly fallback for a real host |

Navigation is real relative links between the four pages, so it works from any folder, on GitHub Pages, on Netlify, or opened straight from disk.

## How the seven requirements are covered

1. **Pages** — four content pages plus a 404, with working navigation on every page.
2. **Content** — original English copy written for this project; external sources are linked on the origin page and in the footer. Images are AI-generated renders derived from the project's own assets, credited in the colophon.
3. **Structure** — semantic `header`, `nav`, `main`, `article`, `section`, `figure`, `dl`, `footer`; one `h1` per page; skip link; `aria-current` on the active nav item; labelled landmarks.
4. **Layout** — fluid type and spacing with `clamp()`, breakpoints at 1080/980/900/860/720/520 px, a mobile drawer nav, and grids that collapse without horizontal scrolling.
5. **Behaviour** — the mobile menu, scroll-triggered reveals, and the milk test (scoring, progress, validation, result, restart) all respond to the user. Everything runs in the browser.
6. **Live** — ready for Netlify (see below). The publish directory is set in `netlify.toml`.
7. **History** — commit in small steps and push at least once a week; the repository already has history to build on.
8. **Identity** — Open Graph image, favicon (ICO + SVG + PNG), Apple touch icon, 192/512 app icons, maskable icon, and a web app manifest.

## Identity assets

| Asset | File | Size |
| --- | --- | --- |
| Open Graph image | `my_website/assets/og-image.jpg` | 1200 × 630 |
| Favicon (multi-size) | `my_website/favicon.ico` | 16 / 32 / 48 |
| Favicon (vector) | `my_website/assets/favicon.svg` | any |
| Favicon PNG | `my_website/assets/favicon-32.png` | 32 × 32 |
| Apple touch icon | `my_website/assets/apple-touch-icon.png` | 180 × 180 |
| App icon | `my_website/assets/icon-192.png` | 192 × 192 |
| App icon | `my_website/assets/icon-512.png` | 512 × 512 |
| Maskable icon | `my_website/assets/icon-maskable-512.png` | 512 × 512 |
| Manifest | `my_website/manifest.webmanifest` | — |

All icons and the OG card are generated from one vector-style frog mark, so the tab icon, home-screen icon, and social preview feel like the same brand.

### One thing to change after deploying

Open Graph images should be absolute URLs. Once the site has a real address, replace this line in all five HTML files:

```html
<meta property="og:image" content="assets/og-image.jpg">
```

with the deployed URL, for example:

```html
<meta property="og:image" content="https://your-site.netlify.app/assets/og-image.jpg">
```

Add `og:url` at the same time if you like.

## Preview locally

From the repository root:

```powershell
python -m http.server 8000 -d my_website
```

Then open <http://localhost:8000>. Opening `my_website/index.html` directly also works, but a local server matches real hosting more closely.

## Deploy

### GitHub Pages (live)

Pages is enabled for this repository. Every push to `main` runs `.github/workflows/pages.yml`, uploads the `my_website` folder, and publishes it to <https://jizikami.github.io/my-website/>.

### Netlify (optional)

`netlify.toml` already points Netlify at the `my_website` folder. An earlier, misnamed `1. netlify.toml` in the repository pointed at the old `htmllearning` folder; it has been removed so Netlify reads the real configuration.

- **Connected repo:** in Netlify, add a new site from Git, pick this repository, and leave the build command empty. Netlify reads `netlify.toml` and publishes `my_website`.
- **Drag and drop:** drag the `my_website` folder onto <https://app.netlify.com/drop>. No configuration needed.

### GitHub Pages

Because the site sits in a subfolder, GitHub Pages serves it at `/my-website/my_website/` and the repository root has no `index.html`. If you want a clean root URL on Pages, either move the site files to the repository root, or keep using Netlify. If you do enable Pages, add the resulting URL to the OG tag above.

## Git history

The assignment asks for history that grows week by week. Keep the commits small and descriptive:

```powershell
git status
git add my_website
git commit -m "Week 3: add the milk test and result states"
git push
```

Aim for one meaningful commit per week rather than one giant commit at the end.

## Before you submit

The copy here is a finished draft, not a final answer. Read it once, out loud if you can, and rewrite anything that does not sound like you. Add one detail only you would know — a specific group chat, a specific friend, a specific Tuesday. The brief asks for text you have edited and can defend.

## Built with

- HTML5, CSS custom properties, CSS grid and flexbox
- Vanilla JavaScript (no dependencies)
- Georgia + system UI fonts (no webfont requests)
- Pillow (Python) for generating the icons and the Open Graph card

## Credits

Fan documentation, not an official character page. External references: [Milk Frog on Douyin](https://www.douyin.com/search/%E5%A5%B6%E8%9B%99) and the [fan archive on GitHub](https://github.com/Orliss/nailong). Renders are AI-generated from the project's original assets.
