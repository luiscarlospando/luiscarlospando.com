function randomizeWebringLink() {
    const dataEl = document.getElementById("webring-blogblog-data");
    const link = document.getElementById("webring-blogblog-random");
    if (!dataEl || !link) return;

    let webringOthers;
    try {
        webringOthers = JSON.parse(dataEl.textContent);
    } catch (e) {
        return;
    }
    if (!Array.isArray(webringOthers) || webringOthers.length === 0) return;

    const pick = webringOthers[Math.floor(Math.random() * webringOthers.length)];
    link.href = pick.url;
    link.title = `Ir a un sitio aleatorio: ${pick.name}`;
}

document.addEventListener("DOMContentLoaded", randomizeWebringLink);
