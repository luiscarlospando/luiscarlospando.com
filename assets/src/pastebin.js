// Retrieve /pastebin content via omg.lol

// Require dayjs from 'dayjs'
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// API URL
const api_url = "https://api.omg.lol/address/mijo/pastebin";

// Show at most this many lines in the card preview before fading out
const PREVIEW_LINE_LIMIT = 8;

// Pagination
const ITEMS_PER_PAGE = 15;
let currentPage = 1;
let allPastes = [];
let allLanguages = [];

// Map a file extension (from the paste title) to a Prism language
const EXTENSION_LANGUAGE_MAP = {
    js: "javascript",
    mjs: "javascript",
    jsx: "jsx",
    ts: "typescript",
    tsx: "tsx",
    json: "json",
    json5: "json5",
    css: "css",
    scss: "scss",
    sass: "sass",
    html: "markup",
    htm: "markup",
    xml: "markup",
    svg: "markup",
    md: "markdown",
    markdown: "markdown",
    sh: "bash",
    bash: "bash",
    zsh: "bash",
    py: "python",
    rb: "ruby",
    php: "php",
    sql: "sql",
    yml: "yaml",
    yaml: "yaml",
    toml: "toml",
    go: "go",
    graphql: "graphql",
    vim: "vim",
    txt: "plaintext",
};

// Friendlier badge labels for a handful of languages
const LANGUAGE_LABELS = {
    javascript: "JS",
    typescript: "TS",
    markup: "HTML",
    plaintext: "PLAINTEXT",
};

