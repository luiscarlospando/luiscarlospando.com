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
        if (document.getElementById("status") !== null) {
            const lastUpdated = data.response.statuses[0].created;
            let lastUpdatedRelative = dayjs().to(lastUpdated);

            document.getElementById("status").innerHTML += `
                <a href="${data.response.statuses[0].external_url}" data-toggle="tooltip" data-placement="right" title="Actualizado hace ${lastUpdatedRelative}" target="_blank">
                    <div id="container">
                        <p>${data.response.statuses[0].content}</p>
                    </div>
                    ${data[0].title.rendered}
                </a>`;
        } else {
            console.log("#status no existe en el DOM");
        }
      })
      .catch(error => console.error(error));
}

// Function calls
displayLatestStatus();