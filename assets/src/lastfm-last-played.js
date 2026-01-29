// Import dependencies
const dayjs = require("dayjs");
const locale_es_mx = require("dayjs/locale/es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");

// Dayjs configuration
dayjs.locale("es-mx");
dayjs.extend(relativeTime);

// Configuration
const CONFIG = {
    apiKey: "ec402410ce4370f67a2fa4477dee7aa5",
    username: "luiscarlospando",
    updateInterval: 30000, // Update every 30 seconds if playing
    cacheKey: "lastfm_last_track",
    cacheDuration: 60000, // Cache for 1 minute
};

let updateTimer = null;
let lastTrackData = null;

// Function to get cached data
function getCachedData() {
    try {
        const cached = sessionStorage.getItem(CONFIG.cacheKey);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            const now = Date.now();

            // Return cached data if it's still fresh
            if (now - timestamp < CONFIG.cacheDuration) {
                return data;
            }
        }
    } catch (error) {
        console.error("Error reading cache:", error);
    }
    return null;
}

// Function to set cached data
function setCachedData(data) {
    try {
        sessionStorage.setItem(
            CONFIG.cacheKey,
            JSON.stringify({
                data,
                timestamp: Date.now(),
            })
        );
    } catch (error) {
        console.error("Error setting cache:", error);
    }
}

// Function to update the display
function updateDisplay(track) {
    const lastPlayedSongEl = document.getElementById("last-played-song");
    const lastPlayedAgoEl = document.getElementById("last-played-ago");

    if (!lastPlayedSongEl || !lastPlayedAgoEl) return;

    const songName = track.name;
    const artistName = track.artist["#text"];
    const trackUrl = track.url;

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
        const machineReadableDateTime = playedAt.toISOString();

        lastPlayedAgoEl.innerHTML = `
      <small class="text-muted">
        <time datetime="${machineReadableDateTime}">
          <em><i class="fa-solid fa-clock"></i> ${relativeTime}</em>
        </time>
      </small>
    `;
    }

    return isPlaying;
}

// Function to fetch and update last played track
function fetchLastPlayed() {
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${CONFIG.username}&api_key=${CONFIG.apiKey}&format=json&limit=1`;

    // Check cache first
    const cachedData = getCachedData();
    if (cachedData) {
        const track = cachedData.recenttracks.track[0];
        if (track) {
            const isPlaying = updateDisplay(track);
            // If playing, schedule next update
            if (isPlaying) {
                scheduleUpdate();
            }
            return;
        }
    }

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const track = data.recenttracks.track[0];
            if (track) {
                // Cache the data
                setCachedData(data);
                lastTrackData = track;

                const isPlaying = updateDisplay(track);

                // If playing, schedule next update
                if (isPlaying) {
                    scheduleUpdate();
                } else {
                    // Clear any existing timer if not playing
                    clearUpdateTimer();
                }
            } else {
                const lastPlayedSongEl =
                    document.getElementById("last-played-song");
                if (lastPlayedSongEl) {
                    lastPlayedSongEl.textContent = "Sin canciones recientes.";
                }
            }
        })
        .catch((error) => {
            console.error("Error al fetchear datos desde Last.fm:", error);

            // Try to show last known data
            if (lastTrackData) {
                updateDisplay(lastTrackData);
            } else {
                const lastPlayedSongEl =
                    document.getElementById("last-played-song");
                if (lastPlayedSongEl) {
                    lastPlayedSongEl.innerHTML = `<small class="text-muted"><em>No se pudo cargar la información.</em></small>`;
                }
            }
        });
}

// Function to schedule next update
function scheduleUpdate() {
    // Clear existing timer
    clearUpdateTimer();

    // Schedule next update
    updateTimer = setTimeout(() => {
        fetchLastPlayed();
    }, CONFIG.updateInterval);
}

// Function to clear update timer
function clearUpdateTimer() {
    if (updateTimer) {
        clearTimeout(updateTimer);
        updateTimer = null;
    }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    const lastPlayedEl = document.getElementById("last-played");

    if (lastPlayedEl) {
        // Initial fetch
        fetchLastPlayed();

        // Update relative time every minute for non-playing tracks
        setInterval(() => {
            if (lastTrackData && !lastTrackData["@attr"]?.nowplaying) {
                updateDisplay(lastTrackData);
            }
        }, 60000); // Update every minute
    }
});

// Clean up on page unload
window.addEventListener("beforeunload", () => {
    clearUpdateTimer();
});
