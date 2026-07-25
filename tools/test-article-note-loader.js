const assert = require("node:assert/strict");
const { fetchArticleNote } = require("../assets/article-note-loader.js");

function jsonResponse(ok, payload) {
  return {
    ok,
    async json() {
      return payload;
    },
  };
}

async function testOnlineReadsStaticNote() {
  const requests = [];
  const note = {
    articleId: "story-1",
    contentHtml: "<p>線上可見筆記</p>",
    contentText: "線上可見筆記",
  };

  const result = await fetchArticleNote({
    articleId: "story-1",
    isLocal: false,
    apiBase: "http://127.0.0.1:8792/api/notes",
    staticBase: "data/notes/articles",
    fetchImpl: async (url) => {
      requests.push(url);
      return jsonResponse(true, note);
    },
  });

  assert.deepEqual(result, note);
  assert.deepEqual(requests, ["data/notes/articles/story-1.json"]);
}

async function testLocalPrefersApi() {
  const requests = [];
  const note = {
    articleId: "story-2",
    contentHtml: "<p>本機最新筆記</p>",
    contentText: "本機最新筆記",
  };

  const result = await fetchArticleNote({
    articleId: "story-2",
    isLocal: true,
    apiBase: "http://127.0.0.1:8792/api/notes",
    staticBase: "data/notes/articles",
    fetchImpl: async (url) => {
      requests.push(url);
      return jsonResponse(true, { note });
    },
  });

  assert.deepEqual(result, note);
  assert.deepEqual(requests, ["http://127.0.0.1:8792/api/notes/story-2"]);
}

async function testLocalFallsBackToStaticNote() {
  const requests = [];
  const note = {
    articleId: "story-3",
    contentHtml: "<p>已同步筆記</p>",
    contentText: "已同步筆記",
  };

  const result = await fetchArticleNote({
    articleId: "story-3",
    isLocal: true,
    apiBase: "http://127.0.0.1:8792/api/notes",
    staticBase: "data/notes/articles",
    fetchImpl: async (url) => {
      requests.push(url);
      if (url.startsWith("http://127.0.0.1:8792/")) {
        return jsonResponse(false, {});
      }
      return jsonResponse(true, note);
    },
  });

  assert.deepEqual(result, note);
  assert.deepEqual(requests, [
    "http://127.0.0.1:8792/api/notes/story-3",
    "data/notes/articles/story-3.json",
  ]);
}

async function testMissingStaticNoteReturnsNull() {
  const result = await fetchArticleNote({
    articleId: "missing-story",
    isLocal: false,
    apiBase: "http://127.0.0.1:8792/api/notes",
    staticBase: "data/notes/articles",
    fetchImpl: async () => jsonResponse(false, {}),
  });

  assert.equal(result, null);
}

async function run() {
  await testOnlineReadsStaticNote();
  await testLocalPrefersApi();
  await testLocalFallsBackToStaticNote();
  await testMissingStaticNoteReturnsNull();
  console.log("PASS article note loader");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
