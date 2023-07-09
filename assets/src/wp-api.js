// WP REST API

// Require dayjs from 'dayjs'
const locale_es_mx = require('dayjs/locale/es-mx');
const dayjs = require('dayjs');
dayjs.locale('es-mx');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// API URLs
const latestPosts = "https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=5";
const mode7LatestPost = "https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=1&tags=778";

// Using Promise syntax
function displayLatestPosts() {
    fetch(latestPosts, {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}})
      .then(response => response.json())
      .then(data => {
        // Retrieve last 5 posts, fetch links and display them on the homepage
        for (let i = 0; i < data.length; i++) {
            document.getElementById("latest-posts").innerHTML += `<li><a href="${data[i].link}" data-toggle="tooltip" data-placement="top" title="${data[i].title.rendered}">${data[i].title.rendered}</a></li>`;
        }

        // Retrieve newest post, fetch link and display it on the footer
        console.log(data[0].link);
        document.getElementById("blog").innerHTML += `<li><a href="${data[0].link}" data-toggle="tooltip" data-placement="top" title="${data[0].title.rendered}">${data[0].title.rendered}</a></li>`;
      })
      .catch(error => console.error(error));
}

function displayMode7LatestPost() {
    fetch(mode7LatestPost, {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}})
      .then(response => response.json())
      .then(data => {
        // Retrieve latest post from tag 'Mode 7 Podcast' via API and fetch link
        document.getElementById("mode-7-podcast-latest-episode").append('<a href="' + data[0].link + '" data-toggle="tooltip" data-placement="top" title="' + data[0].title.rendered + '">' + data[0].title.rendered + '</a>');

        // Retrieve latest post timestamp from tag 'Mode 7 Podcast' via API and fetch link
        const lastUpdatedIso = data[0].date;
        let lastUpdatedRelative = dayjs().to(lastUpdatedIso);
        document.getElementById("mode-7-podcast-latest-episode-timestamp").append('<a href="' + data[0].link + '"><code>Última actualización: ' + lastUpdatedRelative + '</code></a>');
      })
      .catch(error => console.error(error));
}

// Function calls
displayLatestPosts();
displayMode7LatestPost();

// Append total post count to element #contador-posts in "Acerca de" page
$.get('https://blog.luiscarlospando.com/wp-json/wp/v2/posts', function (data, status, request) {
    postCount = request.getResponseHeader('x-wp-total');
    $('#contador-posts').append(postCount);
});