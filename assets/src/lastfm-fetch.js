// Top 10 artists from Last.fmin the past month

// Require dayjs from 'dayjs'
const locale_es_mx = require('dayjs/locale/es-mx');
const dayjs = require('dayjs');
dayjs.locale('es-mx');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// API URL (customized to get top 10 artists of the past month, 📃 docs: https://www.last.fm/api/show/user.getTopArtists)
const lastfm_api = "https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=luiscarlospando&api_key=28dd68a56fe0bebb7db5a287d6fdb4bc&format=json&period=1month&limit=10";

// Using Promise syntax
function displayLastFmTopArtists() {
  fetch(lastfm_api, {
      method: "GET",
      headers: {"Content-type": "application/json;charset=UTF-8"}})
    .then(response => response.json())
    .then(data => {
      // Retrieve last 10 posts (specified on API URL), fetch links and display them on the homepage
      let ready = (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
      }

      ready(() => { 
        /* Do things after DOM has fully loaded */
        if (document.getElementById("lastfm-top-artists") !== null) {
          console.log('tuuut');
          for (let i = 0; i < data.topartists.artist.length; i++) {
              document.getElementById("lastfm-top-artists").innerHTML += `<li><a href="${data.topartists.artist[i].url}" target="_blank">${data.topartists.artist[i].name}</a></li>`;
          }
        } else {
            console.log("#lastfm-top-artists no existe en el DOM");
        }
      });
    })
    .catch(error => console.error(error));
}

// Function calls
displayLastFmTopArtists();