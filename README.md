# AI News Daily

A static Traditional Chinese website for publishing a curated daily AI news brief.

The current homepage direction lives in `index.html`.

## Current Homepage Direction

- Dark retro-futuristic AI information cockpit.
- Full-width hero with a 3D background scene.
- Centered title, short daily summary, and date controls.
- Top three stories use a featured carousel.
- Featured images are shallow editorial strips, not large hero images.
- Stories four through ten use compact rows.
- The daily homepage intentionally avoids category/search panels, community summaries, fake CTAs, and decorative metrics.

## Structure

- `index.html` - main static page
- `article.html` - single story detail page
- `css/style.css` - visual design and responsive layout
- `js/app.js` - frontend rendering logic
- `data/latest.json` - latest news payload
- `data/archive/` - archived daily JSON files
- `reports/` - generated editorial reports
- `docs/design-system.md` - visual and content guidelines
- `assets/` - homepage image assets

## Daily Content

Daily automation should normally update only:

- `data/latest.json`
- `data/archive/`
- `reports/`

Interface changes should follow `docs/design-system.md` and `.agents/skills/ai-news-design/SKILL.md`.
