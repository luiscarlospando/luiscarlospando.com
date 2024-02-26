// Show/Hide Mode 7 Grand Prix Livestream
let DateTime = luxon.DateTime; // Initialization
let dt = DateTime.now().setZone("America/Mexico_City");
let dayOfTheWeek = dt.weekday;
let time = dt.toFormat('HH');

const m7gpLivestreamAlert = document.getElementById("m7gp-livestream-alert");
const m7gpLivestream = document.getElementById("m7gp-livestream");
const btnM7GP = document.getElementById("btn-m7gp");

const luisCarlosPandoLivestream = document.getElementById("luiscarlospando-livestream");
const luisCarlosPandoChat = document.getElementById("luiscarlospando-chat");
const btnLuisCarlosPando = document.getElementById("btn-luiscarlospando");

// Twitch badges
const badgeTwitchMijo = document.getElementById("badge-twitch-mijo");
const badgeTwitchSkynet = document.getElementById("badge-twitch-skynet");

// Display livestream and livestream alert only on Thursday nights
if (dayOfTheWeek == 4 && (time >= 21 && time < 23)) {
    if (m7gpLivestream && btnM7GP && luisCarlosPandoLivestream && luisCarlosPandoChat && btnLuisCarlosPando) {
        m7gpLivestream.style.display = "block";
        btnM7GP.style.display = "inline-block";
        badgeTwitchSkynet.style.display = "inline-block";

        luisCarlosPandoLivestream.style.display = "none";
        luisCarlosPandoChat.style.display = "none";
        btnLuisCarlosPando.style.display = "none";
        badgeTwitchMijo.style.display = "none";
    }

    m7gpLivestreamAlert.style.display = "block";
} else {
    if (m7gpLivestream && btnM7GP) {
        m7gpLivestream.style.display = "none";
        btnM7GP.style.display = "none";
        badgeTwitchSkynet.style.display = "none";
    }

    m7gpLivestreamAlert.style.display = "none";
}