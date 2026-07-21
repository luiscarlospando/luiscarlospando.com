// Blog posts

// WP REST API
// Require dayjs from 'dayjs'
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const { addExternalLinkIcons } = require("./other");

// API URLs
// _fields trims the WP REST response to just what's rendered below, instead
// of transferring full post bodies/excerpts/meta we never use.
const latestPosts =
    "https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=5&categories_exclude=986&_fields=date,link,title,reply_context"; // Here we're excluding the "Fotos" category (ID: 986)
const mode7LatestPost =
    "https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=1&tags=778&_fields=date,link,title";

// Escape HTML entities so reply_title/reply_author (scraped from a third-party
// page, unlike WP's own already-escaped title.rendered) render safely
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// "por Luis Carlos Pando" is redundant when replying to a post on my own blog — mirrors
// the same check in the WP theme's template-parts/reply-context.php (which
// reuses the "dominio" ACF option; here there's no PHP context, so the
// domain is just hardcoded).
function isOwnDomain(url) {
    try {
        return new URL(url).hostname.includes("luiscarlospando.com");
    } catch (error) {
        return false;
    }
}

// Reuses the same "reply-context" markup/classes as the WP theme's
// template-parts/reply-context.php — the compiled CSS is shared (blog.scss),
// so no extra styles are needed here.
function renderReplyContext(replyContext) {
    if (!replyContext || !replyContext.is_reply || !replyContext.reply_url) {
        return "";
    }

    const isOwn = isOwnDomain(replyContext.reply_url);
    const authorHTML = replyContext.reply_author && !isOwn
        ? ` por ${escapeHtml(replyContext.reply_author)}`
        : "";
    const targetHTML = isOwn ? "" : ' target="_blank" rel="noopener"';

    return `
        <div class="reply-context">
            <p class="mb-0">
                <small>
                    <i class="fa-solid fa-comments reply-context-icon"></i>
                    Respondiendo a
                    <a class="u-in-reply-to" href="${escapeHtml(replyContext.reply_url)}"${targetHTML}>&ldquo;${escapeHtml(replyContext.reply_title)}&rdquo;</a>${authorHTML}
                </small>
            </p>
        </div>`;
}

// Function to set a loading state
function setLoadingState(isLoading) {
    console.log("🔄 setLoadingState called with isLoading:", isLoading);
    const elements = ["latest-posts"];

    elements.forEach((id) => {
        const element = document.getElementById(id);
        console.log(`🔍 Looking for #${id} element:`, !!element);
        if (element) {
            if (isLoading) {
                console.log(`📝 Setting loading state HTML for #${id}`);
                element.innerHTML = `
          <li class="loading-state">
              <i class="fas fa-spinner fa-spin"></i> Cargando los posts...
          </li>`;
            }
        }
    });
}

