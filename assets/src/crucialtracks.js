// Import and configure dayjs with Spanish (Mexico) locale
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// Config
const TRACKS_API = "/api/getCrucialTracks"; // API endpoint
const ITEMS_PER_PAGE = 10; // items per page for pagination

let currentPage = 1;
let allItems = [];

// Function to extract domain from URL
function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace("www.", "");
  } catch {
    return "link";
  }
}

// Function to get root domain URL
function getRootDomainURL(url) {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}`;
  } catch {
    return url;
  }
}

// Set loading state while fetching
function setLoadingState(isLoading) {
  const element = document.getElementById("tracks");
  if (element && isLoading) {
    element.innerHTML = `
      <li class="loading-state">
        <i class="fas fa-spinner fa-spin"></i> Cargando Crucial Tracks...
      </li>`;
  }
}

// Main function to fetch and display tracks
async function displayTracks() {
  const listContainer = document.getElementById("tracks");
  if (!listContainer) return;

  setLoadingState(true);

  try {
    const data = await fetchTracksJSON();
    allItems = data;

    renderPaginatedTracks();
    setupPagination();
  } catch (error) {
    handleError(error);
  }
}

// Fetch tracks JSON from API
async function fetchTracksJSON() {
  const response = await fetch(TRACKS_API);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

// Format date using dayjs
function formatDate(dateString) {
  const date = dayjs(dateString);
  return date.isValid()
    ? date.format("DD MMM, YYYY").toLowerCase()
    : "unknown date";
}

// Render paginated tracks
function renderPaginatedTracks() {
  const list = document.getElementById("tracks");
  if (!list) return;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const items = allItems.slice(startIndex, endIndex);

  list.innerHTML = items
    .map((item) => {
      const machineDate = dayjs(item.created).format("YYYY-MM-DD");

      // Optional artwork
      const artworkHTML = item.artwork_url
        ? `<img src="${item.artwork_url}" alt="${item.song}" class="track-artwork enlarge-transition rounded img-fluid">`
        : "";

      // Optional audio preview
      const audioHTML = item.preview_url
        ? `<audio controls><source src="${item.preview_url}" type="audio/mp4">Your browser does not support the audio element.</audio>`
        : "";

      return `
        <li class="mb-3">
          <a class="post-date badge badge-dark mb-3" href="${item.link}" target="_blank" rel="noopener">
            <time datetime="${machineDate}">${formatDate(item.created)}</time>
          </a>
          <div class="card">
            <div class="card-body">
              <div class="artwork">
                <a href="${item.link}" target="_blank" rel="noopener">
                  ${artworkHTML}
                </a>
              </div>
              <div class="info">
                <h4>${item.song}</h4>
                <p>${item.artist}</p>
                ${audioHTML}
              </div>
            </div>
          </div>
        </li>`;
    })
    .join("");
}

// Handle page navigation
function handlePageChange(newPage) {
  currentPage = newPage;
  renderPaginatedTracks();
  setupPagination();
  document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth" });
}

// Setup pagination buttons
function setupPagination() {
  const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
  const list = document.getElementById("tracks");
  if (!list) return;

  const existing = document.querySelector(".pagination");
  if (existing) existing.remove();

  const container = document.createElement("div");
  container.className = "pagination";
  container.style.textAlign = "center";

  container.innerHTML = `
    <hr>
    <div class="pagination-info" style="margin-bottom: 1rem;">
      Page ${currentPage} of ${totalPages} (${allItems.length} tracks total)
    </div>
    <div class="pagination-controls" style="display: flex; justify-content: center; gap: 0.5rem;">
      <button id="prevPage" class="btn btn-primary" aria-label="Previous" ${currentPage === 1 ? "disabled" : ""}>« Previous</button>
      <button id="nextPage" class="btn btn-primary" aria-label="Next" ${currentPage === totalPages ? "disabled" : ""}>Next »</button>
    </div>
  `;

  list.parentNode.insertBefore(container, list.nextSibling);

  document.getElementById("prevPage")?.addEventListener("click", () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  });
  document.getElementById("nextPage")?.addEventListener("click", () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  });
}

// Error handling
function handleError(error) {
  console.error("Error:", error);
  const el = document.getElementById("tracks");
  if (el)
    el.innerHTML = `<li>No se pudieron cargar las canciones. Por favor, actualiza la página.</li>`;
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", displayTracks);
