const btnSurpriseMe = document.getElementById("btn-surprise-me");
let cachedTotalPosts = null;

if (btnSurpriseMe) {
    btnSurpriseMe.addEventListener("click", async (e) => {
        e.preventDefault(); // Prevents the link from opening

        const originalText = btnSurpriseMe.innerHTML;
        btnSurpriseMe.disabled = true;

        // Change to loading icon
        btnSurpriseMe.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Espera por favor...';

        try {
            // 50/50 chance: main site or blog
            const useBlog = Math.random() < 0.5;

            console.log(
                useBlog ? "Eligiendo blog..." : "Eligiendo sitio principal..."
            ); // Para debug

            if (useBlog) {
                // Blog route
                if (!cachedTotalPosts) {
                    const initialResponse = await fetch(
                        "https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=1"
                    );
                    cachedTotalPosts = parseInt(
                        initialResponse.headers.get("X-WP-Total")
                    );
                }

                const totalPages = Math.ceil(cachedTotalPosts / 100);
                const randomPage = Math.floor(Math.random() * totalPages) + 1;

                const response = await fetch(
                    `https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=100&page=${randomPage}`
                );
                const posts = await response.json();

                // Filter out RSS/feed URLs
                const blogUrls = posts
                    .map((post) => post.link)
                    .filter(
                        (url) => !url.includes("/feed") && !url.includes("/rss")
                    );

                const randomUrl =
                    blogUrls[Math.floor(Math.random() * blogUrls.length)];

                console.log("Yendo a:", randomUrl); // Debugging
                window.location.href = randomUrl;
            } else {
                // Main site route
                const mainSiteUrls = [
                    "https://luiscarlospando.com/about",
                    "https://luiscarlospando.com/badges",
                    "https://luiscarlospando.com/blogroll",
                    "https://luiscarlospando.com/contact",
                    "https://luiscarlospando.com/changelog",
                    "https://luiscarlospando.com/developer",
                    "https://luiscarlospando.com/discord",
                    "https://luiscarlospando.com/games",
                    "https://luiscarlospando.com/games/favorites",
                    "https://luiscarlospando.com/guestbook",
                    "https://luiscarlospando.com/keys",
                    "https://luiscarlospando.com/links",
                    "https://luiscarlospando.com/live",
                    "https://luiscarlospando.com/games/mario-kart",
                    "https://luiscarlospando.com/games/splatoon",
                    "https://luiscarlospando.com/music",
                    "https://luiscarlospando.com/music/playlist",
                    "https://luiscarlospando.com/newsletter",
                    "https://luiscarlospando.com/now",
                    "https://luiscarlospando.com/photos",
                    "https://luiscarlospando.com/privacy",
                    "https://luiscarlospando.com/subscribe",
                    "https://luiscarlospando.com/support",
                    "https://luiscarlospando.com/uses",
                ];

                const randomUrl =
                    mainSiteUrls[
                        Math.floor(Math.random() * mainSiteUrls.length)
                    ];

                console.log("Yendo a:", randomUrl); // Debugging
                window.location.href = randomUrl;
            }
        } catch (error) {
            console.error("Error fetching blog posts:", error);
            btnSurpriseMe.disabled = false;
            btnSurpriseMe.innerHTML = originalText;
            alert("¡Error al obtener los posts del blog! ¿Volver a intentar?");
        }
    });
}
