// Configuración
const RSS_URL = "https://bg.raindrop.io/rss/public/50598757";
const CORS_PROXY = "https://api.allorigins.win/raw?url=";
const MAX_POSTS = 5;

// Función principal para obtener y mostrar bookmarks
async function displayBookmarks() {
    try {
        const bookmarks = await fetchRSSFeed();
        const recentBookmarks = parseBookmarks(bookmarks).slice(0, MAX_POSTS);
        renderBookmarks(recentBookmarks);
    } catch (error) {
        handleError(error);
    }
}

// Obtener el feed RSS
async function fetchRSSFeed() {
    const response = await fetch(CORS_PROXY + encodeURIComponent(RSS_URL));
    if (!response.ok) {
        throw new Error("No se pudo obtener el feed RSS.");
    }
    const data = await response.text();
    return data;
}

// Parsear el XML a objetos JavaScript
function parseBookmarks(xml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    const items = doc.querySelectorAll("item");

    return Array.from(items).map((item) => ({
        title: item.querySelector("title")?.textContent || "",
        link: item.querySelector("link")?.textContent || "",
        date: new Date(item.querySelector("pubDate")?.textContent || ""),
        description: item.querySelector("description")?.textContent || "",
    }));
}

// Renderizar los bookmarks en el DOM
function renderBookmarks(bookmarks) {
    const bookmarksList = document.getElementById("bookmarks");

    const bookmarksHTML = bookmarks
        .map(
            (bookmark) => `
    <li class="bookmark">
      <a href="${bookmark.link}" target="_blank" rel="noopener noreferrer">
        ${bookmark.title}
      </a>
      <span class="date">${formatDate(bookmark.date)}</span>
    </li>
  `
        )
        .join("");

    bookmarksList.innerHTML = bookmarksHTML;
}

// Formatear la fecha
function formatDate(date) {
    return new Intl.DateTimeFormat("es", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
}

// Manejar errores
function handleError(error) {
    console.error("Error:", error);
    const bookmarksList = document.getElementById("bookmarks");
    bookmarksList.innerHTML = `
    <li class="error">
      Lo siento, no se pudieron cargar los bookmarks.
      Por favor, intenta más tarde.
    </li>
  `;
}

// Iniciar la aplicación
document.addEventListener("DOMContentLoaded", displayBookmarks);
