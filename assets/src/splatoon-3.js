// Splatnet RSS Feed
jQuery(function ($) {
    $("#splatlog-3").rss("https://stat.ink/@mijo/spl3.en-US.rss", {
        limit: 1,
        ssl: true,
        layoutTemplate: "<div style='display: inline;'>{entries}</div>",
        entryTemplate: '<a href="{url}" target="_blank">{title} <i class="fa-solid fa-arrow-up-right-from-square" data-toggle="tooltip" data-placement="top" title="Abrir en nueva pestaña"></i></a>'
    });

    $("#splatlog-3-timestamp").rss("https://stat.ink/@mijo.3.en-US.rss", {
        limit: 1,
        ssl: true,
        layoutTemplate: "<div style='display: inline;'>{entries}</div>",
        entryTemplate: '<a href="https://stat.ink/@mijo/spl3" target="_blank"><code>Última actualización: {date}</code></a>'
    });
});

// Retrieve latest post timestamp from stat.ink via API and fetch link (Splatoon 3)
$.get('https://stat.ink/@mijo/spl3/index.json', function (data) {
    // Last update
    $('#last-updated-3').append(data.updated_at.iso8601);

    // Function to truncate percentages
    function truncate(value) {
        let result = Math.trunc(value * Math.pow(10, 2)) / Math.pow(10, 2);
        return result;
    }

    // Turf War
    $('#turf-battles-3').append(data.nawabari.battles);
    $('#turf-win_pct-3').append(truncate(data.nawabari.win_pct));
    $('#turf-kill_ratio-3').append(data.nawabari.kill_ratio);
    $('#turf-kill_total-3').append(data.nawabari.kill_total);
    $('#turf-kill_avg-3').append(truncate(data.nawabari.kill_avg));
    $('#turf-kill_per_min-3').append(truncate(data.nawabari.kill_per_min));
    $('#turf-death_total-3').append(data.nawabari.death_total);
    $('#turf-death_avg-3').append(truncate(data.nawabari.death_avg));
    $('#turf-death_per_min-3').append(truncate(data.nawabari.death_per_min));

    // Ranked Battle
    $('#ranked-battles-3').append(data.gachi.battles);
    $('#ranked-win_pct-3').append(truncate(data.gachi.win_pct));
    $('#ranked-kill_ratio-3').append(data.gachi.kill_ratio);
    $('#ranked-kill_total-3').append(data.gachi.kill_total);
    $('#ranked-kill_avg-3').append(truncate(data.gachi.kill_avg));
    $('#ranked-kill_per_min-3').append(truncate(data.gachi.kill_per_min));
    $('#ranked-death_total-3').append(data.gachi.death_total);
    $('#ranked-death_avg-3').append(truncate(data.gachi.death_avg));
    $('#ranked-death_per_min-3').append(truncate(data.gachi.death_per_min));

    // Current rank
    $('#ranked-3').append(data[0].rank_before.name.en_US);
    console.log(data[0]);
});