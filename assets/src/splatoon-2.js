// Splatnet RSS Feed
jQuery(function ($) {
    $("#splatlog").rss("https://stat.ink/@mijo.2.en-US.rss", {
        limit: 1,
        ssl: true,
        layoutTemplate: "<div style='display: inline;'>{entries}</div>",
        entryTemplate: '<a href="{url}" target="_blank">{title} <i class="fa-solid fa-arrow-up-right-from-square" data-toggle="tooltip" data-placement="top" title="Abrir en nueva pestaña"></i></a>'
    });

    $("#splatlog-timestamp").rss("https://stat.ink/@mijo.2.en-US.rss", {
        limit: 1,
        ssl: true,
        layoutTemplate: "<div style='display: inline;'>{entries}</div>",
        entryTemplate: '<a href="https://stat.ink/@mijo/spl2" target="_blank"><code>Última actualización: {date}</code></a>'
    });
});

// Retrieve latest post timestamp from stat.ink via API and fetch link (Splatoon 2)
$.get('https://stat.ink/api/v2/user-stats?screen_name=mijo', function (data) {
    // Last update
    $('#last-updated').append(data.updated_at.iso8601);

    // Function to truncate percentages
    function truncate(value) {
        let result = Math.trunc(value * Math.pow(10, 2)) / Math.pow(10, 2);
        return result;
    }

    // Turf War
    $('#turf-battles').append(data.nawabari.battles);
    $('#turf-win_pct').append(truncate(data.nawabari.win_pct));
    $('#turf-kill_ratio').append(data.nawabari.kill_ratio);
    $('#turf-kill_total').append(data.nawabari.kill_total);
    $('#turf-kill_avg').append(truncate(data.nawabari.kill_avg));
    $('#turf-kill_per_min').append(truncate(data.nawabari.kill_per_min));
    $('#turf-death_total').append(data.nawabari.death_total);
    $('#turf-death_avg').append(truncate(data.nawabari.death_avg));
    $('#turf-death_per_min').append(truncate(data.nawabari.death_per_min));

    // Ranked Battle
    $('#ranked-battles').append(data.gachi.battles);
    $('#ranked-win_pct').append(truncate(data.gachi.win_pct));
    $('#ranked-kill_ratio').append(data.gachi.kill_ratio);
    $('#ranked-kill_total').append(data.gachi.kill_total);
    $('#ranked-kill_avg').append(truncate(data.gachi.kill_avg));
    $('#ranked-kill_per_min').append(truncate(data.gachi.kill_per_min));
    $('#ranked-death_total').append(data.gachi.death_total);
    $('#ranked-death_avg').append(truncate(data.gachi.death_avg));
    $('#ranked-death_per_min').append(truncate(data.gachi.death_per_min));

    // Current ranks
    $('#ranked-rainmaker').append(data.gachi.rules.hoko.rank_current);
    $('#ranked-splat-zones').append(data.gachi.rules.area.rank_current);
    $('#ranked-tower-control').append(data.gachi.rules.yagura.rank_current);
    $('#ranked-clam-blitz').append(data.gachi.rules.asari.rank_current);
});