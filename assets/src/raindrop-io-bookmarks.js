// Require dayjs from 'dayjs'
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// Configuration
const RSS_URL = "https://bg.raindrop.io/rss/public/50598757";
const CORS_PROXY = "https://api.allorigins.win/raw?url=";
const MAX_POSTS = 5;

// Check if #bookmarks exists in the DOM
function checkBookmarksElement() {
    const bookmarksElement = document.getElementById("bookmarks");
    if (bookmarksElement) {
        console.log("✅ #bookmarks si existe en el DOM");
        return true;
    } else {
        console.log("❌ #bookmarks no existe en el DOM");
        return false;
    }
}

// Main function for fetching and displaying bookmarks
async function displayBookmarks() {
    // Check if element exists before proceding
    if (!checkBookmarksElement()) return;

    try {
        const bookmarks = await fetchRSSFeed();
        const recentBookmarks = parseBookmarks(bookmarks).slice(0, MAX_POSTS);
        renderBookmarks(recentBookmarks);
    } catch (error) {
        handleError(error);
    }
}

// Get the RSS
async function fetchRSSFeed() {
    const response = await fetch(CORS_PROXY + encodeURIComponent(RSS_URL));
    if (!response.ok) {
        throw new Error("No se pudo obtener el feed RSS");
    }
    const data = await response.text();
    return data;
}

// Parsing the XML to JavaScript objects
function parseBookmarks(xml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    const items = doc.querySelectorAll("item");

    return Array.from(items).map((item) => ({
        title: item.querySelector("title")?.textContent || "",
        link: item.querySelector("link")?.textContent || "",
    }));
}

// Render bookmarks in the DOM
function renderBookmarks(bookmarks) {
    const bookmarksList = document.getElementById("bookmarks");
    if (!bookmarksList) return;

    const bookmarksHTML = bookmarks
        .map((bookmark) => {
            // Format date using dayjs
            const bookmarkDate = dayjs(bookmark.date).format("D MMM, YYYY");

            return `
                <li>
                    <a class="link-date badge badge-dark" href="${bookmark.link}" target="_blank" rel="noopener noreferrer">${bookmarkDate}</a> - <a href="${bookmark.link}" target="_blank" rel="noopener noreferrer">
                        ${bookmark.title}
                    </a>
                </li>`;
        })
        .join("");

    bookmarksList.innerHTML = bookmarksHTML;
}

// Error handling
function handleError(error) {
    console.error("Error:", error);
    const bookmarksList = document.getElementById("bookmarks");
    if (!bookmarksList) return;

    bookmarksList.innerHTML = `
    <li>
      Lo siento, no se pudieron cargar los bookmarks.
      Por favor, intenta más tarde.
    </li>`;
}

// Initialize main function
document.addEventListener("DOMContentLoaded", displayBookmarks);
