// Display Statuslog entries with pagination

const dayjs = require("dayjs");
const locale_es_mx = require("dayjs/locale/es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.locale("es-mx");
dayjs.extend(relativeTime);

// Config
const ITEMS_PER_PAGE = 10;
const OMG_ADDRESS = "mijo";

// fluentui-emoji-unicode by shuding — organizes Fluent emojis by unicode codepoint
// URL format: /assets/{codepoints}_3d.png (e.g. 1f44b_3d.png)
// Repo: https://github.com/shuding/fluentui-emoji-unicode
const FLUENT_CDN =
    "https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets";

let currentPage = 1;
let allStatuses = [];

// URL helpers
function getPageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get("page"), 10);
    return page && page > 0 ? page : 1;
}

function updateURL(page) {
    const url = new URL(window.location);
    if (page === 1) {
        url.searchParams.delete("page");
    } else {
        url.searchParams.set("page", page);
    }
    window.history.pushState({ page }, "", url);
}

// Date formatting
function formatStatusDate(unixTimestamp) {
    const date = dayjs.unix(unixTimestamp);
    const relative = dayjs().to(date);
    const isoString = date.toISOString();

    return { relative, isoString };
}

// Render

// Converts an emoji to its hex codepoints joined by hyphens (e.g. "😄" → "1f604")
// Strips variation selectors (fe0f) that aren't part of the filename
function emojiToCodepoints(emoji) {
    return [...emoji]
        .map((char) => char.codePointAt(0).toString(16))
        .filter((cp) => cp !== "fe0f")
        .join("-");
}

// Builds a Fluent 3D emoji <img> using fluentui-emoji-unicode + jsDelivr
// No Node.js dependencies — works entirely in the browser
function buildEmojiImg(emoji) {
    if (!emoji) return "";

    const codepoints = emojiToCodepoints(emoji);
    const src = `${FLUENT_CDN}/${codepoints}_3d.png`;

    // Fallback to plain text emoji if the image fails to load
    return `<img
        src="${src}"
        onerror="this.replaceWith(document.createTextNode('${emoji}'))"
        alt="${emoji}"
        style="width:60px; height:60px; object-fit:contain;"
        loading="lazy">`;
}

function renderPaginatedStatuses() {
    const list = document.getElementById("status-list");
    if (!list) return;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const statuses = allStatuses.slice(startIndex, endIndex);

    list.innerHTML = statuses
        .map((status) => {
            const { relative, isoString } = formatStatusDate(status.created);
            const emojiImg = buildEmojiImg(status.emoji);
            const statusURL = `https://${OMG_ADDRESS}.status.lol/${status.id}`;
            // Make URLs in content clickable
            const linkedContent = (status.content || "").replace(
                /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
                '<a href="$1" target="_blank" rel="noopener">$1</a>'
            );
            const replyLink = status.external_url
                ? ` · <a href="${status.external_url}" rel="me noreferrer noopener" target="_blank"><em><i class="fa-solid fa-reply"></i> Responder</em></a>`
                : "";

            return `
                <li class="mb-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-3 col-md-2 text-center">
                                    <h1 class="mb-0">
                                        ${emojiImg}
                                    </h1>
                                </div>
                                <div class="col-9 col-md-10">
                                    <div class="status-content">
                                        <div class="status-header mb-2">
                                            <strong>
                                                <a href="${statusURL}" rel="me noreferrer noopener" target="_blank">@${OMG_ADDRESS}</a>
                                            </strong>
                                        </div>
                                        <div class="status-text mb-2">
                                            <p style="white-space: pre-wrap; margin: 0;">${linkedContent}</p>
                                        </div>
                                        <div class="status-footer">
                                            <small class="text-muted">
                                                <time datetime="${isoString}"><em><i class="fa-solid fa-clock"></i> ${relative}</em></time>${replyLink}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>`;
        })
        .join("");
}

