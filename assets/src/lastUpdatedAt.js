// Last updated at (posts and pages) relative time conversions

// Require dayjs from 'dayjs'
const locale_es_mx = require('dayjs/locale/es-mx');
const dayjs = require('dayjs');
dayjs.locale('es-mx');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// Retrieve last updated date from posts that has it
const lastUpdatedJekyll = document.getElementById("last-updated-at");

// Check if last updated at element exists, if is not null, then update date format
if (lastUpdatedJekyll !== null) {
    console.log("✅ #last-updated-at si existe en el DOM");
    const lastUpdatedInner = document.getElementById("last-updated-at").innerHTML;
    let lastUpdatedRelative = dayjs().to(lastUpdatedInner);

    // Update date with relative format
    document.getElementById("last-updated-at").innerHTML = lastUpdatedRelative;
} else {
    console.log("❌ #last-updated-at no existe en el DOM");
}