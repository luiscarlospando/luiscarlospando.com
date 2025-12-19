// Auto-pause other audio players when one starts playing
document.addEventListener("DOMContentLoaded", function () {
    const audioPlayers = document.querySelectorAll("audio");

    // Only run if there are at least 2 audio players
    if (audioPlayers.length >= 2) {
        audioPlayers.forEach(function (player) {
            player.addEventListener("play", function () {
                // Pause all other audio players
                audioPlayers.forEach(function (otherPlayer) {
                    if (otherPlayer !== player) {
                        otherPlayer.pause();
                    }
                });
            });
        });
    }
});
