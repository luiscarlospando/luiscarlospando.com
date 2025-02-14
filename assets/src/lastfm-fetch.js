// Top 10 artists from Last.fm in the past month

// Require dayjs from 'dayjs'
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// Function to display Last.fm top artists
function displayLastFmTopArtists() {
    fetch("https://luiscarlospando.com/api/lastfmTopArtists", {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
    })
        .then((response) => response.json())
        .then((data) => {
            // Retrieve last 10 posts, fetch links and display them on the /now page
            let ready = (callback) => {
                if (document.readyState != "loading") callback();
                else document.addEventListener("DOMContentLoaded", callback);
            };

            ready(() => {
                /* Do things after DOM has fully loaded */
                if (document.getElementById("lastfm-top-artists") !== null) {
                    console.log("✅ #lastfm-top-artists si existe en el DOM");
                    for (let i = 0; i < data.topartists.artist.length; i++) {
                        document.getElementById(
                            "lastfm-top-artists"
                        ).innerHTML +=
                            `<li><a href="${data.topartists.artist[i].url}" target="_blank">${data.topartists.artist[i].name}</a></li>`;
                    }
                } else {
                    console.log("❌ #lastfm-top-artists no existe en el DOM");
                }
            });
        })
        .catch((error) => console.error(error));
}

// Function calls
displayLastFmTopArtists();
