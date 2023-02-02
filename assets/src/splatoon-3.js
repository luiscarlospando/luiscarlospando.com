// Retrieve latest post timestamp from stat.ink via API and fetch link (Splatoon 3)
$.get('https://stat.ink/@mijo/spl3/index.json', function (data) {
    console.log(data);
    // Latest match
    $('#splatlog-3').append('<a href="' + data.url + '" target="_blank">' + data.stage.name.en_US + ' ' + data.result + '</a>');

    // Last update
    $('#last-updated-3').append(data.end_at.iso8601);

    // Function to truncate percentages
    function truncate(value) {
        let result = Math.trunc(value * Math.pow(10, 2)) / Math.pow(10, 2);
        return result;
    }
});