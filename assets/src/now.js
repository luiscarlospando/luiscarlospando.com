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

        document.getElementById("now-updated").innerHTML = relativeTimeContent;
        document.getElementById("now-content").innerHTML = converter.makeHtml(nowContent);
      })
      .catch(error => console.error(error));
}

// Function call
getNowContent();