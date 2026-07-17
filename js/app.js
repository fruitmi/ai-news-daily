const newsList = document.querySelector("#news-list");
const issueDate = document.querySelector("#issue-date");

function renderEmptyState() {
  newsList.innerHTML = `
    <article class="news-card">
      <span class="news-meta">No data</span>
      <h3>尚未建立今日新聞資料</h3>
      <p>請更新 data/latest.json 後重新整理頁面。</p>
    </article>
  `;
}

function renderNews(data) {
  issueDate.textContent = data.date || "Latest";

  if (!Array.isArray(data.items) || data.items.length === 0) {
    renderEmptyState();
    return;
  }

  newsList.innerHTML = data.items
    .map(
      (item) => `
        <article class="news-card">
          <span class="news-meta">${item.source || "AI News"}</span>
          <h3>${item.title || "Untitled"}</h3>
          <p>${item.summary || ""}</p>
        </article>
      `
    )
    .join("");
}

fetch("data/latest.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not load latest news data.");
    }

    return response.json();
  })
  .then(renderNews)
  .catch(() => {
    issueDate.textContent = "Draft";
    renderEmptyState();
  });
