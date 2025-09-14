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

// Function to clean and truncate Crucial Tracks notes (fallback)
function cleanAndTruncateContent(html, maxLength = 200) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Remove "Listen to ... Apple Music playlist" link
  const links = doc.querySelectorAll("a");
  links.forEach((a) => {
    if (a.textContent.includes("Apple Music playlist")) {
      a.remove();
    }
  });

  // Collect paragraphs after the "question"
  const paragraphs = Array.from(doc.querySelectorAll("p"));
  let foundQuestion = false;
  let cleanedContent = "";

  for (const p of paragraphs) {
    const text = p.textContent.trim();

    if (!foundQuestion) {
      if (text.includes("?")) {
        foundQuestion = true;
      }
      continue;
    }

    cleanedContent += text + " ";
  }

  cleanedContent = cleanedContent.trim();

  if (!cleanedContent) {
    const firstValid = paragraphs.find((p) => p.textContent.trim().length > 0);
    cleanedContent = firstValid ? firstValid.textContent.trim() : "";
  }

  return cleanedContent.length > maxLength
    ? cleanedContent.slice(0, maxLength) + "..."
    : cleanedContent;
}

// Main function to fetch and display tracks
async function displayTracks() {
  const listContainer = document.getElementById("tracks");
  if (!listContainer) return;

  setLoadingState(true);

  try {
    const data = await fetchTracksJSON();
    allItems = data.items; // usar la propiedad "items" del JSON

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
      const details = item._song_details || {};
      const machineDate = dayjs(item.date_published).format("YYYY-MM-DD");

      // Optional artwork
      const artworkHTML = details.artwork_url
        ? `<img src="${details.artwork_url}" data-toggle="tooltip" data-placement="top" alt="${details.song}" title="${details.song}" class="track-artwork rounded mb-4 mb-md-0 img-fluid">`
        : "";

      // Optional audio preview
      const audioHTML = details.preview_url
        ? `<audio controls><source src="${details.preview_url}" type="audio/mp4">Your browser does not support the audio element.</audio>`
        : "";

      // Content: use _song_details.content first, fallback to cleanAndTruncateContent
      const contentHTML =
        details.content || cleanAndTruncateContent(item.content_html, 200);

      return `
        <li class="mb-4">
          <a class="post-date badge badge-dark mb-3" href="${item.url}" target="_blank" rel="noopener">
            <time datetime="${machineDate}">${formatDate(item.date_published)}</time>
          </a>
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-md-4 col-lg-3">
                  <div class="artwork">
                    <a href="${item.url}" target="_blank" rel="noopener">
                      ${artworkHTML}
                    </a>
                  </div>
                </div>
                <div class="col-md-8 col-lg-9">
                  <div class="info">
                    <h2 style="margin: 0 0 0.13em !important;">${details.song || item.title}</h2>
                    <p>${details.artist || ""}</p>
                    ${audioHTML}
                    <p><a href="${item.url}" target="_blank" rel="noopener">Abrir en Crucial Tracks <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8em; margin-left: 0.2em; opacity: 0.7; vertical-align: middle;"></i></a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p>${contentHTML}</p>
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
      Página ${currentPage} de ${totalPages} (${allItems.length} canciones)
    </div>
    <div class="pagination-controls" style="display: flex; justify-content: center; gap: 0.5rem;">
      <button id="prevPage" class="btn btn-primary" aria-label="Anterior" ${currentPage === 1 ? "disabled" : ""}>« Anterior</button>
      <button id="nextPage" class="btn btn-primary" aria-label="Siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente »</button>
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
