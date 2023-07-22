// Retrieve /now page via omg.lol

// Require dayjs from 'dayjs'
const locale_es_mx = require('dayjs/locale/es-mx');
const dayjs = require('dayjs');
dayjs.locale('es-mx');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// Require Showdown dependency to convert Markdown to HTML
const showdown  = require('showdown'),
    converter = new showdown.Converter()

// API URL
const api_url = "https://api.omg.lol/address/mijo/now";

// Using Promise syntax
function getNowContent() {
    fetch(api_url, {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}})
      .then(response => response.json())
      .then(data => {
        const nowContent = data.response.now.content;
        const nowUpdated = data.response.now.updated;
        let lastUpdated = dayjs.unix(nowUpdated);
        let relativeTimeContent = dayjs().to(lastUpdated);

        if (document.getElementById("now-updated") !== null) { 
          document.getElementById("now-updated").innerHTML = relativeTimeContent;
        } else {
          console.log("#now-updated no existe en el DOM");
        }

        if (document.getElementById("now-content") !== null) { 
          document.getElementById("now-content").innerHTML = converter.makeHtml(nowContent);
        } else {
          console.log("#now-content no existe en el DOM");
        }
      })
      .catch(error => console.error(error));
}

// Function calls
getNowContent();