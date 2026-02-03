// Links

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
let activeTag = null; // Tracks the currently selected tag (null = all)
let filteredItems = []; // Holds the items after tag filtering

// ─── URL Helpers ────────────────────────────────────────────────────────────

// Function to get page number from URL
function getPageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get("page"), 10);
    return page && page > 0 ? page : 1;
}

// Function to get tag from URL
function getTagFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("tag") || null;
}

// Function to update URL with current page and tag
function updateURL(page, tag) {
    const url = new URL(window.location);

    // Page param
    if (page === 1) {
        url.searchParams.delete("page");
    } else {
        url.searchParams.set("page", page);
    }

    // Tag param
    if (tag) {
        url.searchParams.set("tag", tag);
    } else {
        url.searchParams.delete("tag");
    }

    window.history.pushState({ page, tag }, "", url);
}

// ─── URL Extraction ─────────────────────────────────────────────────────────

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

// ─── DOM Checks & Loading ───────────────────────────────────────────────────

// Check if elements exist in the DOM
function checkElements() {
    const bookmarksElement = document.getElementById("bookmarks");
    const linksElement = document.getElementById("links");

    if (bookmarksElement) {
        console.log("✅ #bookmarks exists in DOM");
    } else {
        console.log("❌ #bookmarks does not exist in DOM");
    }

    if (linksElement) {
        console.log("✅ #links exists in DOM");
    } else {
        console.log("❌ #links does not exist in DOM");
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

// ─── Fetch ──────────────────────────────────────────────────────────────────

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

// ─── Tag Helpers ─────────────────────────────────────────────────────────────

// Extract all unique tags from the full dataset, sorted alphabetically.
// Items without a `tags` array (or with an empty one) are simply skipped.
function extractAllTags(items) {
    const tagSet = new Set();
    items.forEach((item) => {
        if (Array.isArray(item.tags)) {
            item.tags.forEach((tag) => {
                if (tag && tag.trim() !== "") {
                    tagSet.add(tag.trim());
                }
            });
        }
    });
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}

// Return items that match the active tag; if no tag is selected return everything.
function getFilteredItems() {
    if (!activeTag) return allItems;
    return allItems.filter(
        (item) => Array.isArray(item.tags) && item.tags.includes(activeTag)
    );
}

// ─── Tag UI ──────────────────────────────────────────────────────────────────

// Render the tag filter bar.
// Looks for a container with id="tag-filters".
// If it doesn't exist yet it is created and injected right before #links.
function renderTagFilters() {
    const tags = extractAllTags(allItems);

    // If there are no tags at all, don't render anything
    if (tags.length === 0) {
        console.log("📌 No tags found – tag filter bar will not be rendered.");
        return;
    }

    const linksElement = document.getElementById("links");
    if (!linksElement) return;

    // Re-use or create the container
    let container = document.getElementById("tag-filters");
    if (!container) {
        container = document.createElement("div");
        container.id = "tag-filters";
        // Insert the bar right before the <ul id="links">
        linksElement.parentNode.insertBefore(container, linksElement);
    }

    // "Todos" is active when no tag is selected
    const allActiveClass = !activeTag ? " active" : "";

    const tagButtons = tags
        .map((tag) => {
            const isActive = activeTag === tag ? " active" : "";
            return `<button
                class="badge badge-custom${isActive}"
                data-tag="${tag}"
                aria-pressed="${activeTag === tag}"
            >${tag}</button>`;
        })
        .join("");

    container.innerHTML = `
        <div class="d-flex flex-wrap align-items-center mb-3" style="gap: 0.5rem;">
            <button
                class="badge badge-custom${allActiveClass}"
                data-tag=""
                aria-pressed="${!activeTag}"
            >Todos</button>
            ${tagButtons}
        </div>`;

    // Single delegated listener on the container so we don't stack listeners
    // on every re-render.  Remove any previous one first.
    const freshContainer = document.getElementById("tag-filters");
    const clone = freshContainer.cloneNode(true);
    freshContainer.parentNode.replaceChild(clone, freshContainer);

    clone.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-tag]");
        if (!btn) return;

        const tag = btn.dataset.tag || null; // empty string → null (= "Todos")

        // If the user clicked the already-active tag, do nothing
        if (tag === activeTag) return;

        activeTag = tag;
        currentPage = 1; // Reset to page 1 whenever the filter changes

        // Rebuild filtered set, re-render everything
        filteredItems = getFilteredItems();
        updateURL(currentPage, activeTag);
        renderTagFilters();
        renderPaginatedLinks();
        setupPagination();
    });

    console.log(
        `📌 Tag filter bar rendered with ${tags.length} tags. Active: "${activeTag || "Todos"}"`
    );
}

// ─── Date Formatting ────────────────────────────────────────────────────────

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

// ─── Rendering ──────────────────────────────────────────────────────────────

