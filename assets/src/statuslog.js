// Retrieve Statuslog latest status with relative time conversions

// Require dayjs from 'dayjs'
const locale_es_mx = require('dayjs/locale/es-mx');
const dayjs = require('dayjs');
dayjs.locale('es-mx');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// API URLs
const latestStatus = "https://api.omg.lol/address/mijo/statuses/";

// Using Promise syntax
function displayLatestStatus() {
    fetch(latestStatus, {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}})
      .then(response => response.json())
      .then(data => {
        // Retrieve lastest status, fetch links and display it on the header
        const lastUpdatedUnix = data.response.statuses[0].created;
        let lastUpdatedIso = dayjs.unix(lastUpdatedUnix);
        let lastUpdatedRelative = dayjs().to(lastUpdatedIso);
        if (document.getElementById("status") !== null) {
            document.getElementById("status").innerHTML += `
                <a href="https://mijo.status.lol/" target="_blank">
                    <div id="container" class="text-center">
                        <p>
                            ${data.response.statuses[0].emoji} ${data.response.statuses[0].content}
                            <br>
                            <small>
                                <em>(${lastUpdatedRelative})</em>
                            </small>
                        </p>
                    </div>
                </a>
            `;
        } else {
            console.log("#status no existe en el DOM");
        }
      })
      .catch(error => console.error(error));
}

// Function calls
displayLatestStatus();