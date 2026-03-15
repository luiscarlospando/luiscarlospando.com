// Display Paintbook entries with pagination

// Config
const ITEMS_PER_PAGE = 12;

let currentPage = 1;
let allDrawings = [];

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

// Render
function renderPaginatedDrawings() {
    const gallery = document.getElementById("paintbook-gallery");
    if (!gallery) return;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    allDrawings.forEach((item, i) => {
        item.style.display = i >= startIndex && i < endIndex ? "" : "none";
    });
}

// Pagination
function handlePageChange(newPage) {
    const totalPages = Math.ceil(allDrawings.length / ITEMS_PER_PAGE);
    if (newPage < 1 || newPage > totalPages) return;

    currentPage = newPage;
    updateURL(currentPage);
    renderPaginatedDrawings();
    setupPagination();

    document
        .getElementById("paintbook-gallery")
        ?.scrollIntoView({ behavior: "smooth" });
}

function handlePageJump() {
    const input = document.getElementById("pbPageJumpInput");
    const page = parseInt(input.value, 10);
    if (!isNaN(page) && page > 0) handlePageChange(page);
}

function setupPagination() {
    const totalPages = Math.ceil(allDrawings.length / ITEMS_PER_PAGE);
    const gallery = document.getElementById("paintbook-gallery");
    if (!gallery) return;

    const existing = document.querySelector(".pb-pagination");
    if (existing) existing.remove();

    if (totalPages <= 1) return;

    const container = document.createElement("div");
    container.className = "pb-pagination";
    container.style.textAlign = "center";

    container.innerHTML = `
    <hr>
    <div class="pagination-info" style="margin-bottom: 1rem;">
      Página ${currentPage} de ${totalPages} (${allDrawings.length} dibujos)
    </div>
    <div class="pagination-controls" style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
      <button id="pbPrevPage" class="btn btn-primary" aria-label="Anterior" ${currentPage === 1 ? "disabled" : ""}>« Anterior</button>
      <button id="pbNextPage" class="btn btn-primary" aria-label="Siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente »</button>
    </div>
    <hr>
    <div class="pagination-go-to" style="margin-bottom: 1rem;">
      <div>
        <label for="pbPageJumpInput" style="margin: 0; white-space: nowrap;">Ir a página:</label>
        <input
          type="number"
          id="pbPageJumpInput"
          min="1"
          max="${totalPages}"
          value="${currentPage}"
          style="width: 70px; padding: 0.375rem 0.5rem; border: 1px solid #ced4da; border-radius: 0.25rem;"
          aria-label="Número de página"
        >
        <button id="pbPageJumpBtn" class="btn btn-primary" aria-label="Ir">Ir</button>
      </div>
    </div>
  `;

    gallery.parentNode.insertBefore(container, gallery.nextSibling);

    document.getElementById("pbPrevPage")?.addEventListener("click", () => {
        if (currentPage > 1) handlePageChange(currentPage - 1);
    });

    document.getElementById("pbNextPage")?.addEventListener("click", () => {
        if (currentPage < totalPages) handlePageChange(currentPage + 1);
    });

    document
        .getElementById("pbPageJumpBtn")
        ?.addEventListener("click", handlePageJump);

    document
        .getElementById("pbPageJumpInput")
        ?.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handlePageJump();
        });
}

// Main loader
function displayDrawings() {
    currentPage = getPageFromURL();

    const gallery = document.getElementById("paintbook-gallery");
    if (!gallery) {
        console.log("❌ #paintbook-gallery does not exist in DOM");
        return;
    }

    allDrawings = Array.from(gallery.querySelectorAll("li"));

    if (allDrawings.length === 0) return;

    const totalPages = Math.ceil(allDrawings.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages) {
        currentPage = 1;
        updateURL(currentPage);
    }

    renderPaginatedDrawings();
    setupPagination();
}

// Browser navigation
window.addEventListener("popstate", (event) => {
    currentPage = event.state?.page || getPageFromURL();
    if (allDrawings.length > 0) {
        renderPaginatedDrawings();
        setupPagination();
    }
});

// Init
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("paintbook-gallery")) {
        displayDrawings();
    }
});
