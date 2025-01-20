// Require dayjs from 'dayjs'
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// Configuration
const RSS_URL = "https://bg.raindrop.io/rss/public/50598757";
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
const MAX_POSTS = 5;
const ITEMS_PER_PAGE = 10;

let currentPage = 1;
let allItems = [];

// Check if elements exist in the DOM
function checkElements() {
  const bookmarksElement = document.getElementById("bookmarks");
  const linksElement = document.getElementById("links");

  if (bookmarksElement) {
    console.log("✅ #bookmarks si existe en el DOM");
  } else {
    console.log("❌ #bookmarks no existe en el DOM");
  }

  if (linksElement) {
    console.log("✅ #links si existe en el DOM");
  } else {
    console.log("❌ #links no existe en el DOM");
  }

  return {
    hasBookmarks: !!bookmarksElement,
    hasLinks: !!linksElement,
  };
}

// Function to set a loading state
function setLoadingState(isLoading) {
  console.log("🔄 setLoadingState called with isLoading:", isLoading);
  const elements = ["bookmarks", "links"];

  elements.forEach((id) => {
    const element = document.getElementById(id);
    console.log(`🔍 Looking for #${id} element:`, !!element);
    if (element) {
      if (isLoading) {
        console.log(`📝 Setting loading state HTML for #${id}`);
        element.innerHTML = `
          <li class="loading-state">
              <i class="fas fa-spinner fa-spin"></i> Cargando los links...
          </li>`;
      }
    }
  });
}

// Main function for fetching and displaying content
async function displayContent() {
  const { hasBookmarks, hasLinks } = checkElements();

  if (!hasBookmarks && !hasLinks) return;

  console.log("⭐ displayContent started");

  // Show loading state
  setLoadingState(true);

  try {
    console.log("Fetching links...");
    const data = await fetchRSSFeed();
    allItems = parseItems(data);

    if (hasBookmarks) {
      renderBookmarks(allItems.slice(0, MAX_POSTS));
    }

    if (hasLinks) {
      renderPaginatedLinks();
      setupPagination();
    }
  } catch (error) {
    handleError(error);
  }
}

// Get the RSS
async function fetchRSSFeed() {
  try {
    console.log("🔄 Attempting to fetch RSS feed...");
    const response = await fetch(API_URL);
    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ RSS feed fetched successfully", data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching RSS feed:", error);
    throw error;
  }
}

// Parsing the items to JSON format
function parseItems(data) {
  try {
    if (!data.items || !Array.isArray(data.items)) {
      console.error("Invalid data format:", data);
      return [];
    }

    return data.items.map((item) => ({
      title: item.title || "",
      link: item.link || "",
      date: item.pubDate || "",
    }));
  } catch (error) {
    console.error("Error parsing RSS feed:", error);
    return [];
  }
}

// Format date using dayjs
function formatDate(dateString) {
  try {
    const date = dayjs(dateString);
    if (!date.isValid()) {
      console.warn(`Invalid date string: ${dateString}`);
      return "Fecha desconocida";
    }
    return date.format("DD MMM, YYYY").toLowerCase();
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return "Fecha desconocida";
  }
}

// Render recent bookmarks in the DOM
function renderBookmarks(items) {
  const bookmarksList = document.getElementById("bookmarks");
  if (!bookmarksList) return;

  const bookmarksHTML = items
    .map(
      (item) => `
    <li>
      <a class="post-date badge badge-dark" href="${item.link}" target="_blank" rel="noopener noreferrer">
        ${formatDate(item.date)}
      </a>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">
        ${item.title}
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </li>`,
    )
    .join("");

  bookmarksList.innerHTML = bookmarksHTML;
}

// Render paginated links
function renderPaginatedLinks() {
  const linksList = document.getElementById("links");
  if (!linksList) return;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = allItems.slice(startIndex, endIndex);

  const linksHTML = paginatedItems
    .map(
      (item) => `
    <li>
      <a class="post-date badge badge-dark" href="${item.link}" target="_blank" rel="noopener noreferrer">
        ${formatDate(item.date)}
      </a>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">
        ${item.title}
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </li>`,
    )
    .join("");

  linksList.innerHTML = linksHTML;
}

// Setup pagination controls
function setupPagination() {
  const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
  const linksList = document.getElementById("links");
  if (!linksList) return;

  // Remove existing pagination if it exists
  const existingPagination = document.querySelector(".pagination");
  if (existingPagination) {
    existingPagination.remove();
  }

  // Create pagination container
  const paginationContainer = document.createElement("div");
  paginationContainer.className = "pagination";
  paginationContainer.style.textAlign = "center";

  // Add pagination info and controls
  paginationContainer.innerHTML = `
        <hr>
        <div class="pagination-info" style="margin-bottom: 1rem;">
            Página ${currentPage} de ${totalPages}
            (${allItems.length} links en total)
        </div>
        <div class="pagination-controls" style="display: flex; justify-content: center; gap: 0.5rem;">
            <button id="prevPage" class="btn btn-primary" ${currentPage === 1 ? "disabled" : ""}>
                « Anterior
            </button>
            <button id="nextPage" class="btn btn-primary" ${currentPage === totalPages ? "disabled" : ""}>
                Siguiente »
            </button>
        </div>
    `;

  // Insert pagination after the links list
  linksList.parentNode.insertBefore(paginationContainer, linksList.nextSibling);

  // Add event listeners
  document.getElementById("prevPage")?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPaginatedLinks();
      setupPagination(); // This is fine now because we remove the old pagination first
    }
  });

  document.getElementById("nextPage")?.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPaginatedLinks();
      setupPagination(); // This is fine now because we remove the old pagination first
    }
  });
}

// Error handling
function handleError(error) {
  console.error("Error:", error);
  const elements = ["bookmarks", "links"];

  elements.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = `
        <li>
          Lo siento, no se pudieron cargar los links.
          Por favor, intenta recargar la página.
        </li>`;
    }
  });
}

// Initialize main function
document.addEventListener("DOMContentLoaded", displayContent);
