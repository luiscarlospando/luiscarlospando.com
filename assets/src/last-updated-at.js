// Last updated at (posts and pages) relative time conversions

// Require dayjs from 'dayjs'
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// Function to process the last updated date
function processLastUpdatedDate() {
    const lastUpdatedJekyll = document.getElementById("last-updated-at");

    // Check if last updated at element exists and has valid content
    if (
        lastUpdatedJekyll !== null &&
        lastUpdatedJekyll.innerHTML.trim() !== "Cargando..."
    ) {
        console.log("✅ #last-updated-at si existe en el DOM");

        // 1. Read the clean date string from the span
        const dateString = lastUpdatedJekyll.innerHTML.trim();

        // 2. Create the necessary date formats with dayjs
        const dateObject = dayjs(dateString);

        // Check if the date is valid before proceeding
        if (!dateObject.isValid()) {
            console.log("❌ Fecha inválida:", dateString);
            return;
        }

        const relativeTimeString = dayjs().to(dateObject);
        const machineReadableDateTime = dateObject.toISOString();

        // 3. Create the full <time> HTML element
        const timeElementHTML = `<time datetime="${machineReadableDateTime}">${relativeTimeString}</time>`;

        // 4. Replace the content of the span with <time> element
        lastUpdatedJekyll.innerHTML = timeElementHTML;
    } else {
        console.log("❌ #last-updated-at no existe en el DOM o está cargando");
    }
}

// Run on DOMContentLoaded for static pages
document.addEventListener("DOMContentLoaded", processLastUpdatedDate);

// Listen for the custom event from loved tracks script
document.addEventListener("lastUpdatedDateReady", processLastUpdatedDate);
