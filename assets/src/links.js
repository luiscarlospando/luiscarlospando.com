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

let currentPage = 1;
let allItems = [];

// Function to get page number from URL
function getPageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get("page"), 10);
    return page && page > 0 ? page : 1;
}

// Function to update URL with current page
function updateURL(page) {
    const url = new URL(window.location);
    if (page === 1) {
        url.searchParams.delete("page");
    } else {
        url.searchParams.set("page", page);
    }
    window.history.pushState({ page }, "", url);
}

// Function to extract domain from URL
function extractDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace("www.", ""); // Remove www. prefix
    } catch (error) {
        console.error(`Error extracting domain from URL: ${url}`, error);
        return "enlace";
    }
}

// Function to get root domain URL
function getRootDomainURL(url) {
    try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.hostname}`;
    } catch (error) {
        console.error(`Error getting root domain from URL: ${url}`, error);
        return url; // Fallback to original URL
    }
}

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

    // Get current page from URL
    currentPage = getPageFromURL();

    // Show loading state
    setLoadingState(true);

    try {
        console.log("Fetching links...");
        const data = await fetchBookmarksJSON();
        allItems = data;

        if (hasBookmarks) {
            renderBookmarks(allItems.slice(0, MAX_POSTS)); // MAX_POSTS = 5
        }

        if (hasLinks) {
            // Validate page number after we know total items
            const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
            if (currentPage > totalPages) {
                currentPage = 1;
                updateURL(currentPage);
            }

            renderPaginatedLinks(); // uses ITEMS_PER_PAGE = 10
            setupPagination();
        }
    } catch (error) {
        handleError(error);
    }
}

// Get the JSON
async function fetchBookmarksJSON() {
    try {
        console.log("🔄 Attempting to fetch JSON bookmarks...");
        const response = await fetch(BOOKMARKS_API);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`✅ Bookmarks fetched: ${data.length}`);
        return data;
    } catch (error) {
        console.error("❌ Error fetching JSON bookmarks:", error);
        throw error;
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
        .map((item) => {
            const domain = extractDomain(item.link);
            const rootDomainURL = getRootDomainURL(item.link);
            const machineReadableDate = dayjs(item.created).format(
                "YYYY-MM-DD"
            );

            let noteHTML = "";
            if (item.note && item.note.trim() !== "") {
                noteHTML = `<p><small>${item.note}</small></p>`;
            }

            return `
    <li class="mb-3">
      <a class="post-date badge badge-dark" href="${item.link}" target="_blank" rel="noopener">
        <time datetime="${machineReadableDate}">
          ${formatDate(item.created)}
        </time>
      </a>
      <a href="${item.link}" target="_blank" rel="noopener">
        ${item.title}
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
      <small class="text-muted"><em> vía
        <a href="${rootDomainURL}" target="_blank" rel="noopener" class="text-muted">
          ${domain}
        </a>
      </em></small>
      ${noteHTML}
    </li>`;
        })
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
        .map((item) => {
            const domain = extractDomain(item.link);
            const rootDomainURL = getRootDomainURL(item.link);
            const machineReadableDate = dayjs(item.created).format(
                "YYYY-MM-DD"
            );

            let noteHTML = "";
            if (item.note && item.note.trim() !== "") {
                noteHTML = `<p><small>${item.note}</small></p>`;
            }

            return `
    <li class="mb-3">
      <a class="post-date badge badge-dark" href="${item.link}" target="_blank" rel="noopener">
        <time datetime="${machineReadableDate}">
          ${formatDate(item.created)}
        </time>
      </a>
      <a href="${item.link}" target="_blank" rel="noopener">
        ${item.title}
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
      <small class="text-muted"><em> vía
        <a href="${rootDomainURL}" target="_blank" rel="noopener" class="text-muted">
          ${domain}
        </a>
      </em></small>
      ${noteHTML}
    </li>`;
        })
        .join("");

    linksList.innerHTML = linksHTML;
}

// Handles page changes and scrolls to the top of the list.
function handlePageChange(newPage) {
    currentPage = newPage;
    updateURL(currentPage);
    renderPaginatedLinks();
    setupPagination();
    // Scroll to the top of the #links element smoothly
    document.getElementById("links")?.scrollIntoView({ behavior: "smooth" });
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
            <button id="prevPage" class="btn btn-primary" aria-label="Anterior" ${
                currentPage === 1 ? "disabled" : ""
            }>
                « Anterior
            </button>
            <button id="nextPage" class="btn btn-primary" aria-label="Siguiente" ${
                currentPage === totalPages ? "disabled" : ""
            }>
                Siguiente »
            </button>
        </div>
    `;

    // Insert pagination after the links list
    linksList.parentNode.insertBefore(
        paginationContainer,
        linksList.nextSibling
    );

    // Add event listeners
    document.getElementById("prevPage")?.addEventListener("click", () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    });

    document.getElementById("nextPage")?.addEventListener("click", () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
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

// Handle browser back/forward navigation
window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
        currentPage = event.state.page;
    } else {
        currentPage = getPageFromURL();
    }

    // Only re-render if we have data loaded
    if (allItems.length > 0) {
        renderPaginatedLinks();
        setupPagination();
    }
});

// Initialize main function
document.addEventListener("DOMContentLoaded", displayContent);
