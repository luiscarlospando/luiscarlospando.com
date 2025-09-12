// Import and configure dayjs with Spanish (Mexico) locale
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// Config
const TRACKS_API = "/api/getCrucialTracks";
const MAX_POSTS = 5; // latest tracks
const ITEMS_PER_PAGE = 10; // pagination limit

let currentPage = 1;
let allItems = [];

// Extract domain from URL
function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace("www.", "");
  } catch {
    return "link";
  }
}

// Get root domain URL
function getRootDomainURL(url) {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}`;
  } catch {
    return url;
  }
}

// Show loading state
function setLoadingState(isLoading) {
  ["tracks", "latest-tracks"].forEach((id) => {
    const element = document.getElementById(id);
    if (element && isLoading) {
      element.innerHTML = `
        <li class="loading-state">
          <i class="fas fa-spinner fa-spin"></i> Loading tracks...
        </li>`;
    }
  });
}

// Main function
async function displayTracks() {
  const hasTracks = document.getElementById("tracks");
  const hasLatest = document.getElementById("latest-tracks");

  if (!hasTracks && !hasLatest) return;

  setLoadingState(true);

  try {
    const data = await fetchTracksJSON();
    allItems = data;

    if (hasLatest) renderLatestTracks(allItems.slice(0, MAX_POSTS));
    if (hasTracks) {
      renderPaginatedTracks();
      setupPagination();
    }
  } catch (error) {
    handleError(error);
  }
}

// Fetch JSON from API
async function fetchTracksJSON() {
  const response = await fetch(TRACKS_API);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

// Format date
function formatDate(dateString) {
  const date = dayjs(dateString);
  return date.isValid()
    ? date.format("DD MMM, YYYY").toLowerCase()
    : "unknown date";
}

// Render latest tracks
function renderLatestTracks(items) {
  const list = document.getElementById("latest-tracks");
  if (!list) return;

  list.innerHTML = items
    .map((item) => {
      const domain = extractDomain(item.link);
      const rootDomainURL = getRootDomainURL(item.link);
      const machineDate = dayjs(item.created).format("YYYY-MM-DD");

      // Optional artwork / audio preview
      const artworkHTML = item.artwork_url
        ? `<img src="${item.artwork_url}" alt="${item.song}" class="track-artwork mb-2" style="width:60px; height:60px; object-fit:cover;">`
        : "";
      const audioHTML = item.preview_url
        ? `<audio controls><source src="${item.preview_url}" type="audio/mp4">Your browser does not support the audio element.</audio>`
        : "";

      return `
        <li class="mb-3">
          <a class="post-date badge badge-dark" href="${item.link}" target="_blank" rel="noopener">
            <time datetime="${machineDate}">${formatDate(item.created)}</time>
          </a>
          <a href="${item.link}" target="_blank" rel="noopener">
            ${item.title} <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          ${artworkHTML}
          ${audioHTML}
          <small class="text-muted"><em> by ${item.artist}</em></small>
          ${item.note ? `<div class="track-note">${item.note}</div>` : ""}
        </li>`;
    })
    .join("");
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
      const domain = extractDomain(item.link);
      const rootDomainURL = getRootDomainURL(item.link);
      const machineDate = dayjs(item.created).format("YYYY-MM-DD");
      const artworkHTML = item.artwork_url
        ? `<img src="${item.artwork_url}" alt="${item.song}" class="track-artwork mb-2" style="width:60px; height:60px; object-fit:cover;">`
        : "";
      const audioHTML = item.preview_url
        ? `<audio controls><source src="${item.preview_url}" type="audio/mp4">Your browser does not support the audio element.</audio>`
        : "";

      return `
        <li class="mb-3">
          <a class="post-date badge badge-dark" href="${item.link}" target="_blank" rel="noopener">
            <time datetime="${machineDate}">${formatDate(item.created)}</time>
          </a>
          <a href="${item.link}" target="_blank" rel="noopener">
            ${item.title} <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          ${artworkHTML}
          ${audioHTML}
          <small class="text-muted"><em> by ${item.artist}</em></small>
          ${item.note ? `<div class="track-note">${item.note}</div>` : ""}
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

// Setup pagination controls
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

// Handle errors
function handleError(error) {
  console.error("Error:", error);
  ["tracks", "latest-tracks"].forEach((id) => {
    const el = document.getElementById(id);
    if (el)
      el.innerHTML = `<li>Sorry, tracks could not be loaded. Please refresh the page.</li>`;
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", displayTracks);
