# Article Pagination and Recommendations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a moderate article title, same-day previous/next navigation, and a random five-card image recommendation carousel to `article.html`.

**Architecture:** Keep the static single-file page architecture. Extend the existing UI verification script first, then add CSS and pure JavaScript helpers to render navigation and preload valid recommendation images from available archives.

**Tech Stack:** HTML, CSS, vanilla JavaScript, PowerShell verification, GitHub Pages.

## Global Constraints

- Do not add jQuery, Slick Carousel, or any external dependency.
- Remove `h1 { max-width: 820px; }` directly.
- Use `.detail-title { font-size: clamp(1.4rem, 3vw, 2.25rem); }` on the article page.
- Previous/next navigation stays within the selected date and follows `rank`.
- Recommendations exclude the current article and broken images, contain no duplicate IDs, and show at most five cards.

---

### Task 1: Add failing UI contract checks

**Files:**
- Modify: `tools/verify-ui-behavior.ps1`
- Test: `tools/verify-ui-behavior.ps1`

**Interfaces:**
- Consumes: raw `article.html` text.
- Produces: checks for title width, title size, adjacent navigation, random recommendations, image validation, and scroll-snap carousel markup.

- [ ] **Step 1: Add exact regex checks for every new UI contract.**
- [ ] **Step 2: Run `powershell -ExecutionPolicy Bypass -File tools/verify-ui-behavior.ps1`; expect failures for the missing feature.**
- [ ] **Step 3: Keep the failing checks while implementing Tasks 2 and 3.**

### Task 2: Add layout and responsive carousel styles

**Files:**
- Modify: `article.html`
- Test: `tools/verify-ui-behavior.ps1`

**Interfaces:**
- Consumes: `.article-pagination`, `.recommendation-track`, and `.recommendation-card` markup.
- Produces: centered article visual, moderate title, responsive previous/next controls, and dependency-free scroll snap.

- [ ] **Step 1: Remove the global H1 max-width and set the article title clamp.**
- [ ] **Step 2: Add navigation and carousel CSS including focus states, responsive card widths, reduced motion, and no page overflow.**
- [ ] **Step 3: Run the UI verification script; expect remaining JavaScript checks to fail.**

### Task 3: Render same-day navigation and random valid recommendations

**Files:**
- Modify: `article.html`
- Test: `tools/verify-ui-behavior.ps1`

**Interfaces:**
- Consumes: current `data.items`, `embeddedReports`, archive JSON, `getArticleImageUrl(item)`, and the current article ID.
- Produces: `adjacentArticleMarkup(item)`, `collectRecommendationCandidates(item)`, `shuffleItems(items)`, `loadImage(url)`, `renderRecommendations(item)`, and `initRecommendationCarousel()`.

- [ ] **Step 1: Sort current-day items by rank and render only available adjacent links.**
- [ ] **Step 2: Collect unique archive candidates, shuffle once, preload images, and select the first five successful results.**
- [ ] **Step 3: Render wide image cards and initialize arrow, keyboard, touch, and mouse-drag scrolling.**
- [ ] **Step 4: Run the UI verification script; expect all checks to pass.**

### Task 4: Full verification

**Files:**
- Verify: `article.html`
- Verify: `tools/verify-ui-behavior.ps1`

**Interfaces:**
- Consumes: completed page and checks.
- Produces: evidence that syntax and static contracts pass without regressions.

- [ ] **Step 1: Extract the inline JavaScript and run `node --check`.**
- [ ] **Step 2: Run `powershell -ExecutionPolicy Bypass -File tools/verify-ui-behavior.ps1`.**
- [ ] **Step 3: Run `git diff --check` and inspect the focused diff.**
- [ ] **Step 4: Commit the implementation without altering unrelated files.**

