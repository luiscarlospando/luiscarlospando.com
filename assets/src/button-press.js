const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let clickSoundBuffer = null;

fetch("https://luiscarlospando.com/assets/audio/click-sound.mp3")
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((decodedBuffer) => {
        clickSoundBuffer = decodedBuffer;
    });

function playClickSound() {
    if (!clickSoundBuffer) return;

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const source = audioContext.createBufferSource();
    source.buffer = clickSoundBuffer;
    source.connect(audioContext.destination);
    source.start(0);
}

document.addEventListener("click", function (event) {
    const target = event.target.closest("a, button");

    if (
        target &&
        !target.disabled &&
        !(target.tagName === "A" && target.getAttribute("href") === "#")
    ) {
        playClickSound();
    }
});
