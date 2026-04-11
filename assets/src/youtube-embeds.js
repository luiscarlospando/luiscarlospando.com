async function loadYouTubeEmbed() {
    const currentPath = window.location.pathname;

    if (
        currentPath !== "/live" &&
        currentPath !== "/live/" &&
        !currentPath.endsWith("/live")
    ) {
        return; // It only runs on /live
    }

    const playerContainer = document.getElementById("youtube-player");
    const chatContainer = document.getElementById("youtube-chat");

    try {
        const response = await fetch(
            "https://luiscarlospando.com/api/checkYouTubeLiveStatus"
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;

            if (playerContainer) {
                playerContainer.innerHTML = `
                    <iframe
                        src="https://www.youtube.com/embed/${videoId}"
                        width="100%"
                        height="100%"
                        frameborder="0"
                        allowfullscreen>
                    </iframe>
                `;
            }

            if (chatContainer) {
                chatContainer.innerHTML = `
                    <iframe
                        src="https://www.youtube.com/live_chat?v=${videoId}&embed_domain=luiscarlospando.com"
                        width="100%"
                        height="100%"
                        frameborder="0">
                    </iframe>
                `;
            }
        } else {
            if (playerContainer) {
                playerContainer.innerHTML = `<p>No hay stream activo en este momento.</p>`;
            }
            if (chatContainer) {
                chatContainer.style.display = "none";
            }
        }
    } catch (error) {
        console.error("Error loading YouTube embed:", error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadYouTubeEmbed();
});
