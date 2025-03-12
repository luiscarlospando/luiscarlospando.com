// Detect user language
const userLang = navigator.language || navigator.userLanguage;

// Function to set cookie that works across subdomains
function setCookie(name, value, days) {
    const domain = ".luiscarlospando.com";
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;domain=${domain}`;
}

// Function to get cookie
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

// Function to delete cookie
function deleteCookie(name) {
    const domain = ".luiscarlospando.com";
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`;
}

// Check for personal preference in cookies
let personalLanguagePreference = getCookie("personalLanguagePreference");

// Check for secret URL parameter
const urlParams = new URLSearchParams(window.location.search);
const secretToken = urlParams.get("lang_token");

// Language secret token
const SECRET_TOKEN = "lcp-es";

// If the secret token is present and correct, set the preference
if (secretToken === SECRET_TOKEN) {
    setCookie("personalLanguagePreference", "es", 365); // Cookie lasts 1 year
    // Remove the parameter from URL
    window.history.replaceState({}, document.title, window.location.pathname);
} else if (secretToken === "clear") {
    deleteCookie("personalLanguagePreference");
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
    if (getCookie("translationQuotaExceeded") === "true") {
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
            // Add spaces around text nodes that are next to tags
            const needsLeadingSpace =
                node.previousSibling &&
                node.previousSibling.nodeType === Node.ELEMENT_NODE;
            const needsTrailingSpace =
                node.nextSibling &&
                node.nextSibling.nodeType === Node.ELEMENT_NODE;

            textNodes.push({
                node: node,
                needsLeadingSpace: needsLeadingSpace,
                needsTrailingSpace: needsTrailingSpace,
            });
        }
    }

    // Batch translations for better performance
    const batchSize = 50; // Adjust based on API limits
    for (let i = 0; i < textNodes.length; i += batchSize) {
        const batch = textNodes.slice(i, i + batchSize);
        const textsToTranslate = batch
            .map((item) => {
                let text = item.node.nodeValue.trim();
                if (item.needsLeadingSpace) text = " " + text;
                if (item.needsTrailingSpace) text = text + " ";
                return text;
            })
            .filter((text) => text.length > 0);

        if (textsToTranslate.length === 0) continue;

        try {
            const response = await fetch(
                "https://luiscarlospando.com/api/translate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        texts: textsToTranslate,
                        targetLang: targetLang.substring(0, 2).toUpperCase(),
                    }),
                }
            );

            if (response.status === 456) {
                console.error("DeepL translation quota exceeded");
                setCookie("translationQuotaExceeded", "true", 1); // Quota cookie lasts 1 day
                return;
            }

            if (!response.ok) {
                throw new Error(`Translation API error: ${response.status}`);
            }

            const data = await response.json();
            if (data.translations) {
                let translationIndex = 0;
                batch.forEach((item) => {
                    if (item.node.nodeValue.trim().length > 0) {
                        let translatedText =
                            data.translations[translationIndex++].text;
                        // Preserve original spacing
                        if (
                            item.needsLeadingSpace &&
                            !translatedText.startsWith(" ")
                        ) {
                            translatedText = " " + translatedText;
                        }
                        if (
                            item.needsTrailingSpace &&
                            !translatedText.endsWith(" ")
                        ) {
                            translatedText = translatedText + " ";
                        }
                        item.node.nodeValue = translatedText;
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
const lastReset = getCookie("quotaResetDate");
const today = new Date().toDateString();
if (lastReset !== today) {
    deleteCookie("translationQuotaExceeded");
    setCookie("quotaResetDate", today, 1);
}
