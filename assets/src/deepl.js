// Detect user language
const userLang = navigator.language || navigator.userLanguage;

// Check for personal preference in localStorage
let personalLanguagePreference = localStorage.getItem(
    "personalLanguagePreference"
);

// Check for secret URL parameter
const urlParams = new URLSearchParams(window.location.search);
const secretToken = urlParams.get("lang_token");

// Language secret token
const SECRET_TOKEN = "lcp-es";

// If the secret token is present and correct, set the preference
if (secretToken === SECRET_TOKEN) {
    localStorage.setItem("personalLanguagePreference", "es");
    // Remove the parameter from URL
    window.history.replaceState({}, document.title, window.location.pathname);
} else if (secretToken === "clear") {
    localStorage.removeItem("personalLanguagePreference");
    window.history.replaceState({}, document.title, window.location.pathname);
}

// Function to translate page content
async function translatePage(targetLang) {
    // Skip translation if personal preference is set to Spanish
    if (personalLanguagePreference === "es") {
        console.log("Personal preference set to Spanish, skipping translation");
        return;
    }

    // Check if we've already exceeded the quota
    if (localStorage.getItem("translationQuotaExceeded") === "true") {
        console.log(
            "Translation quota exceeded previously, skipping translation"
        );
        return;
    }

    // Get all text nodes within the body
    const textNodes = [];
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) =>
                node.nodeValue.trim()
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT,
        }
    );

    let node;
    while ((node = walker.nextNode())) {
        // Skip script and style tags
        if (
            !["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.parentNode.tagName)
        ) {
            textNodes.push(node);
        }
    }

    // Batch translations for better performance
    const batchSize = 50; // Adjust based on API limits
    for (let i = 0; i < textNodes.length; i += batchSize) {
        const batch = textNodes.slice(i, i + batchSize);
        const textsToTranslate = batch
            .map((node) => node.nodeValue.trim())
            .filter((text) => text.length > 0);

        if (textsToTranslate.length === 0) continue;

        try {
            const response = await fetch("/api/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    texts: textsToTranslate,
                    targetLang: targetLang.substring(0, 2).toUpperCase(),
                }),
            });

            if (response.status === 456) {
                console.error("DeepL translation quota exceeded");
                localStorage.setItem("translationQuotaExceeded", "true");
                return;
            }

            if (!response.ok) {
                throw new Error(`Translation API error: ${response.status}`);
            }

            const data = await response.json();
            if (data.translations) {
                let translationIndex = 0;
                batch.forEach((node) => {
                    if (node.nodeValue.trim().length > 0) {
                        node.nodeValue =
                            data.translations[translationIndex++].text;
                    }
                });
            }
        } catch (error) {
            console.error("Translation error:", error);
        }
    }
}

// Initialize translation when page loads
document.addEventListener("DOMContentLoaded", () => {
    // Check if current language is different from the site's default language (Spanish)
    if (
        userLang.substring(0, 2) !== "es" &&
        personalLanguagePreference !== "es"
    ) {
        translatePage(userLang);
    }
});

// Reset quota exceeded flag after a day (optional)
const lastReset = localStorage.getItem("quotaResetDate");
const today = new Date().toDateString();
if (lastReset !== today) {
    localStorage.removeItem("translationQuotaExceeded");
    localStorage.setItem("quotaResetDate", today);
}
