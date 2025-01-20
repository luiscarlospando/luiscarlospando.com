// Require dayjs from 'dayjs'
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// Configuration
const BOOKMARKS_API = "/api/getBookmarkedLinks";
const MAX_POSTS = 5;
const ITEMS_PER_PAGE = 10;

// You'll need to replace this with your actual cors.sh API key
const CORS_API_KEY = "your-cors-api-key";

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
    console.log(
      "🔄 Attempting to fetch bookmarked links from serverless function...",
    );

    const response = await fetch(BOOKMARKS_API);
    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("📡 Error response body:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    console.log("✅ Bookmarked links length:", data.length);
    console.log("✅ First 100 characters:", data.substring(0, 100));
    return data;
  } catch (error) {
    console.error("❌ Error fetching bookmarked links:", error);
    console.error("❌ Error details:", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

// Parsing the XML to JavaScript objects
function parseItems(xml) {
  try {
    console.log("🔄 Parsing RSS feed...");
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    // Check for parsing errors
    const parseError = doc.querySelector("parsererror");
    if (parseError) {
      throw new Error("XML parsing failed");
    }

    const items = doc.querySelectorAll("item");
    console.log(`📊 Total items found in XML: ${items.length}`);

    const parsedItems = Array.from(items).map((item) => ({
      title: item.querySelector("title")?.textContent || "",
      link: item.querySelector("link")?.textContent || "",
      date: item.querySelector("pubDate")?.textContent || "",
    }));

    console.log(`📊 Successfully parsed ${parsedItems.length} items`);
    return parsedItems;
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

  console.log(`📊 Rendering ${items.length} bookmarks`);

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

  console.log(`📊 Total items for pagination: ${allItems.length}`);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  console.log(`📊 Displaying items from index ${startIndex} to ${endIndex}`);

  const paginatedItems = allItems.slice(startIndex, endIndex);
  console.log(`📊 Items in current page: ${paginatedItems.length}`);

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

  console.log(`📊 Setting up pagination: ${totalPages} total pages`);

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
      setupPagination();
    }
  });

  document.getElementById("nextPage")?.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPaginatedLinks();
      setupPagination();
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
