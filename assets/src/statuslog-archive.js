// Display Statuslog entries with pagination
// Requires Fluent Emoji script in <head>:
// <script src="https://emoji.fluent-cdn.com/latest/fluentemoji.min.js" crossorigin="anonymous"></script>

// Config
const ITEMS_PER_PAGE = 10;
const OMG_ADDRESS = "mijo";

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
    const date = new Date(unixTimestamp * 1000);

    const months = [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const isoString = date.toISOString();
    const displayText = `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;

    return `<time datetime="${isoString}"><em>${displayText}</em></time>`;
}

// Render
function renderPaginatedStatuses() {
    const list = document.getElementById("status-list");
    if (!list) return;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const statuses = allStatuses.slice(startIndex, endIndex);

    list.innerHTML = statuses
        .map((status) => {
            const formattedDate = formatStatusDate(status.created);
            // Make URLs in content clickable
            const linkedContent = (status.content || "").replace(
                /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
                '<a href="$1" target="_blank" rel="noopener">$1</a>'
            );

            return `
                <li class="mb-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-md-2 col-lg-1 text-center">
                                    <span class="status-emoji" style="font-size: 3rem;">${status.emoji || ""}</span>
                                </div>
                                <div class="col-md-10 col-lg-11">
                                    <div class="status-content">
                                        <div class="status-header mb-2">
                                            <strong>@${OMG_ADDRESS}</strong>
                                            <span class="text-muted"> · ${formattedDate}</span>
                                        </div>
                                        <div class="status-text">
                                            <p style="white-space: pre-wrap; margin: 0;">${linkedContent}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>`;
        })
        .join("");

    // Replace plain emojis with Fluent 3D images via the fluentemoji library
    if (typeof fluentemoji !== "undefined") {
        fluentemoji.parse("#status-list");
    }
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
