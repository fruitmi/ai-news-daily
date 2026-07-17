# AI Daily News Project Instructions

## Project purpose

This project produces a Traditional Chinese AI news website containing up to ten meaningful AI news stories per day.

The website is designed primarily for:

* frontend engineers
* web designers
* UI/UX designers
* graphic designers
* people using AI coding and design tools

## Required files to read

Before performing any task, read:

1. `sources.md`
2. `docs/design-system.md`, if it exists
3. `.agents/skills/ai-news-design/SKILL.md`
4. existing JSON files in `data/`
5. recent reports in `reports/`

## Technology

Use:

* HTML
* CSS or SCSS
* vanilla JavaScript
* JSON
* Vercel static deployment

Do not introduce React, Vue, Next.js, databases, or backend services unless explicitly requested.

## News data rules

All news data must use the existing JSON schema.

Do not rename fields or add arbitrary fields without first explaining why.

Required article fields:

* id
* rank
* title
* brand
* product
* publishedAt
* importance
* status
* categories
* summary
* improvement
* workImpact
* sourceName
* sourceUrl
* isOfficialSource

Allowed status values:

* released
* testing
* announced
* unverified

Allowed importance values:

* high
* medium
* low

## Editorial rules

1. Search the latest 24 hours first.
2. Prefer official announcements and first-party documentation.
3. For each meaningful story, also search for credible examples, demo pages, implementation posts, screenshots, repositories, or product pages that show how the feature can be used.
4. Use official sources to confirm facts and product status; use credible non-official sources only to enrich examples, workflow impact, and reader understanding.
5. Select no more than ten meaningful stories.
6. Do not fill the report with weak stories merely to reach ten.
7. Merge duplicate coverage of the same event.
8. Check the previous seven days before including a story.
9. Repeat a previous story only if there is a meaningful new development, such as:

   * official release
   * price change
   * region expansion
   * major correction
   * new benchmark
   * public availability
10. Clearly distinguish release, testing, announcement, and rumor.
11. Do not copy marketing language without analysis.
12. Translate technical jargon into plain Traditional Chinese before using it.
13. If an English API or model term is necessary, explain what it enables in practical work first.
14. Use Traditional Chinese.

## Example and application research

For daily news collection, do not stop at the official announcement. Also look for materials that help the reader understand what the update changes in practice.

Prioritize:

* official examples, cookbook pages, templates, and sample apps
* GitHub repositories with clear maintainers and recent activity
* npm or package documentation with real usage examples
* Vercel, CodePen, StackBlitz, Observable, or Hugging Face Spaces demos
* credible engineering blogs or practitioner posts with screenshots, code, or workflows
* product pages, demo videos, or screenshots from the original vendor

Use these sources to improve:

* `summary`: what happened in plain language
* `improvement`: what is now possible or easier
* `workImpact`: concrete ways frontend engineers, UI/UX designers, web designers, or graphic designers might use it

Do not use example sources to overrule official product status. If an example is unofficial, experimental, region-limited, or private beta, state that clearly.

## Website rules

* News content must come from JSON.
* Do not hardcode daily news into HTML.
* `data/latest.json` contains the current report.
* `data/archive/YYYY-MM-DD.json` stores historical reports.
* `reports/YYYY-MM-DD-ai-news.md` stores the Markdown report.
* The interface must handle empty data and JSON loading errors.
* The site must remain responsive on desktop, tablet, and mobile.
* The site must not produce browser console errors.

## Design rules

Follow `.agents/skills/ai-news-design/SKILL.md`.

The current interface direction is based on `index.html`:

* dark retro-futuristic AI information cockpit
* full-width hero with 3D background scene
* centered foreground title, summary, and date controls
* featured carousel for the top three stories
* compact editorial rows for stories four through ten
* cool neutral palette with restrained cyan and red accents

The homepage should stay focused on reading the daily report. Do not add:

* Style A / Style B / Style C switch buttons
* dark-mode button unless explicitly requested again
* hero CTA buttons
* decorative hero metrics
* daily trend summary panel
* standalone category/search panels for only ten daily stories
* community/read-state summary section
* fake download actions
* explanatory prototype copy inside the UI

Date switching may stay on the homepage. Full archive search should be treated as a separate historical reading feature.

Do not redesign the interface during daily news updates.

Daily automation should normally update only:

* `data/latest.json`
* `data/archive/`
* `reports/`

Do not modify HTML, CSS, or JavaScript unless the current data schema is incompatible or a real bug is detected.

## Quality checks

Before completing a task:

1. Validate all JSON.
2. Check for duplicate article IDs.
3. Check required fields.
4. Check source URLs.
5. Check date formats.
6. Check responsive layout where relevant.
7. Check browser console errors where relevant.
8. Summarize changed files.
