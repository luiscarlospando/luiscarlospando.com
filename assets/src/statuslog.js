// Import dependencies
const dayjs = require("dayjs");
const locale_es_mx = require("dayjs/locale/es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");

// Dayjs configuration
dayjs.locale("es-mx");
dayjs.extend(relativeTime);

// Constants
const API_URL = "https://api.omg.lol/address/mijo/statuses/";
const CACHE_DURATION = 180000; // 3 minutes in milliseconds
const UPDATE_INTERVAL = 180000; // 3 minutes in milliseconds

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
async function displayLatestStatus(forceUpdate = false) {
    try {
        const now = Date.now();

        // Añadir más logs para debugging
        console.log("Timestamp actual:", now);
        console.log("Último timestamp:", statusCache.timestamp);
        console.log("Diferencia:", now - statusCache.timestamp);
        console.log("¿Forzar actualización?:", forceUpdate);
        console.log("¿Hay datos en caché?:", !!statusCache.data);

        // Comentar temporalmente la verificación del caché
        // Only use cache if it's valid and it's not forced
        /*if (
            !forceUpdate &&
            statusCache.data &&
            now - statusCache.timestamp < CACHE_DURATION
        ) {
            console.log('📦 Usando datos en caché');
            renderStatus(statusCache.data);
            return;
        }*/

        console.log("🔄 Haciendo nueva petición a la API");

        // Show loading indicator
        const statusElement = document.getElementById("status");
        if (statusElement) {
            statusElement.classList.add("updating"); // Add updating styles
        }

        const response = await fetchWithRetry(API_URL, {
            method: "GET",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            // cache: forceUpdate ? "no-cache" : "force-cache", // Don't use cache if the update is forced
            cache: "no-store", // Forzar que no use caché del navegador
        });

        const data = await response.json();

        statusCache.data = data;
        statusCache.timestamp = now;

        renderStatus(data);

        // Remove loading indicator
        if (statusElement) {
            statusElement.classList.remove("updating");
        }
    } catch (error) {
        console.error("Error al cargar el estado:", error);
        const statusElement = document.getElementById("status");
        if (statusElement) {
            statusElement.innerHTML = `
                <div id="container" class="text-center">
                    <p>Error al cargar el estado. Intentando de nuevo...</p>
                    <button class="btn btn-primary" onclick="window.forceStatusUpdate()">
                        <i class="fa-solid fa-rotate-right"></i> Reintentar
                    </button>
                </div>
            `;
        }
    }
}

// Function to remove the update
function forceStatusUpdate() {
    return displayLatestStatus(true);
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
    console.log("🚀 Iniciando StatusManager");

    const statusElement = document.getElementById("status");
    if (statusElement) {
        statusElement.innerHTML = `
            <div id="container" class="text-center">
                <p>Cargando estado...</p>
            </div>
        `;
    }

    // Exposes forced update function globally
    window.forceStatusUpdate = forceStatusUpdate;

    setupIntersectionObserver();

    // First load
    displayLatestStatus();

    // Periodic updates (only one setInterval)
    const updateInterval = setInterval(() => {
        console.log(
            "⏰ Ejecutando actualización programada:",
            new Date().toLocaleTimeString()
        );
        displayLatestStatus(true); // Forzar actualización
    }, UPDATE_INTERVAL);

    // Verificar que el intervalo se creó
    console.log("✅ Intervalo configurado");
}

// Export required functions
module.exports = { initStatusManager, displayLatestStatus, forceStatusUpdate };
