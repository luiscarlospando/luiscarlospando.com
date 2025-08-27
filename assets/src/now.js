// Retrieve /now page via omg.lol

// Require dayjs from 'dayjs'
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// Require Showdown dependency to convert Markdown to HTML
const showdown = require("showdown"),
  converter = new showdown.Converter();

// API URL
const api_url = "https://api.omg.lol/address/mijo/now";

// Using Promise syntax
function getNowContent() {
  fetch(api_url, {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((data) => {
      const nowContent = data.response.now.content;
      const nowUpdated = data.response.now.updated;
      const lastUpdated = dayjs.unix(nowUpdated);

      if (document.getElementById("now-updated") !== null) {
        console.log("✅ #now-updated si existe en el DOM");

        // 1. Create both relative and machine-readable date formats
        const relativeTimeContent = dayjs().to(lastUpdated);
        const machineReadableDateTime = lastUpdated.toISOString();

        // 2. Build the full <time> element as an HTML string
        const timeElementHTML = `<time datetime="${machineReadableDateTime}">${relativeTimeContent}</time>`;

        // 3. Inject the complete <time> element into the placeholder span
        document.getElementById("now-updated").innerHTML = timeElementHTML;
      } else {
        console.log("❌ #now-updated no existe en el DOM");
      }

      if (document.getElementById("now-content") !== null) {
        console.log("✅ #now-content si existe en el DOM");
        document.getElementById("now-content").innerHTML =
          converter.makeHtml(nowContent);
      } else {
        console.log("❌ #now-content no existe en el DOM");
      }
    })
    .catch((error) => console.error(error));
}

// Function calls
getNowContent();
