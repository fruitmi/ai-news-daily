const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const notesRoot = path.join(root, "data", "notes");
const articlesRoot = path.join(notesRoot, "articles");
const indexPath = path.join(notesRoot, "index.json");
const host = "127.0.0.1";
const port = Number(process.env.NOTES_PORT || 8792);

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  response.end(JSON.stringify(payload, null, 2));
}

function cleanArticleId(value) {
  if (!/^[a-zA-Z0-9._-]+$/.test(value || "")) {
    throw new Error("Invalid article id");
  }
  return value;
}

function stripUnsafeHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
    .replace(/javascript:/gi, "");
}

function textFromHtml(value) {
  return stripUnsafeHtml(value)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function ensureNotesFiles() {
  await fs.mkdir(articlesRoot, { recursive: true });
  try {
    await fs.access(indexPath);
  } catch {
    await fs.writeFile(indexPath, JSON.stringify({ notes: [] }, null, 2), "utf8");
  }
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function updateIndex(note) {
  const index = await readJson(indexPath, { notes: [] });
  const notes = Array.isArray(index.notes) ? index.notes : [];
  const excerpt = note.contentText.slice(0, 120);
  const item = {
    articleId: note.articleId,
    date: note.date,
    title: note.title,
    path: `data/notes/articles/${note.articleId}.json`,
    updatedAt: note.updatedAt,
    excerpt
  };
  const next = [item, ...notes.filter((entry) => entry.articleId !== note.articleId)]
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
  await fs.writeFile(indexPath, JSON.stringify({ notes: next }, null, 2), "utf8");
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function handleRequest(request, response) {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  const url = new URL(request.url, `http://${host}:${port}`);
  const match = url.pathname.match(/^\/api\/notes\/([^/]+)$/);

  if (!match) {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  await ensureNotesFiles();
  const articleId = cleanArticleId(decodeURIComponent(match[1]));
  const notePath = path.join(articlesRoot, `${articleId}.json`);

  if (request.method === "GET") {
    const note = await readJson(notePath, null);
    sendJson(response, 200, { note });
    return;
  }

  if (request.method === "POST") {
    const payload = JSON.parse(await readBody(request) || "{}");
    const contentHtml = stripUnsafeHtml(payload.contentHtml);
    const contentText = textFromHtml(contentHtml);
    const note = {
      articleId,
      date: String(payload.date || ""),
      title: String(payload.title || ""),
      updatedAt: new Date().toISOString(),
      contentHtml,
      contentText,
      tags: Array.isArray(payload.tags) ? payload.tags.map(String) : [],
      references: Array.isArray(payload.references) ? payload.references : []
    };

    await fs.writeFile(notePath, JSON.stringify(note, null, 2), "utf8");
    await updateIndex(note);
    sendJson(response, 200, { ok: true, note });
    return;
  }

  sendJson(response, 405, { error: "Method not allowed" });
}

const server = http.createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    sendJson(response, 500, { error: error.message || "Server error" });
  });
});

server.listen(port, host, () => {
  console.log(`AI news notes server running at http://${host}:${port}`);
});
