(function () {
    const gallery = document.getElementById("paintbook-gallery");
    if (!gallery) return; // No estamos en la página del Paintbook, salir

    const ITEMS_PER_PAGE = 6;

    let currentPage = 1;
    let allItems = [];

    function getPageFromURL() {
        const p = parseInt(
            new URLSearchParams(window.location.search).get("page"),
            10
        );
        return p && p > 0 ? p : 1;
    }

    function updateURL(page) {
        const url = new URL(window.location);
        page === 1
            ? url.searchParams.delete("page")
            : url.searchParams.set("page", page);
        window.history.pushState({ page }, "", url);
    }

    function render() {
        const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        allItems.forEach((item, i) => {
            item.style.display = i >= start && i < end ? "" : "none";
        });

        renderPagination(totalPages);
    }

    function handlePageChange(newPage) {
        const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
        if (newPage < 1 || newPage > totalPages) return;
        currentPage = newPage;
        updateURL(currentPage);
        render();
        gallery.scrollIntoView({ behavior: "smooth" });
    }

    function handleJump() {
        const val = parseInt(
            document.getElementById("pbPageJumpInput")?.value,
            10
        );
        if (!isNaN(val) && val > 0) handlePageChange(val);
    }

    function renderPagination(totalPages) {
        const existing = document.getElementById("pb-pagination");
        if (existing) existing.remove();
        if (totalPages <= 1) return;

        const div = document.createElement("div");
        div.id = "pb-pagination";
        div.style.cssText = "text-align:center; margin-top: 1.5rem;";
        div.innerHTML = `
      <hr>
      <div style="margin-bottom:.75rem;">
        Página ${currentPage} de ${totalPages} (${allItems.length} dibujos)
      </div>
      <div style="display:flex; justify-content:center; align-items:center; gap:.5rem; flex-wrap:wrap; margin-bottom:.75rem;">
        <button id="pbPrev" class="btn btn-primary" ${currentPage === 1 ? "disabled" : ""}>« Anterior</button>
        <button id="pbNext" class="btn btn-primary" ${currentPage === totalPages ? "disabled" : ""}>Siguiente »</button>
      </div>
      <hr>
      <div style="margin-bottom:1rem;">
        <label for="pbPageJumpInput">Ir a página:</label>
        <input id="pbPageJumpInput" type="number" min="1" max="${totalPages}" value="${currentPage}"
          style="width:70px; padding:.375rem .5rem; border:1px solid #ced4da; border-radius:.25rem;">
        <button id="pbPageJumpBtn" class="btn btn-primary">Ir</button>
      </div>`;

        gallery.after(div);

        document
            .getElementById("pbPrev")
            ?.addEventListener("click", () =>
                handlePageChange(currentPage - 1)
            );
        document
            .getElementById("pbNext")
            ?.addEventListener("click", () =>
                handlePageChange(currentPage + 1)
            );
        document
            .getElementById("pbPageJumpBtn")
            ?.addEventListener("click", handleJump);
        document
            .getElementById("pbPageJumpInput")
            ?.addEventListener("keypress", (e) => {
                if (e.key === "Enter") handleJump();
            });
    }

    function init() {
        allItems = Array.from(gallery.querySelectorAll("li"));
        if (allItems.length === 0) return;

        currentPage = getPageFromURL();
        const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages) {
            currentPage = 1;
            updateURL(1);
        }

        render();
    }

    window.addEventListener("popstate", (e) => {
        currentPage = e.state?.page || getPageFromURL();
        render();
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init(); // El DOM ya está listo
    }
})();
