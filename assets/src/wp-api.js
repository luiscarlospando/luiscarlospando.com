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

// Using Promise syntax
function displayLatestPosts() {
    fetch(latestPosts, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
    })
        .then((response) => response.json())
        .then((data) => {
            // Retrieve last 5 posts, fetch links and display them on the homepage
            if (document.getElementById("latest-posts") !== null) {
                console.log("✅ #latest-posts si existe en el DOM");
                for (let i = 0; i < data.length; i++) {
                    // Format date using dayjs
                    const postDate = dayjs(data[i].date).format("D MMM, YYYY");

                    document.getElementById("latest-posts").innerHTML +=
                        `<li><a class="post-date badge badge-dark" href="${data[i].link}">${postDate}</a> <a href="${data[i].link}" title="${data[i].title.rendered}">${data[i].title.rendered}</a></li>`;
                }
            } else {
                console.log("❌ #latest-posts no existe en el DOM");
            }

            // Retrieve newest post, fetch link and display it on the footer
            if (document.getElementById("blog") !== null) {
                console.log("✅ #blog si existe en el DOM");
                document.getElementById("blog").innerHTML +=
                    `<a href="${data[0].link}" title="${data[0].title.rendered}">${data[0].title.rendered}</a>`;
            } else {
                console.log("❌ #blog no existe en el DOM");
            }
        })
        .catch((error) => console.error(error));
}

function displayMode7LatestPost() {
    fetch(mode7LatestPost, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
    })
        .then((response) => response.json())
        .then((data) => {
            // Retrieve latest post from tag 'Mode 7 Podcast' via API and fetch link
            if (
                document.getElementById("mode-7-podcast-latest-episode") !==
                null
            ) {
                console.log(
                    "✅ #mode-7-podcast-latest-episode si existe en el DOM"
                );
                document.getElementById(
                    "mode-7-podcast-latest-episode"
                ).innerHTML +=
                    `<a class="btn btn-primary" href="${data[0].link}" title="${data[0].title.rendered}"><i class="fa-solid fa-play"></i> ${data[0].title.rendered}</a>`;
            } else {
                console.log(
                    "❌ #mode-7-podcast-latest-episode no existe en el DOM"
                );
            }

            // Retrieve latest post timestamp from tag 'Mode 7 Podcast' via API and fetch link
            const lastUpdatedIso = data[0].date;
            let lastUpdatedRelative = dayjs().to(lastUpdatedIso);
            if (
                document.getElementById(
                    "mode-7-podcast-latest-episode-timestamp"
                ) !== null
            ) {
                console.log(
                    "✅ #mode-7-podcast-latest-episode-timestamp si existe en el DOM"
                );
                document.getElementById(
                    "mode-7-podcast-latest-episode-timestamp"
                ).innerHTML +=
                    `<code>Última actualización:</code> ${lastUpdatedRelative}`;
            } else {
                console.log(
                    "❌ #mode-7-podcast-latest-episode-timestamp no existe en el DOM"
                );
            }
        })
        .catch((error) => console.error(error));
}

function displayTotalBlogPosts() {
    fetch(mode7LatestPost, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
    })
        .then((response) => response.json())
        .then((data) => {
            // Retrieve latest post from tag 'Mode 7 Podcast' via API and fetch link
            if (
                document.getElementById("mode-7-podcast-latest-episode") !==
                null
            ) {
                console.log(
                    "✅ #mode-7-podcast-latest-episode si existe en el DOM"
                );
                document.getElementById(
                    "mode-7-podcast-latest-episode"
                ).innerHTML +=
                    `<a class="btn btn-primary" href="${data[0].link}" title="${data[0].title.rendered}"><i class="fa-solid fa-play"></i> ${data[0].title.rendered}</a>`;
            } else {
                console.log(
                    "❌ #mode-7-podcast-latest-episode no existe en el DOM"
                );
            }

            // Retrieve latest post timestamp from tag 'Mode 7 Podcast' via API and fetch link
            const lastUpdatedIso = data[0].date;
            let lastUpdatedRelative = dayjs().to(lastUpdatedIso);
            if (
                document.getElementById(
                    "mode-7-podcast-latest-episode-timestamp"
                ) !== null
            ) {
                console.log(
                    "✅ #mode-7-podcast-latest-episode-timestamp si existe en el DOM"
                );
                document.getElementById(
                    "mode-7-podcast-latest-episode-timestamp"
                ).innerHTML +=
                    `<code>Última actualización:</code> ${lastUpdatedRelative}`;
            } else {
                console.log(
                    "❌ #mode-7-podcast-latest-episode-timestamp no existe en el DOM"
                );
            }
        })
        .catch((error) => console.error(error));
}

// Function calls
displayLatestPosts();
displayMode7LatestPost();

// Append total post count to element #contador-posts in "Acerca de" page
fetch("https://blog.luiscarlospando.com/wp-json/wp/v2/posts")
    .then((response) => {
        const postCount = response.headers.get("x-wp-total");
        document.getElementById("contador-posts").textContent += postCount;
    })
    .catch((error) => {
        console.error("Error:", error);
    });