// Pagination
function handlePageChange(newPage) {
    const totalPages = Math.ceil(allStatuses.length / ITEMS_PER_PAGE);
    if (newPage < 1 || newPage > totalPages) return;

    currentPage = newPage;
    updateURL(currentPage);
    renderPaginatedStatuses();
    setupPagination();

    document
        .getElementById("status-list")
        ?.scrollIntoView({ behavior: "smooth" });
}

function handlePageJump() {
    const input = document.getElementById("statusPageJumpInput");
    const page = parseInt(input.value, 10);
    if (!isNaN(page) && page > 0) handlePageChange(page);
}

function setupPagination() {
    const totalPages = Math.ceil(allStatuses.length / ITEMS_PER_PAGE);
    const list = document.getElementById("status-list");
    if (!list) return;

    const existing = document.querySelector(".status-pagination");
    if (existing) existing.remove();

    const container = document.createElement("div");
    container.className = "status-pagination";
    container.style.textAlign = "center";

    container.innerHTML = `
    <hr>
    <div class="pagination-info" style="margin-bottom: 1rem;">
      Página ${currentPage} de ${totalPages} (${allStatuses.length} estatus)
    </div>
    <div class="pagination-controls" style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
      <button id="statusPrevPage" class="btn btn-primary" aria-label="Anterior" ${currentPage === 1 ? "disabled" : ""}>« Anterior</button>
      <button id="statusNextPage" class="btn btn-primary" aria-label="Siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente »</button>
    </div>
    <hr>
    <div class="pagination-go-to" style="margin-bottom: 1rem;">
      <div>
        <label for="statusPageJumpInput" style="margin: 0; white-space: nowrap;">Ir a página:</label>
        <input
          type="number"
          id="statusPageJumpInput"
          min="1"
          max="${totalPages}"
          value="${currentPage}"
          style="width: 70px; padding: 0.375rem 0.5rem; border: 1px solid #ced4da; border-radius: 0.25rem;"
          aria-label="Número de página"
        >
        <button id="statusPageJumpBtn" class="btn btn-primary" aria-label="Ir">Ir</button>
      </div>
    </div>
  `;

    list.parentNode.insertBefore(container, list.nextSibling);

    document.getElementById("statusPrevPage")?.addEventListener("click", () => {
        if (currentPage > 1) handlePageChange(currentPage - 1);
    });

    document.getElementById("statusNextPage")?.addEventListener("click", () => {
        if (currentPage < totalPages) handlePageChange(currentPage + 1);
    });

    document
        .getElementById("statusPageJumpBtn")
        ?.addEventListener("click", handlePageJump);

    document
        .getElementById("statusPageJumpInput")
        ?.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handlePageJump();
        });
}

// Main loader
function displayStatuses() {
    currentPage = getPageFromURL();

    const container = document.getElementById("status-list");
    if (!container) {
        console.log("❌ #status-list does not exist in DOM");
        return;
    }

    container.innerHTML = `
        <li class="loading-state">
            <i class="fas fa-spinner fa-spin"></i> Cargando estatus...
        </li>`;

    fetch(`https://api.omg.lol/address/${OMG_ADDRESS}/statuses/`)
        .then((response) => response.json())
        .then((data) => {
            console.log("✅ Estatus cargados correctamente.");

            allStatuses = data.response.statuses; // already newest-first from the API

            const totalPages = Math.ceil(allStatuses.length / ITEMS_PER_PAGE);
            if (currentPage > totalPages) {
                currentPage = 1;
                updateURL(currentPage);
            }

            renderPaginatedStatuses();
            setupPagination();
        })
        .catch((error) => {
            console.error("Error cargando estatus:", error);
            container.innerHTML = `<li>No se pudieron cargar los estatus. Por favor, actualiza la página.</li>`;
        });
}

// Browser navigation
window.addEventListener("popstate", (event) => {
    currentPage = event.state?.page || getPageFromURL();
    if (allStatuses.length > 0) {
        renderPaginatedStatuses();
        setupPagination();
    }
});

// Init
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("status-list")) {
        displayStatuses();
    }
});
