// Import dependencies
const dayjs = require("dayjs");
const locale_es_mx = require("dayjs/locale/es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");

// Dayjs configuration
dayjs.locale("es-mx");
dayjs.extend(relativeTime);

// Constants
const API_URL = "https://api.omg.lol/address/mijo/statuses/";
const CACHE_DURATION = 300000; // 5 minutes in milliseconds
const UPDATE_INTERVAL = 300000; // 5 minutes in milliseconds

// Caching data
const statusCache = {
    data: null,
    timestamp: 0,
};

// Function to fetch data with retries
async function fetchWithRetry(url, options, retries = 3) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(response.statusText);
        return response;
    } catch (error) {
        if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return fetchWithRetry(url, options, retries - 1);
        }
        throw error;
    }
}

// Function to render latest status
function renderStatus(data) {
    const statusElement = document.getElementById("status");
    if (!statusElement) {
        console.log("❌ #status no existe en el DOM");
        return;
    } else {
        console.log("✅ #status si existe en el DOM");
    }

    const lastUpdatedUnix = data.response.statuses[0].created;
    const lastUpdatedIso = dayjs.unix(lastUpdatedUnix);
    const lastUpdatedRelative = dayjs().to(lastUpdatedIso);

    statusElement.innerHTML = `
        <div id="container" class="text-center">
            <a href="https://mijo.status.lol/" target="_blank">
                <p>
                    ${data.response.statuses[0].emoji} ${data.response.statuses[0].content}
                </p>
            </a>
            <small class="text-muted">
                <em><i class="fa-solid fa-clock"></i> ${lastUpdatedRelative}</em>
            </small>
        </div>
    `;
}

// Main function to show the latest status
async function displayLatestStatus() {
    try {
        // Verify cache
        const now = Date.now();
        if (statusCache.data && now - statusCache.timestamp < CACHE_DURATION) {
            renderStatus(statusCache.data);
            return;
        }

        // Fetch new data
        const response = await fetchWithRetry(API_URL, {
            method: "GET",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            cache: "force-cache",
        });

        const data = await response.json();

        // Update cache
        statusCache.data = data;
        statusCache.timestamp = now;

        renderStatus(data);
    } catch (error) {
        console.error("Error al cargar el estado:", error);
        document.getElementById("status").innerHTML = `
            <div id="container" class="text-center">
                <p>Error al cargar el estado. Intentando de nuevo...</p>
            </div>
        `;
    }
}

// Configure observer for lazy loading
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                displayLatestStatus();
                observer.disconnect();
            }
        });
    });

    const statusElement = document.getElementById("status");
    if (statusElement) {
        observer.observe(statusElement);
    }
}

// Initialization function
function initStatusManager() {
    // Show initial loading status
    const statusElement = document.getElementById("status");
    if (statusElement) {
        statusElement.innerHTML = `
            <div id="container" class="text-center">
                <p>Cargando estado...</p>
            </div>
        `;
    }

    // Configure the observer
    setupIntersectionObserver();

    // Configure periodic updates
    setInterval(displayLatestStatus, UPDATE_INTERVAL);
}

// Export required functions
export { initStatusManager, displayLatestStatus };
