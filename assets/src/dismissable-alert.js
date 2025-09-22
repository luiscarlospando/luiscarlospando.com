document.addEventListener("DOMContentLoaded", function () {
    const alertBar = document.getElementById("dismissable-alert");
    const closeButton = document.getElementById("alert-close");

    // Helper functions for cookie management
    function setCookie(name, value, days, domain) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        const domainString = domain ? `; domain=${domain}` : "";
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/${domainString}`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Get the root domain (e.g., "luiscarlospando.com" from "blog.luiscarlospando.com")
    function getRootDomain() {
        const hostname = window.location.hostname;
        const parts = hostname.split(".");

        // If it's already a root domain (no subdomain), return as is
        if (parts.length <= 2) {
            return hostname;
        }

        // Return the last two parts (root domain)
        return `.${parts.slice(-2).join(".")}`;
    }

    if (alertBar) {
        const rootDomain = getRootDomain();

        // Check if alert was previously closed (check both localStorage and cookie for backwards compatibility)
        const wasClosedLS = localStorage.getItem("alertClosed");
        const wasClosedCookie = getCookie("alertClosed");

        // Show with fade-in if not previously closed
        if (!wasClosedLS && !wasClosedCookie) {
            setTimeout(() => {
                alertBar.classList.add("show");
            }, 100); // a small delay to ensure transition
        }

        // Close with fade-out and save in both localStorage and cookie
        if (closeButton) {
            closeButton.addEventListener("click", function () {
                alertBar.classList.remove("show");

                // Save to localStorage (for current domain)
                localStorage.setItem("alertClosed", "true");

                // Save to cookie (shared across subdomains) - expires in 30 days
                setCookie("alertClosed", "true", 30, rootDomain);
            });
        }
    }
});
