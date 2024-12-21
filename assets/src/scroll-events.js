// Select elements only once outside of the scroll event for better performance
const navContainer = document.querySelector(".nav-container");
const backToTop = document.querySelector(".cd-top");
const nowPlaying = document.querySelector(".nowplaying");
const liveAlert = document.querySelector("#heymijotv-live-alert");

// Use throttle with requestAnimationFrame to optimize scroll performance
function throttleRAF(func) {
    let ticking = false;
    return function () {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                func.apply(this, arguments);
                ticking = false;
            });
            ticking = true;
        }
    };
}

// Main function that handles scroll changes
function handleScroll() {
    const scrollY = window.scrollY;

    // Show/hide navbar
    navContainer?.classList.toggle("scrolled-position", scrollY >= 20);

    // Show/hide "back to top" link and "now playing" notification
    if (backToTop && nowPlaying) {
        const shouldShow = scrollY >= 300;
        backToTop.classList.toggle("cd-is-visible", shouldShow);
        nowPlaying.classList.toggle("positionate-nowplaying", shouldShow);
    }

    // Show/hide "live alerts"
    liveAlert?.classList.toggle("positionate-live-alert", scrollY >= 1);
}

// Run once on load to set initial state Run once on load to set initial state
handleScroll();

// Apply throttle to the scroll event
window.addEventListener("scroll", throttleRAF(handleScroll));
