async function loadYouTubeEmbed() {
    const currentPath = window.location.pathname;

    if (
        currentPath !== "/live" &&
        currentPath !== "/live/" &&
        !currentPath.endsWith("/live")
    ) {
        return;
    }

    const playerContainer = document.getElementById("youtube-player");
    const chatContainer = document.getElementById("mijostreams-chat");
    const livestreamContainer = document.getElementById(
        "mijostreams-livestream"
    );
    const embedResponsive = livestreamContainer
        ? livestreamContainer.querySelector(".embed-responsive")
        : null;
    const btnContainer = document.getElementById("btn-mijostreams");

    try {
        const response = await fetch(
            "https://luiscarlospando.com/api/checkYouTubeLiveStatus"
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            // EN VIVO
            const videoId = data.items[0].id.videoId;

            if (livestreamContainer) {
                livestreamContainer.classList.add("col-lg-8");
            }

            if (embedResponsive) {
                embedResponsive.classList.add("embed-responsive-16by9");
            }

            if (chatContainer) {
                chatContainer.classList.remove("d-none");
            }

            if (btnContainer) {
                btnContainer.classList.remove("d-none");
            }

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
                chatContainer.innerHTML += `
                    <iframe
                        src="https://www.youtube.com/live_chat?v=${videoId}&embed_domain=luiscarlospando.com"
                        width="100%"
                        height="422"
                        frameborder="0">
                    </iframe>
                `;
            }
        } else {
            // NO HAY STREAM
            if (livestreamContainer) {
                livestreamContainer.classList.remove("col-lg-8");
            }

            if (embedResponsive) {
                embedResponsive.classList.remove("embed-responsive-16by9");
            }

            if (chatContainer) {
                chatContainer.classList.add("d-none");
            }

            if (btnContainer) {
                btnContainer.classList.add("d-none");
            }

            if (playerContainer) {
                playerContainer.innerHTML = `<p>No hay stream activo en este momento.</p>`;
            }
        }
    } catch (error) {
        console.error("Error loading YouTube embed:", error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadYouTubeEmbed();
});
