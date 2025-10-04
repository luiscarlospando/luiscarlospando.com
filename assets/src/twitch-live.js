// Function to fetch live status from your serverless function
async function checkLiveStatus() {
    const heymijotvLiveAlert = document.getElementById("heymijotv-live-alert");

    // Skip everything if we're already on the /live page
    const currentPath = window.location.pathname;

    if (
        currentPath === "/live" ||
        currentPath === "/live/" ||
        currentPath.endsWith("/live")
    ) {
        if (heymijotvLiveAlert) {
            heymijotvLiveAlert.style.display = "none";
        }
        return; // Don't even call the API
    }

    try {
        const response = await fetch(
            "https://luiscarlospando.com/api/checkLiveStatus"
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (data.data && data.data.length > 0) {
            heymijotvLiveAlert.style.display = "block";
        } else {
            heymijotvLiveAlert.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching live status:", error);
    }
}

// Call the function after the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    checkLiveStatus();

    // Call the function every 1 minute (or adjust the interval as needed)
    setInterval(checkLiveStatus, 60000);
});
