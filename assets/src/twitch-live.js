// Function to fetch live status from Twitch API
function checkLiveStatus() {
    const clientId = 'vfumpr4f4psz8fm5k2bs0zupvrtgge'; // Replace with your Twitch Client ID
    const channelName = 'mijodido'; // Replace with your Twitch Channel Name
    const twitchLivestreamAlert = document.getElementById("twitch-livestream-alert");

    fetch(`https://api.twitch.tv/helix/streams?user_login=${channelName}`, {
        headers: {
            'Client-ID': clientId,
            'Authorization': 'Bearer 17dobh8sk5k9jk7zhpy6epl2b0klbz' // Replace with your Twitch Access Token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.data.length > 0) {
            twitchLivestreamAlert.style.display = "block";
        } else {
            twitchLivestreamAlert.style.display = "none";
        }
    })
    .catch(error => console.error('Error fetching live status:', error));
}

// Call the function after document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    checkLiveStatus();

    // Call the function every 1 minute (or adjust the interval as needed)
    setInterval(checkLiveStatus, 60000); // 60000 milliseconds = 1 minute
});

// Call the function initially
checkLiveStatus();

// Call the function every 1 minute (or adjust the interval as needed)
setInterval(checkLiveStatus, 60000); // 60000 milliseconds = 1 minute