// replace with your NewsAPI key - check readme to get api key
const API_KEY = "YOUR_NEWSAPI_KEY";

async function searchNews() {
  const query = document.getElementById("query").value.trim();
  const message = document.getElementById("message");
  const newsContainer = document.getElementById("news");

  if (query === "") {
    alert("Please enter a topic");
    return;
  }

  message.style.display = "none";
  newsContainer.innerHTML = "";

  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No news found</p>";
      return;
    }

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "news-card";

      card.innerHTML = `
        ${article.urlToImage ? `<img src=\"${article.urlToImage}\" />` : ""}
        <h3>${article.title}</h3>
        <p>${article.description || "No description available"}</p>
        <a href=\"${article.url}\" target=\"_blank\">Read more</a>
      `;

      newsContainer.appendChild(card);
    });
  } catch (error) {
    newsContainer.innerHTML = "<p>Error fetching news</p>";
  }
}