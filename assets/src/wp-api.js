// WP REST API
// Require dayjs from 'dayjs'
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// API URLs
const latestPosts =
    "https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=5";
const mode7LatestPost =
    "https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=1&tags=778";

async function displayLatestPosts() {
    try {
        const response = await fetch(latestPosts, {
            method: "GET",
            headers: { "Content-type": "application/json;charset=UTF-8" },
        });
        const data = await response.json();

        // Check if #latest-posts exists and display last 5 posts
        if (document.getElementById("latest-posts") !== null) {
            console.log("✅ #latest-posts si existe en el DOM");
            const latestPostsEl = document.getElementById("latest-posts");
            const postsHTML = data
                .map((post) => {
                    const postDate = dayjs(post.date).format("D MMM, YYYY");
                    return `<li><a class="post-date badge badge-dark" href="${post.link}">${postDate}</a> <a href="${post.link}" title="${post.title.rendered}" target="_self">${post.title.rendered}</a></li>`;
                })
                .join("");

            latestPostsEl.innerHTML = postsHTML;
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
        const response = await fetch(
            "https://blog.luiscarlospando.com/wp-json/wp/v2/posts",
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

// Wait for DOM to be fully loaded before calling functions
document.addEventListener("DOMContentLoaded", async () => {
    try {
        await displayLatestPosts();
        await displayMode7LatestPost();
        await displayTotalPosts();
    } catch (error) {
        console.error("Error loading content:", error);
    }
});
