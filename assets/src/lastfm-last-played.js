// Import dependencies
const dayjs = require("dayjs");
const locale_es_mx = require("dayjs/locale/es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");

// Dayjs configuration
dayjs.locale("es-mx");
dayjs.extend(relativeTime);

document.addEventListener("DOMContentLoaded", () => {
  const lastPlayedEl = document.getElementById("last-played");

  if (lastPlayedEl) {
    const apiKey = "ec402410ce4370f67a2fa4477dee7aa5";
    const username = "luiscarlospando";
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const track = data.recenttracks.track[0];
        if (track) {
          const songName = track.name;
          const artistName = track.artist["#text"];
          const trackUrl = track.url;

          const lastPlayedSongEl = document.getElementById("last-played-song");
          const lastPlayedAgoEl = document.getElementById("last-played-ago");

          lastPlayedSongEl.innerHTML = `<a href="${trackUrl}" target="_blank" rel="noopener noreferrer">${artistName} — ${songName}</a>`;

          const isPlaying = track["@attr"]?.nowplaying === "true";

          if (isPlaying) {
            lastPlayedAgoEl.innerHTML = `
              <small class="text-muted">
                <em><i class="fa-solid fa-headphones"></i> reproduciendo ahora</em>
              </small>
            `;
          } else if (track.date?.uts) {
            const playedAt = dayjs.unix(Number(track.date.uts));
            const relativeTime = playedAt.fromNow();
            lastPlayedAgoEl.innerHTML = `
              <small class="text-muted">
                <em><i class="fa-solid fa-clock"></i> ${relativeTime}</em>
              </small>
            `;
          }
        } else {
          document.getElementById("last-played-song").textContent =
            "Sin canciones recientes.";
        }
      })
      .catch((error) => {
        console.error("Error al fetchear datos desde Last.fm:", error);
      });
  }
});
