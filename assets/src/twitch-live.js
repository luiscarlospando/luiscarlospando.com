// Function to fetch live status from Twitch API
async function checkLiveStatus() {
    const clientId = "vfumpr4f4psz8fm5k2bs0zupvrtgge"; // Replace with your Twitch Client ID
    const channelName = "mijostreams"; // Replace with your Twitch Channel Name
    const mijoStreamsLivestreamAlert = document.getElementById(
        "mijostreams-livestream-alert"
    );
    const accessToken = "2f397elmxeip9cll2tsjxf934s8sk6"; // Replace with your valid Twitch Access Token

    try {
        const response = await fetch(
            `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
            {
                headers: {
                    "Client-ID": clientId,
                    Authorization: `Bearer ${accessToken}`, // Use the new valid token
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Log the response to see what data is returned

        if (data.data && data.data.length > 0) {
            mijoStreamsLivestreamAlert.style.display = "block";
        } else {
            mijoStreamsLivestreamAlert.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching live status:", error);
        // Optionally, handle token refresh here if needed
    }
}

// Call the function after document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    checkLiveStatus();

    // Call the function every 1 minute (or adjust the interval as needed)
    setInterval(checkLiveStatus, 60000); // 60000 milliseconds = 1 minute
});
