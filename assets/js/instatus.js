// Retrieve system status via Instatus API
$.get('https://luiscarlospando.instatus.com/summary.json', function (data) {
    let btnSiteVersion = document.getElementById("site-version");
    let status = data.page.status;
    let systemStatus = "";

    switch(status) {
        case "UP":
            btnSiteVersion.classList.add("badge-success");
            systemStatus = '<i class="fa-solid fa-circle-check"></i> En funcionamiento';
            break;
        case "HASISSUES":
            btnSiteVersion.classList.add("badge-danger");
            systemStatus = '<i class="fa-solid fa-circle-exclamation"></i> Hay problemas';
            break;
        case "UNDERMAINTENANCE":
            btnSiteVersion.classList.add("badge-warning");
            systemStatus = '<i class="fa-solid fa-wrench"></i> En mantenimiento';
            break;
        default:
            btnSiteVersion.classList.add("badge-info");
            systemStatus = '<i class="fa-solid fa-circle-minus"></i> Sin información';
    }

    $('#system-status').append(systemStatus);
});