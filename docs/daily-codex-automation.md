# Daily Codex Automation

## Purpose

This automation updates AI Daily News once per day with the previous day's AI news.

The output should be useful for frontend engineers, web designers, UI/UX designers, graphic designers, and people using AI coding or design tools.

## Schedule

Run daily in the Asia/Taipei timezone.

The run date is today. The report date is yesterday.

Example:

If the automation runs on `2026-07-13`, it should create or update the report for `2026-07-12`.

## Required Workflow

1. Read `AGENTS.md`, `sources.md`, `docs/design-system.md`, and `.agents/skills/ai-news-design/SKILL.md`.
2. Determine the report date as the previous calendar day in Asia/Taipei.
3. Search official sources first for AI product updates published on the report date.
4. Search second-level news and analysis only when official sources are insufficient or when impact analysis needs context.
5. Search third-level examples, demos, product pages, repositories, videos, screenshots, or credible implementation posts to make the practical impact easier to understand.
6. Select up to ten meaningful stories.
7. Do not fill the report with weak stories merely to reach ten.
8. Merge duplicate coverage of the same event.
9. Check the previous seven days of archive files to avoid repeating old stories unless there is a meaningful new development.
10. Write all news in Traditional Chinese.
11. Validate JSON before finishing.
12. Update only the normal daily files unless a schema or display bug requires code changes.

## Files To Update

Daily automation should normally update:

- `data/latest.json`
- `data/archive/YYYY-MM-DD.json`
- `reports/YYYY-MM-DD-ai-news.md`
- `assets/featured-YYYY-MM-DD-01.png`
- `assets/featured-YYYY-MM-DD-02.png`
- `assets/featured-YYYY-MM-DD-03.png`
- the `featuredImages` map in `index.html` only when new TOP3 image paths need to be registered

Do not modify `article.html`, layout CSS, or site structure during a normal daily news run.

## Image Rules

Generate images only for the TOP3 stories.

Images should:

- match the story topic, not just the site style
- make the brand or product recognizable when possible
- preferably include the brand logo or a clear brand/product visual cue
- avoid generic AI robots, glowing brains, circuit heads, or stock humanoid imagery
- use wide, shallow editorial composition suitable for homepage feature strips
- avoid live webpage screenshot services that may show bot checks

If a brand logo cannot be used directly, use typography, product UI cues, or brand-adjacent visual language instead.

## Ranking Guidance

TOP3 should prioritize:

1. product releases or public availability that readers can use now
2. major changes to AI coding, design, frontend, UI/UX, image, video, or workflow tools
3. credible announcements with clear near-term work impact
4. important safety, pricing, platform, API, or enterprise changes that affect adoption

Do not rank a story high only because it is noisy on social media.

## Writing Guidance

For each story:

- explain the practical meaning before naming technical features
- translate jargon into plain Traditional Chinese
- make `improvement` answer what changed and what can now be done more reliably, faster, or with less manual work
- make `workImpact` concrete for frontend, UI/UX, web design, or graphic design work
- include source URLs and keep official status clear

Allowed status values:

- `released`
- `testing`
- `announced`
- `unverified`

Allowed importance values:

- `high`
- `medium`
- `low`

## Quality Checks

Before completion:

1. Validate all edited JSON.
2. Check required article fields.
3. Check duplicate article IDs.
4. Check source URLs.
5. Check date formats.
6. Confirm TOP3 image files exist when TOP3 exists.
7. Confirm `featuredImages` contains the new TOP3 IDs and image paths.
8. Run a syntax check for any edited inline JavaScript.
9. Summarize changed files.
