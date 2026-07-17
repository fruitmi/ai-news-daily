# AI Daily News Design System

## Current Direction

AI Daily News currently follows the Style D homepage direction:

- dark retro-futuristic information cockpit
- editorial AI news reading surface
- centered first-screen hero with a 3D scene used as background
- concise daily brief for frontend, UI/UX, and design workers

The interface should feel like an AI information deck, not a SaaS dashboard, marketing landing page, or game store page.

## First Screen

- The hero is full width and must not be constrained by `.shell`.
- The 3D scene sits behind the content as a background layer.
- The foreground copy is centered.
- The title is `AI 情報資訊艙`.
- The summary is short: `今日整理最近 24小時內值得追蹤的 AI 更新。`
- Date switching belongs in the foreground date panel.
- Do not add hero CTA buttons, decorative metrics, trend panels, or dashboard statistics.

## News Layout

- The top three stories use the featured carousel.
- Featured story images should be wide and shallow, closer to an editorial strip than a large hero image.
- The remaining seven stories use compact rows.
- Do not make all ten stories identical cards.
- Do not add separate brand/category/search panels for the daily ten-story view.
- Archive search can be added later as a dedicated historical reading feature, not as clutter on the daily homepage.

## Editorial Writing

- Explain the practical meaning before naming technical features.
- Do not write API changelog terms as the main sentence when a reader may not understand them.
- Prefer `這讓你可以...` over raw feature lists.
- English terms are allowed only when useful, and should come after the plain-language explanation.
- Every `具體進步` should answer: what changed, and what can now be done more reliably or faster.
- Every `工作影響` should give concrete frontend, UI/UX, web design, or graphic design examples.
- When credible examples, demos, repositories, screenshots, or product pages exist, use them to make the reader feel the practical change.

## Visual Principles

- Use a dark neutral base with cyan as the main accent and restrained red as a secondary accent.
- Avoid warm yellow, beige, brown, paper textures, and vintage effects.
- Avoid default purple-blue AI gradients.
- Avoid excessive glow, blur, glassmorphism, and shadows.
- Use angular clipped edges sparingly for the current cockpit style.
- Keep body text readable and never smaller than 16px.
- Avoid oversized headings inside content sections.

## Images

- Do not use generic AI robots, glowing brains, humanoid heads, or stock AI illustrations.
- For featured stories, use meaningful generated or sourced visuals related to the story topic.
- Avoid live website screenshot services that may show bot checks or Cloudflare challenges.
- Images should support scanning; they should not overpower titles, summaries, and analysis.

## Interaction

- Preserve date switching, carousel navigation, saved state, and read state.
- Featured images and detail links open `article.html` as a separate story page.
- Saved/read controls for featured stories belong near story metadata or tags, not inside the Source footer.
- Source footers should contain only source-related information.
- Use subtle hover and visible keyboard focus states.
- Do not add fake download CTAs or placeholder actions that do nothing useful.

## Removed Patterns

The current homepage should not include:

- Style A/B/C switch buttons
- dark-mode toggle
- hero CTA buttons
- decorative metrics
- daily trend summary panel
- standalone category/search block for only ten daily stories
- community/read-state summary section
- explanatory prototype copy inside sections
