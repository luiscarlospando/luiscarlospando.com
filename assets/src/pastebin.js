// Retrieve /pastebin content via omg.lol

// Require dayjs from 'dayjs'
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");

// API URL
const api_url = "https://api.omg.lol/address/mijo/pastebin";

// Show at most this many lines in the card preview before fading out
const PREVIEW_LINE_LIMIT = 8;

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

// Build the HTML for a single paste card
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
                &bull; ${languageLabel(language)}
            </p>
            <div class="pastebin-card-preview${isTruncated ? " is-truncated" : ""}">
                <pre class="language-${language}"><code class="language-${language}">${escapeHtml(previewContent)}</code></pre>
            </div>
            <div class="pastebin-card-footer">
                <span>${lineCount} ${lineCount === 1 ? "línea" : "líneas"}</span>
                <a href="#" class="btn-view-paste" data-toggle="modal" data-target="#pasteModal" data-paste-index="${index}">
                    Ver <i class="fa-solid fa-chevron-right"></i>
                </a>
            </div>
        </div>
    </div>`;
}

// Fill in and highlight the shared modal for a given paste
function populatePasteModal(paste, language) {
    const modalTitle = document.getElementById("pasteModalLabel");
    const modalDate = document.getElementById("pasteModalDate");
    const modalLanguage = document.getElementById("pasteModalLanguage");
    const modalLink = document.getElementById("pasteModalLink");
    const modalCode = document.getElementById("pasteModalCode");
    const modalCopyBtn = document.getElementById("pasteModalCopyBtn");

    if (!modalTitle || !modalCode) return;

    modalTitle.textContent = paste.title;
    modalDate.textContent = formatDate(paste.modified_on);
    modalLanguage.textContent = languageLabel(language);
    modalLink.setAttribute("href", paste.url);
    modalCode.className = `language-${language}`;
    modalCode.textContent = paste.content;
    modalCopyBtn?.setAttribute("data-clipboard-text", paste.content);

    if (window.Prism) {
        window.Prism.highlightElement(modalCode);
    }
}

// Delegate clicks on "Ver" triggers to open + populate the paste modal
function bindCardEvents(container, pastes, languages) {
    container.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-paste-index]");
        if (!trigger) return;

        const index = Number(trigger.dataset.pasteIndex);
        const paste = pastes[index];
        const language = languages[index];
        if (!paste || !language) return;

        populatePasteModal(paste, language);
    });
}

// Using Promise syntax
function getPastebinContent() {
    const container = document.getElementById("pastebin-content");
    if (!container) {
        console.log("❌ #pastebin-content no existe en el DOM");
        return;
    }

    console.log("✅ #pastebin-content si existe en el DOM");

    fetch(api_url, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
    })
        .then((response) => response.json())
        .then((data) => {
            const pastes = data.response.pastebin || [];

            if (pastes.length === 0) {
                container.innerHTML =
                    '<p class="text-center text-muted">Todavía no hay snippets por aquí.</p>';
                return;
            }

            const languages = pastes.map((paste) =>
                guessLanguage(paste.title, paste.content)
            );

            const cardsHTML = pastes
                .map((paste, index) => renderCard(paste, index, languages[index]))
                .join("");

            container.innerHTML = `<div class="pastebin-grid">${cardsHTML}</div>`;

            if (window.Prism) {
                window.Prism.highlightAllUnder(container);
            }

            bindCardEvents(container, pastes, languages);
        })
        .catch((error) => {
            console.error(error);
            container.innerHTML =
                '<p class="text-center text-muted">No se pudieron cargar los snippets. Intenta recargar la página.</p>';
        });
}

// Function calls
getPastebinContent();