async function displayLatestPosts() {
    console.log("⭐ displayLatestPosts started");
    // Show loading state
    setLoadingState(true);

    try {
        console.log("Fetching posts...");
        const response = await fetch(latestPosts, {
            method: "GET",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            priority: "high",
        });
        const data = await response.json();

        // Check if #latest-posts exists and display last 5 posts
        if (document.getElementById("latest-posts") !== null) {
            console.log("✅ #latest-posts si existe en el DOM");
            const latestPostsEl = document.getElementById("latest-posts");
            const postsHTML = data
                .map((post) => {
                    const postDate = dayjs(post.date).format("DD MMM, YYYY");
                    const machineReadableDate = dayjs(post.date).format(
                        "YYYY-MM-DD"
                    );

                    return `<li class="mb-3 mb-md-2"><div class="li-content"><a class="post-date badge badge-dark" href="${post.link}"><time datetime="${machineReadableDate}">${postDate}</time></a> <a href="${post.link}" title="" target="_self">${post.title.rendered}</a>${renderReplyContext(post.reply_context)}</div></li>`;
                })
                .join("");

            latestPostsEl.innerHTML = postsHTML;
            // other.js's own pass already finished by the time this content
            // is injected, so the reply-context links need their own run.
            addExternalLinkIcons(latestPostsEl);
        } else {
            console.log("❌ #latest-posts no existe en el DOM");
        }

        // Check if #blog exists and display newest post
        if (document.getElementById("blog") !== null) {
            console.log("✅ #blog si existe en el DOM");
            const blogEl = document.getElementById("blog");
            blogEl.innerHTML = `<a href="${data[0].link}" title="${data[0].title.rendered}">${data[0].title.rendered}</a>`;
        } else {
            console.log("❌ #blog no existe en el DOM");
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        const latestPostsEl = document.getElementById("latest-posts");
        if (latestPostsEl) {
            latestPostsEl.innerHTML = `
                      <li>
                          Lo siento, no se pudieron cargar los posts.
                          Por favor, intenta recargar la página.
                      </li>`;
        }
    }
}

async function displayMode7LatestPost() {
    try {
        const response = await fetch(mode7LatestPost, {
            method: "GET",
            headers: { "Content-type": "application/json;charset=UTF-8" },
        });
        const data = await response.json();

        // Check for latest episode element
        const latestEpisodeEl = document.getElementById(
            "mode-7-podcast-latest-episode"
        );
        if (latestEpisodeEl !== null) {
            console.log(
                "✅ #mode-7-podcast-latest-episode si existe en el DOM"
            );
            latestEpisodeEl.innerHTML = `<a class="btn btn-primary" href="${data[0].link}" title="${data[0].title.rendered}" target="_self"><i class="fa-solid fa-play"></i> ${data[0].title.rendered}</a>`;
        } else {
            console.log(
                "❌ #mode-7-podcast-latest-episode no existe en el DOM"
            );
        }

        // Check for timestamp element
        const timestampEl = document.getElementById(
            "mode-7-podcast-latest-episode-timestamp"
        );
        if (timestampEl !== null) {
            console.log(
                "✅ #mode-7-podcast-latest-episode-timestamp si existe en el DOM"
            );
            const lastUpdatedIso = data[0].date;
            const lastUpdatedRelative = dayjs().to(lastUpdatedIso);
            timestampEl.innerHTML = `<code>Última actualización:</code> ${lastUpdatedRelative}`;
        } else {
            console.log(
                "❌ #mode-7-podcast-latest-episode-timestamp no existe en el DOM"
            );
        }
    } catch (error) {
        console.error("Error fetching Mode 7 Podcast data:", error);
    }
}

async function displayTotalPosts() {
    try {
        // Only the X-WP-Total header is used here, so ask WP for the
        // smallest possible body instead of the default 10 full posts.
        const response = await fetch(
            "https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=1&_fields=id",
            {
                method: "GET",
                headers: { "Content-type": "application/json;charset=UTF-8" },
            }
        );

        const postCount = response.headers.get("x-wp-total");
        const contadorElement = document.getElementById("contador-posts");

        if (contadorElement !== null) {
            console.log("✅ #contador-posts si existe en el DOM");
            contadorElement.textContent += postCount;
        } else {
            console.log("❌ #contador-posts no existe en el DOM");
        }
    } catch (error) {
        console.error("Error fetching total posts:", error);
    }
}

// These three hit independent WP REST endpoints and touch disjoint DOM
// elements, so run them concurrently instead of awaiting one at a time.
async function loadContent() {
    try {
        await Promise.all([
            displayLatestPosts(),
            displayMode7LatestPost(),
            displayTotalPosts(),
        ]);
    } catch (error) {
        console.error("Error loading content:", error);
    }
}

// This script runs as a blocking <script> tag placed after the page content,
// so the DOM is typically already parsed by the time it executes. Checking
// readyState lets these fetches start immediately instead of waiting for
// DOMContentLoaded.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadContent);
} else {
    loadContent();
}
