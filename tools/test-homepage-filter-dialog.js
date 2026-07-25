const assert = require("node:assert/strict");
const fsSync = require("node:fs");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const projectRoot = path.resolve(__dirname, "..");
const chromeExecutable = process.env.PLAYWRIGHT_CHROME_PATH || [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].find((candidate) => fsSync.existsSync(candidate));
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
};

function startStaticServer() {
  const server = http.createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const filePath = path.resolve(projectRoot, relativePath);

    if (!filePath.startsWith(projectRoot + path.sep)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    try {
      const content = await fs.readFile(filePath);
      response.writeHead(200, {
        "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream",
      });
      response.end(content);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function run() {
  const server = await startStaticServer();
  const address = server.address();
  let browser;
  let page;
  const pageErrors = [];

  try {
    console.log("STEP launch browser");
    browser = await chromium.launch({
      ...(chromeExecutable ? { executablePath: chromeExecutable } : {}),
      headless: true,
    });
    page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.route("https://unpkg.com/**", (route) => route.abort());
    await page.goto(`http://127.0.0.1:${address.port}/index.html`, {
      waitUntil: "domcontentloaded",
    });
    console.log("STEP wait for articles");
    await page.waitForSelector("[data-intel-list] .intel-row");

    console.log("STEP verify compact header");
    assert.equal(await page.title(), "AI 情報資訊艙");
    assert.equal(await page.locator(".site-name").textContent(), "AI 情報資訊艙");
    assert.equal(await page.locator(".hero").count(), 0);
    assert.equal(await page.locator(".brand-sigil [aria-label='3D neon information scene']").count(), 1);
    assert.equal((await page.locator(".brand-sigil").textContent()).trim(), "");

    const filterTrigger = page.locator("[data-open-filters]");
    await filterTrigger.click();
    await page.locator("[data-filter-modal]:not([hidden])").waitFor();

    console.log("STEP verify complete dialog");
    for (const selector of [
      "[data-search-filter]",
      "[data-date-filter]",
      "[data-brand-filter]",
      "[data-category-filter]",
      "[data-status-filter]",
      "[data-importance-filter]",
    ]) {
      assert.equal(await page.locator(selector).count(), 1, `Missing filter field: ${selector}`);
    }

    const initialTitles = await page.locator("[data-intel-list] .intel-row h3").allTextContents();
    await page.locator("[data-search-filter]").fill("Claude");
    await page.waitForTimeout(100);
    assert.deepEqual(
      await page.locator("[data-intel-list] .intel-row h3").allTextContents(),
      initialTitles,
      "Typing in the dialog must not update the article list"
    );

    console.log("STEP apply draft filters");
    await page.locator("[data-apply-filters]").click();
    await page.waitForFunction(
      (titles) => {
        const current = Array.from(document.querySelectorAll("[data-intel-list] .intel-row h3"))
          .map((element) => element.textContent);
        return JSON.stringify(current) !== JSON.stringify(titles);
      },
      initialTitles
    );
    const filteredTitles = await page.locator("[data-intel-list] .intel-row h3").allTextContents();

    console.log("STEP discard unapplied filters");
    await filterTrigger.click();
    await page.locator("[data-search-filter]").fill("OpenAI");
    await page.locator("[data-close-filters]").first().click();
    assert.deepEqual(
      await page.locator("[data-intel-list] .intel-row h3").allTextContents(),
      filteredTitles,
      "Closing the dialog must discard unapplied filters"
    );

    console.log("STEP clear then apply filters");
    await filterTrigger.click();
    assert.equal(await page.locator("[data-search-filter]").inputValue(), "Claude");
    await page.locator("[data-reset-filters]").click();
    assert.deepEqual(
      await page.locator("[data-intel-list] .intel-row h3").allTextContents(),
      filteredTitles,
      "Clearing draft filters must not update the list before apply"
    );
    await page.locator("[data-apply-filters]").click();
    assert.deepEqual(
      await page.locator("[data-intel-list] .intel-row h3").allTextContents(),
      initialTitles,
      "Applying cleared filters must restore the unfiltered list"
    );

    if (process.env.UI_SCREENSHOT_DIR) {
      await fs.mkdir(process.env.UI_SCREENSHOT_DIR, { recursive: true });
      await page.screenshot({
        path: path.join(process.env.UI_SCREENSHOT_DIR, "homepage-desktop.png"),
        fullPage: true,
      });
    }

    console.log("STEP verify mobile layout");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-intel-list] .intel-row");
    const mobileMetrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      triggerRight: document.querySelector("[data-open-filters]").getBoundingClientRect().right,
    }));
    assert.ok(mobileMetrics.scrollWidth <= mobileMetrics.viewportWidth);
    assert.ok(mobileMetrics.triggerRight <= mobileMetrics.viewportWidth);

    await page.locator("[data-open-filters]").click();
    const dialogBox = await page.locator(".filter-dialog").boundingBox();
    assert.ok(dialogBox);
    assert.ok(dialogBox.x >= 0);
    assert.ok(dialogBox.x + dialogBox.width <= 390);
    assert.ok(dialogBox.y + dialogBox.height <= 844);

    if (process.env.UI_SCREENSHOT_DIR) {
      await page.screenshot({
        path: path.join(process.env.UI_SCREENSHOT_DIR, "homepage-mobile-filter.png"),
        fullPage: true,
      });
    }

    assert.deepEqual(pageErrors, [], "Homepage must not produce uncaught JavaScript errors");
    console.log("PASS homepage filter dialog");
  } finally {
    if (page) await page.close();
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
