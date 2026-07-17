---
name: ai-news-design
description: Use when designing, implementing, reviewing, or modifying the AI Daily News website interface.
---

# AI Daily News Design Skill

## Current design direction

The current interface direction is Style D:

* dark retro-futuristic AI information cockpit
* editorial daily AI news reader
* full-width first screen with a 3D scene behind centered content
* compact, useful reading flow for frontend engineers, UI/UX designers, web designers, and graphic designers

The website must feel like an AI information deck for daily reading. It must not feel like a generic SaaS dashboard, a marketing landing page, a game platform storefront, or an unstyled HTML report.

## Primary goals

1. Help the reader identify the three most important stories quickly.
2. Keep the daily page focused on reading, not filtering.
3. Make released, testing, announced, and unverified features easy to distinguish.
4. Make brand, product, source, importance, and work impact easy to scan.
5. Preserve a strong visual hierarchy on desktop and mobile.

## First screen

* The hero must be full width and must not be constrained by `.shell`.
* The 3D scene belongs behind the content as a background layer.
* The foreground hero content is centered.
* The title is `AI 情報資訊艙`.
* The hero summary should remain concise: `今日整理最近 24小時內值得追蹤的 AI 更新。`
* Date switching belongs in the foreground date panel.
* Do not add hero CTA buttons.
* Do not add decorative metrics, trend summaries, or fake dashboard numbers.
* Do not add a dark-mode toggle unless explicitly requested again.

## Visual language

* Use dark neutral surfaces, charcoal, cool gray, cyan, and limited red accents.
* Use angular clipped edges where they support the current cockpit style.
* Avoid warm yellow, beige, brown, paper textures, and vintage printing effects.
* Avoid default purple-to-blue AI gradients.
* Avoid excessive glassmorphism, neon glow, blur, or shadows.
* Avoid excessive rounded cards.
* Use borders, spacing, typography, and background contrast before shadows.
* Do not mix multiple visual styles in one screen.

## Layout

* Maximum content width for reading sections remains 1280px.
* The hero is full width.
* The top three stories use a featured carousel.
* The top three story images should be shallow editorial strips, not large hero images.
* Stories four through ten use a compact editorial list.
* Do not create a uniform three-column card grid for all articles.
* Do not add daily brand/category/search panels for only ten stories.
* Historical search should be designed later as an archive feature, not as daily homepage clutter.
* On mobile, use a single column and preserve category, status, source, saved state, and read state visibility.

## Typography

* Prioritize Traditional Chinese readability.
* Use clear sans-serif text for reading content.
* Display typography may be used for major labels and headings, but must not overpower the news.
* Avoid oversized titles in story content.
* Body line-height should remain between 1.65 and 1.8.
* Do not make body text smaller than 16px.
* Avoid excessively wide text lines.

## Editorial writing

* Explain what a feature enables before naming the technical feature.
* Do not make raw API changelog terms the main explanation.
* Translate jargon into plain Traditional Chinese.
* If an English term is necessary, place it after the plain-language explanation.
* `具體進步` should answer what changed and what can now be done more reliably, faster, or with less manual work.
* `工作影響` should give concrete examples for frontend, UI/UX, web design, or graphic design work.
* Use credible examples, demos, repositories, screenshots, or product pages when available to make the practical change feel concrete.

## Components

### Featured stories

* Use for the top three stories only.
* Emphasize title, summary, importance, status, source, concrete improvement, and work impact.
* Use shallow images that support the story.
* Saved/read controls should sit in a dedicated action row near the story metadata or tags.
* The Source footer should contain only source-related information.

### Standard story row

* Use for stories four through ten.
* Display rank, title, brand, product, date, status, summary, source, saved state, and read state.
* Additional analysis may expand on demand.
* Keep the default state compact.

### Status labels

Use consistent labels:

* released: 已正式上線
* testing: 測試中
* announced: 已預告
* unverified: 尚未證實

Status colors must remain subdued and accessible. Do not use fully saturated badge colors.

### Importance

* High importance must be clear but not alarming.
* Medium and low importance should not compete visually with high importance.
* Do not rely on color alone; include text labels.

## Interaction

* Preserve date switching, carousel navigation, saved stories, and read status.
* Use subtle hover feedback.
* Use visible keyboard focus states.
* Animations should last approximately 150-250ms.
* Do not add decorative entrance animations for every article.
* Do not add fake actions such as placeholder download buttons.

## Images

* Do not add generic AI robot images, glowing brains, circuit heads, or stock humanoid imagery.
* Product screenshots, official interface images, charts, brand assets, or meaningful generated editorial visuals are acceptable.
* Do not use live screenshot services that may show bot checks or Cloudflare challenges.
* If no meaningful image is available, use typography rather than decorative filler.

## Required workflow

Before changing the interface:

1. Read `docs/design-system.md`.
2. Inspect the current page visually when possible.
3. State which existing visual rules will remain.
4. Implement the smallest coherent visual change.
5. Test desktop and mobile layouts where relevant.
6. Check spacing, hierarchy, contrast, focus states, and overflow.
7. Do not replace the established Style D direction without explicit instruction.

## Forbidden patterns

* Purple gradient hero section
* Style A/B/C switch buttons
* Dark-mode button unless explicitly requested again
* Four identical cards per row
* Every section inside a floating rounded rectangle
* Excessive pill-shaped labels
* Random emoji icons
* Generic robot, AI brain, or humanoid AI illustration
* Large decorative statistics without editorial value
* Tiny gray body text
* Center-aligned long-form article content
* Glass panels over decorative gradients
* Fake download CTA
* Daily category/search block for only ten stories
* Community/read-state summary section
* Explanatory prototype copy inside the interface
