// Function to fetch live status from serverless function
async function checkYouTubeLiveStatus() {
    const liveAlert = document.getElementById("live-alert");

    const currentPath = window.location.pathname;

    if (
        currentPath === "/live" ||
        currentPath === "/live/" ||
        currentPath.endsWith("/live")
    ) {
        if (liveAlert) {
            liveAlert.style.display = "none";
        }
        return; // Don't even call the API
    }

    try {
        const response = await fetch(
            "https://luiscarlospando.com/api/checkYouTubeLiveStatus"
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // YouTube API returns "items" with type "liveStreamingDetails" when it's live
        if (data.items && data.items.length > 0) {
            liveAlert.style.display = "block";
        } else {
            liveAlert.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching YouTube live status:", error);
    }
}

// Call the function after the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    checkYouTubeLiveStatus();

    // Call the function every 1 minute (or adjust the interval as needed)
    setInterval(checkYouTubeLiveStatus, 60000);
});
