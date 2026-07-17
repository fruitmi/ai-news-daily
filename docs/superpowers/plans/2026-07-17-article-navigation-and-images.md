# Article Navigation and Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add first-article scrolling to homepage pagination and Banner navigation, then reliably display centered TOP3 images on article pages.

**Architecture:** Keep behavior inside the existing inline CSS and JavaScript. `index.html` gets one reusable `scrollToFirstArticle()` helper and an accessible Hero button; `article.html` gets deterministic TOP3 image path resolution with a legacy fallback and image-error cleanup.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js syntax/static verification, GitHub Pages.

## Global Constraints

- Preserve the existing Style D visual direction.
- Do not add dependencies, frameworks, or JSON schema fields.
- Use `prefers-reduced-motion` for scrolling and icon animation.
- Missing articles or images must not produce broken controls, empty frames, or console errors.
- Publish the completed work to `origin/main` and verify GitHub Pages.

---

### Task 1: Homepage first-article navigation

**Files:**
- Modify: `index.html`
- Create: `tools/verify-ui-behavior.ps1`

**Interfaces:**
- Produces: `scrollToFirstArticle(): void`, `[data-scroll-to-articles]` button.
- Consumes: the first `.intel-row` created by `renderStories()`.

- [ ] **Step 1: Add failing structural checks**

Create `tools/verify-ui-behavior.ps1` with assertions that `index.html` contains `[data-scroll-to-articles]`, `scrollToFirstArticle`, both pager branches calling the helper, and reduced-motion handling. It must also assert the article-page image rules from Task 2.

- [ ] **Step 2: Run the structural checks and confirm failure**

Run: `powershell -ExecutionPolicy Bypass -File tools/verify-ui-behavior.ps1`

Expected: non-zero exit because the Banner control and scroll helper are absent.

- [ ] **Step 3: Add the Banner control and styles**

Add a button before the Hero section closes:

```html
<button class="hero-scroll-cue" type="button" data-scroll-to-articles aria-label="前往第一篇文章">
  <span aria-hidden="true"></span>
</button>
```

Style it as a centered cyan-outlined circular cue near the Hero bottom. Use a pseudo-element or inner span for the down chevron, a subtle vertical animation, visible `:focus-visible`, and disable the animation inside the existing reduced-motion media query.

- [ ] **Step 4: Add shared scrolling behavior**

Add:

```js
function scrollToFirstArticle() {
  const firstArticle = document.querySelector("[data-intel-list] .intel-row");
  if (!firstArticle) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  firstArticle.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}
```

Use `scroll-margin-top` on `.intel-row` to preserve topbar clearance. Call the helper after `renderStories()` only in previous-page, next-page, and Banner-button branches.

- [ ] **Step 5: Run the structural check**

Run: `powershell -ExecutionPolicy Bypass -File tools/verify-ui-behavior.ps1`

Expected: Task 1 assertions pass; Task 2 assertions may still fail.

---

### Task 2: Article-page TOP3 image resolution and layout

**Files:**
- Modify: `article.html`
- Modify: `tools/verify-ui-behavior.ps1`

**Interfaces:**
- Produces: `getArticleImageUrl(item): string`, `.article-visual` with a maximum width of 1000px.
- Consumes: `item.id`, `item.publishedAt`, and numeric `item.rank`.

- [ ] **Step 1: Replace stale map usage with deterministic resolution**

Keep exact fallback entries only for the three 2026-07-09 legacy filenames. Add:

```js
function getArticleImageUrl(item) {
  const legacyUrl = featuredImages.get(item.id);
  if (legacyUrl) return legacyUrl;
  const rank = Number(item.rank);
  if (!item.publishedAt || rank < 1 || rank > 3) return "";
  return `assets/featured-${item.publishedAt}-${String(rank).padStart(2, "0")}.png`;
}
```

Update `articleVisualMarkup()` to use it. Give the figure `hidden` through an image `error` listener rather than leaving a broken image.

- [ ] **Step 2: Center and constrain the image**

Update `.article-visual` with:

```css
width: min(100%, 1000px);
margin-inline: auto;
aspect-ratio: 1672 / 941;
height: auto;
```

Keep `object-fit: cover`; on mobile, rely on the responsive width instead of restoring a fixed height.

- [ ] **Step 3: Run static and JavaScript checks**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tools/verify-ui-behavior.ps1
```

Extract non-JSON inline scripts from `index.html` and `article.html`, then pipe each to `node --check -`.

Expected: all checks exit 0.

---

### Task 3: Browser verification and publication

**Files:**
- Modify only if verification exposes a scoped defect: `index.html`, `article.html`, `tools/verify-ui-behavior.ps1`

**Interfaces:**
- Consumes: local static server and the completed page behavior.
- Produces: verified Git commit and updated GitHub Pages deployment.

- [ ] **Step 1: Verify desktop and mobile behavior**

Start the static server and check desktop plus mobile widths. Confirm the Banner cue is visible and focusable, the cue scrolls to the first article, both pager controls scroll after rendering, and filtering does not force a scroll.

- [ ] **Step 2: Verify image states**

Open a current TOP3 article and confirm the image is centered and at most 1000px. Open a non-TOP3 article and confirm there is no empty image frame. Confirm an invalid image candidate hides its figure.

- [ ] **Step 3: Commit and push**

Run:

```powershell
git add index.html article.html tools/verify-ui-behavior.ps1 docs/superpowers/plans/2026-07-17-article-navigation-and-images.md
git commit -m "Improve article navigation and images"
git push origin main
```

- [ ] **Step 4: Verify deployment**

Confirm local and remote SHA match, GitHub Pages status is `built`, and the public homepage plus one current TOP3 article return HTTP 200.
