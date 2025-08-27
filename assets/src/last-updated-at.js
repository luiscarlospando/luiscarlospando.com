// Last updated at (posts and pages) relative time conversions

// Require dayjs from 'dayjs'
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// Retrieve last updated date from pages/posts that has it
const lastUpdatedJekyll = document.getElementById("last-updated-at");

// Check if last updated at element exists, if it is not null, then update date format
if (lastUpdatedJekyll !== null) {
  console.log("✅ #last-updated-at si existe en el DOM");

  // 1. Read the clean date string from the span
  const dateString = lastUpdatedJekyll.innerHTML.trim();

  // 2. Create the necessary date formats with dayjs
  const dateObject = dayjs(dateString);
  const relativeTimeString = dayjs().to(dateObject);
  const machineReadableDateTime = dateObject.toISOString(); // e.g., "2025-08-19T09:35:00.000Z"

  // 3. Create the full <time> HTML element
  const timeElementHTML = `<time datetime="${machineReadableDateTime}">${relativeTimeString}</time>`;

  // 4. Replace the content of the span with <time> element
  lastUpdatedJekyll.innerHTML = timeElementHTML;
} else {
  console.log("❌ #last-updated-at no existe en el DOM");
}
