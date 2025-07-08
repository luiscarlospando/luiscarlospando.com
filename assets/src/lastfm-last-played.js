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
          lastPlayedSongEl.innerHTML = `<a href="${trackUrl}" target="_blank" rel="noopener noreferrer">${artistName} — ${songName}</a>`;
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
