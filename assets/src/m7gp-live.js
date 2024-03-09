// Show/Hide Mode 7 Grand Prix Livestream on the Live page
let DateTime = luxon.DateTime; // Initialization
let dt = DateTime.now().setZone("America/Mexico_City");
let dayOfTheWeek = dt.weekday;
let time = dt.toFormat('HH');

const mijosStreamsLivestreamAlert = document.getElementById("mijostreams-livestream-alert"); // Header alert
const mijoStreamsLivestream = document.getElementById("mijostreams-livestream"); // Livestream
const mijoStreamsChat = document.getElementById("mijostreams-chat"); // Chat
const btnMijoStreams = document.getElementById("btn-mijostreams"); // Watch on Twitch

const m7gpLivestreamAlert = document.getElementById("m7gp-livestream-alert"); // Header alert
const m7gpLivestream = document.getElementById("m7gp-livestream"); // Livestream
const btnM7GP = document.getElementById("btn-m7gp"); // Watch on Twitch

// Display livestream and livestream alert only on Thursday nights
if (dayOfTheWeek == 4 && (time >= 21 && time < 23)) {
    if (m7gpLivestream && btnM7GP && mijoStreamsLivestream && mijoStreamsChat && btnMijoStreams) {
        m7gpLivestream.style.display = "block";
        btnM7GP.style.display = "inline-block";

        mijoStreamsLivestream.style.display = "none";
        mijoStreamsChat.style.display = "none";
        btnMijoStreams.style.display = "none";
    }

    mijosStreamsLivestreamAlert.style.display = "none";
    m7gpLivestreamAlert.style.display = "block";
} else {
    if (m7gpLivestream && btnM7GP) {
        m7gpLivestream.style.display = "none";
        btnM7GP.style.display = "none";
    }

    m7gpLivestreamAlert.style.display = "none";
}