// Shared helper – builds the <li> HTML for a single bookmark item.
// Extracted to avoid duplicating the template in renderBookmarks & renderPaginatedLinks.
function renderItemHTML(item) {
    const domain = extractDomain(item.link);
    const rootDomainURL = getRootDomainURL(item.link);
    const machineReadableDate = dayjs(item.created).format("YYYY-MM-DD");

    let noteHTML = "";
    if (item.note && item.note.trim() !== "") {
        noteHTML = `<p><small>${item.note}</small></p>`;
    }

    return `
    <li class="mb-3">
      <div class="li-content">
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
      </div>
    </li>`;
}

// Render recent bookmarks in the DOM (sidebar / homepage widget).
// These are always the first MAX_POSTS items from the FULL list –
// tag filtering intentionally does NOT apply here.
function renderBookmarks(items) {
    const bookmarksList = document.getElementById("bookmarks");
    if (!bookmarksList) return;

    console.log(`📊 Rendering ${items.length} bookmarks`);
    bookmarksList.innerHTML = items.map(renderItemHTML).join("");
}

// Render the paginated links list, using filteredItems (which respects the active tag).
function renderPaginatedLinks() {
    const linksList = document.getElementById("links");
    if (!linksList) return;

    console.log(`📊 Total items for pagination: ${filteredItems.length}`);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    console.log(`📊 Displaying items from index ${startIndex} to ${endIndex}`);

    const paginatedItems = filteredItems.slice(startIndex, endIndex);
    console.log(`📊 Items in current page: ${paginatedItems.length}`);

    if (paginatedItems.length === 0) {
        linksList.innerHTML = `
            <li class="text-muted">
                No se encontraron links con la etiqueta "<strong>${activeTag}</strong>".
            </li>`;
        return;
    }

    linksList.innerHTML = paginatedItems.map(renderItemHTML).join("");
}

// ─── Pagination ─────────────────────────────────────────────────────────────

// Handles page changes and scrolls to the top of the list.
function handlePageChange(newPage) {
    currentPage = newPage;
    updateURL(currentPage, activeTag);
    renderPaginatedLinks();
    setupPagination();
    // Scroll to the top of the #links element smoothly
    document.getElementById("links")?.scrollIntoView({ behavior: "smooth" });
}

// Setup pagination controls – now paginates over filteredItems.
function setupPagination() {
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const linksList = document.getElementById("links");
    if (!linksList) return;

    console.log(`📊 Setting up pagination: ${totalPages} total pages`);

    // Remove existing pagination if it exists
    const existingPagination = document.querySelector(".pagination");
    if (existingPagination) {
        existingPagination.remove();
    }

    // Don't render pagination controls when everything fits on one page
    if (totalPages <= 1) return;

    // Create pagination container
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination";
    paginationContainer.style.textAlign = "center";

    // Add pagination info and controls
    paginationContainer.innerHTML = `
        <hr>
        <div class="pagination-info" style="margin-bottom: 1rem;">
            Página ${currentPage} de ${totalPages}
            (${filteredItems.length} links en total)
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

// ─── Error Handling ─────────────────────────────────────────────────────────

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

// ─── Main ────────────────────────────────────────────────────────────────────

// Main function for fetching and displaying content
async function displayContent() {
    const { hasBookmarks, hasLinks } = checkElements();

    if (!hasBookmarks && !hasLinks) return;

    console.log("⭐ displayContent started");

    // Restore page and tag from URL (supports bookmarked / shared URLs)
    currentPage = getPageFromURL();
    activeTag = getTagFromURL();

    // Show loading state
    setLoadingState(true);

    try {
        console.log("Fetching links...");
        const data = await fetchBookmarksJSON();
        allItems = data;

        // Bookmarks widget: always shows the first MAX_POSTS from the full list
        if (hasBookmarks) {
            renderBookmarks(allItems.slice(0, MAX_POSTS));
        }

        if (hasLinks) {
            // Build the filtered set based on the active tag
            filteredItems = getFilteredItems();

            // Validate page number against the filtered total
            const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
            if (currentPage > totalPages) {
                currentPage = 1;
                updateURL(currentPage, activeTag);
            }

            // Render tag bar (only on the links page)
            renderTagFilters();

            renderPaginatedLinks();
            setupPagination();
        }
    } catch (error) {
        handleError(error);
    }
}

// ─── Browser Navigation ─────────────────────────────────────────────────────

// Handle browser back/forward navigation
window.addEventListener("popstate", (event) => {
    if (event.state) {
        currentPage = event.state.page || 1;
        activeTag = event.state.tag || null;
    } else {
        currentPage = getPageFromURL();
        activeTag = getTagFromURL();
    }

    // Only re-render if we have data loaded
    if (allItems.length > 0) {
        filteredItems = getFilteredItems();
        renderTagFilters();
        renderPaginatedLinks();
        setupPagination();
    }
});

// ─── Init ────────────────────────────────────────────────────────────────────

// Initialize main function
document.addEventListener("DOMContentLoaded", () => {
    // Only run if at least one of the containers exists
    const bookmarksElement = document.getElementById("bookmarks");
    const linksElement = document.getElementById("links");

    if (bookmarksElement || linksElement) {
        displayContent();
    }
});
