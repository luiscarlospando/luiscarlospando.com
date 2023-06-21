// WP REST API

// Require dayjs from 'dayjs'
const locale_es_mx = require('dayjs/locale/es-mx');
const dayjs = require('dayjs');
dayjs.locale('es-mx');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

// Retrieve latest posts via API and fetch link to show in homepage
$.get('https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=5', function (data) {
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
        $('#latest-posts').append('<li><a href="' + data[i].link + '" data-toggle="tooltip" data-placement="top" title="' + data[i].title.rendered + '">' + data[i].title.rendered + '</a></li>');
    }
});

// Retrieve latest post via API and fetch link
$.get('https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=1', function (data) {
    // console.log(data);
    $('#blog').append('<a href="' + data[0].link + '" data-toggle="tooltip" data-placement="top" title="' + data[0].title.rendered + '">' + data[0].title.rendered + '</a>');
});

// Retrieve latest post from tag 'Mode 7 Podcast' via API and fetch link
$.get('https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=1&tags=778', function (data) {
    // console.log(data);
    $('#mode-7-podcast-latest-episode').append('<a href="' + data[0].link + '" data-toggle="tooltip" data-placement="top" title="' + data[0].title.rendered + '">' + data[0].title.rendered + '</a>');
});

// Retrieve latest post timestamp from tag 'Mode 7 Podcast' via API and fetch link
$.get('https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=1&tags=778', function (data) {
    // console.log(lastUpdatedRelative);
    const lastUpdatedIso = data[0].date;
    let lastUpdatedRelative = dayjs().to(lastUpdatedIso);
    $('#mode-7-podcast-latest-episode-timestamp').append('<a href="' + data[0].link + '"><code>Última actualización: ' + lastUpdatedRelative + '</code></a>');
});

// Append total post count to element #contador-posts in "Acerca de" page
$.get('https://blog.luiscarlospando.com/wp-json/wp/v2/posts', function (data, status, request) {
    postCount = request.getResponseHeader('x-wp-total');
    $('#contador-posts').append(postCount);
});