// Escape HTML entities so paste content renders safely inside <code>
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Guess a Prism language from the paste title's extension, or from a few
// common content patterns. Falls back to plaintext when nothing matches.
function guessLanguage(title, content) {
    const extMatch = title.match(/\.([a-z0-9]+)$/i);
    if (extMatch) {
        const ext = extMatch[1].toLowerCase();
        if (EXTENSION_LANGUAGE_MAP[ext]) return EXTENSION_LANGUAGE_MAP[ext];
    }

    const trimmed = content.trim();

    if (/^#!.*\b(bash|sh|zsh)\b/.test(trimmed)) return "bash";

    if (/^[{[]/.test(trimmed)) {
        try {
            JSON.parse(trimmed);
            return "json";
        } catch (error) {
            // Not valid JSON, keep guessing
        }
    }

    if (/^<(!DOCTYPE|html|iframe|div|span|p|a)\b/i.test(trimmed)) return "markup";

    return "plaintext";
}

function languageLabel(language) {
    return LANGUAGE_LABELS[language] || language.toUpperCase();
}

// Format a unix timestamp using dayjs
function formatDate(unixTimestamp) {
    return dayjs.unix(unixTimestamp).format("D MMM, YYYY");
}

// ─── URL Helpers ────────────────────────────────────────────────────────────

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

// Fill in the page's "última actualización" indicator using the most
function updateLastUpdatedAt(pastes) {
    const lastUpdatedEl = document.getElementById("pastebin-updated");
    if (!lastUpdatedEl || pastes.length === 0) return;

    const mostRecentTimestamp = Math.max(
        ...pastes.map((paste) => paste.modified_on)
    );
    const lastUpdated = dayjs.unix(mostRecentTimestamp);

    const relativeTimeContent = dayjs().to(lastUpdated);
    const machineReadableDateTime = lastUpdated.toISOString();

    lastUpdatedEl.innerHTML = `<time datetime="${machineReadableDateTime}">${relativeTimeContent}</time>`;
}

// ─── Rendering ──────────────────────────────────────────────────────────────

// Build the HTML for a single paste card. `index` is the paste's absolute
// position in `allPastes`, used later to look it up again when opening the modal.
function renderCard(paste, index, language) {
    const lines = paste.content.split(/\r\n|\r|\n/);
    const lineCount = lines.length;
    const isTruncated = lineCount > PREVIEW_LINE_LIMIT;
    const previewContent = isTruncated
        ? lines.slice(0, PREVIEW_LINE_LIMIT).join("\n")
        : paste.content;

    return `
    <div class="card pastebin-card">
        <div class="card-body">
            <h3 class="pastebin-card-title h5">${escapeHtml(paste.title)}</h3>
            <p class="pastebin-card-meta text-muted">
                <time datetime="${dayjs.unix(paste.modified_on).toISOString()}">${formatDate(paste.modified_on)}</time>
                <span class="language-badge">${languageLabel(language)}</span>
            </p>
            <div class="pastebin-card-preview${isTruncated ? " is-truncated" : ""}">
                <pre class="language-${language}"><code class="language-${language}">${escapeHtml(previewContent)}</code></pre>
            </div>
            <div class="pastebin-card-footer">
                <span>${lineCount} ${lineCount === 1 ? "línea" : "líneas"}</span>
                <a href="#" class="btn btn-primary btn-sm btn-view-paste" data-toggle="modal" data-target="#pasteModal" data-paste-index="${index}">
                    <i class="fa-solid fa-clipboard"></i> Ver
                </a>
            </div>
        </div>
    </div>`;
}

// Render only the current page's slice of pastes into the grid
function renderPaginatedPastes() {
    const grid = document.getElementById("pastebin-grid");
    if (!grid) return;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageItems = allPastes.slice(startIndex, endIndex);

    grid.innerHTML = pageItems
        .map((paste, i) => renderCard(paste, startIndex + i, allLanguages[startIndex + i]))
        .join("");

    if (window.Prism) {
        window.Prism.highlightAllUnder(grid);
    }
}

// Fill in and highlight the shared modal for a given paste
function populatePasteModal(paste, language) {
    const modalTitle = document.getElementById("pasteModalLabel");
    const modalDate = document.getElementById("pasteModalDate");
    const modalLanguage = document.getElementById("pasteModalLanguage");
    const modalLink = document.getElementById("pasteModalLink");
    const modalCode = document.getElementById("pasteModalCode");

    if (!modalTitle || !modalCode) return;

    modalTitle.textContent = paste.title;
    modalDate.textContent = formatDate(paste.modified_on);
    modalLanguage.textContent = languageLabel(language);
    modalLink.setAttribute("href", paste.url);
    modalCode.className = `language-${language}`;
    modalCode.textContent = paste.content;

    if (window.Prism) {
        window.Prism.highlightElement(modalCode);
    }
}

// ─── Pagination controls ────────────────────────────────────────────────────

function handlePageChange(newPage) {
    currentPage = newPage;
    updateURL(currentPage);
    renderPaginatedPastes();
    setupPagination();
    document
        .getElementById("pastebin-content")
        ?.scrollIntoView({ behavior: "smooth" });
}

function setupPagination() {
    const totalPages = Math.ceil(allPastes.length / ITEMS_PER_PAGE);
    const grid = document.getElementById("pastebin-grid");
    if (!grid) return;

    const existingPagination = document.querySelector(".pastebin-pagination");
    if (existingPagination) {
        existingPagination.remove();
    }

    // Don't render pagination controls when everything fits on one page
    if (totalPages <= 1) return;

    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination pastebin-pagination";
    paginationContainer.style.textAlign = "center";

    paginationContainer.innerHTML = `
        <hr>
        <div class="pagination-info" style="margin-bottom: 1rem;">
            Página ${currentPage} de ${totalPages}
            (${allPastes.length} snippets en total)
        </div>
        <div class="pagination-controls" style="display: flex; justify-content: center; gap: 0.5rem;">
            <button id="pastebinPrevPage" class="btn btn-primary" aria-label="Anterior" ${
                currentPage === 1 ? "disabled" : ""
            }>
                « Anterior
            </button>
            <button id="pastebinNextPage" class="btn btn-primary" aria-label="Siguiente" ${
                currentPage === totalPages ? "disabled" : ""
            }>
                Siguiente »
            </button>
        </div>
    `;

    grid.parentNode.insertBefore(paginationContainer, grid.nextSibling);

    document.getElementById("pastebinPrevPage")?.addEventListener("click", () => {
        if (currentPage > 1) handlePageChange(currentPage - 1);
    });

    document.getElementById("pastebinNextPage")?.addEventListener("click", () => {
        if (currentPage < totalPages) handlePageChange(currentPage + 1);
    });
}

// ─── Events ─────────────────────────────────────────────────────────────────

// Delegate clicks on "Ver" triggers to open + populate the paste modal
function handleGridClick(event) {
    const trigger = event.target.closest("[data-paste-index]");
    if (!trigger) return;

    const index = Number(trigger.dataset.pasteIndex);
    const paste = allPastes[index];
    const language = allLanguages[index];
    if (!paste || !language) return;

    populatePasteModal(paste, language);
}

// Handle browser back/forward navigation
window.addEventListener("popstate", (event) => {
    if (!document.getElementById("pastebin-content")) return;

    currentPage = event.state?.page || getPageFromURL();

    if (allPastes.length > 0) {
        renderPaginatedPastes();
        setupPagination();
    }
});

// ─── Main ────────────────────────────────────────────────────────────────────

function getPastebinContent() {
    const container = document.getElementById("pastebin-content");
    if (!container) {
        console.log("❌ #pastebin-content no existe en el DOM");
        return;
    }

    console.log("✅ #pastebin-content si existe en el DOM");

    currentPage = getPageFromURL();

    fetch(api_url, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
    })
        .then((response) => response.json())
        .then((data) => {
            allPastes = data.response.pastebin || [];

            updateLastUpdatedAt(allPastes);

            if (allPastes.length === 0) {
                container.innerHTML =
                    '<p class="text-center text-muted">Todavía no hay snippets por aquí.</p>';
                return;
            }

            allLanguages = allPastes.map((paste) =>
                guessLanguage(paste.title, paste.content)
            );

            const totalPages = Math.ceil(allPastes.length / ITEMS_PER_PAGE);
            if (currentPage > totalPages) {
                currentPage = 1;
                updateURL(currentPage);
            }

            container.innerHTML = '<div class="pastebin-grid" id="pastebin-grid"></div>';
            container.addEventListener("click", handleGridClick);

            renderPaginatedPastes();
            setupPagination();
        })
        .catch((error) => {
            console.error(error);
            container.innerHTML =
                '<p class="text-center text-muted">No se pudieron cargar los snippets. Intenta recargar la página.</p>';
        });
}

// Function calls
getPastebinContent();
