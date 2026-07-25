(function (root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
    return;
  }

  root.ArticleNoteLoader = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  async function readJson(url, fetchImpl) {
    try {
      const response = await fetchImpl(url, { cache: "no-store" });
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  }

  async function fetchArticleNote({
    articleId,
    isLocal,
    apiBase,
    staticBase,
    fetchImpl = fetch,
  }) {
    const safeArticleId = String(articleId || "").trim();
    if (!safeArticleId) return null;

    const encodedArticleId = encodeURIComponent(safeArticleId);

    if (isLocal) {
      const apiPayload = await readJson(
        `${apiBase}/${encodedArticleId}`,
        fetchImpl
      );
      if (apiPayload?.note) return apiPayload.note;
    }

    return readJson(
      `${staticBase}/${encodedArticleId}.json`,
      fetchImpl
    );
  }

  return { fetchArticleNote };
});
