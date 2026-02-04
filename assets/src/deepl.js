// Detect user language
const userLang = navigator.language || navigator.userLanguage;

// Cookies across subdomains
function setCookie(name, value, days) {
    const domain = ".luiscarlospando.com";
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;domain=${domain}`;
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

function deleteCookie(name) {
    const domain = ".luiscarlospando.com";
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`;
}

// ---- Language preference / secret token
let personalLanguagePreference = getCookie("personalLanguagePreference");

const urlParams = new URLSearchParams(window.location.search);
const secretToken = urlParams.get("lang_token");
const SECRET_TOKEN = "lcp-es";

if (secretToken === SECRET_TOKEN) {
    setCookie("personalLanguagePreference", "es", 365);
    window.history.replaceState({}, document.title, window.location.pathname);
} else if (secretToken === "clear") {
    deleteCookie("personalLanguagePreference");
    window.history.replaceState({}, document.title, window.location.pathname);
}

// ------------------------------
// Translation caching utilities
// ------------------------------

// Version your cache in case you want to reset later
const CACHE_VERSION = "v1";
const LS_PREFIX = `deepl_cache_${CACHE_VERSION}:`;

function makeCacheKey(targetLang, text) {
    return `${LS_PREFIX}${targetLang}|${text}`;
}

function getLocalTranslation(targetLang, text) {
    try {
        return localStorage.getItem(makeCacheKey(targetLang, text));
    } catch {
        return null;
    }
}

function setLocalTranslation(targetLang, text, translated) {
    try {
        localStorage.setItem(makeCacheKey(targetLang, text), translated);
    } catch {
        // Ignore quota errors
    }
}

// Page cache (don’t translate same page again in same session)
function isPageAlreadyTranslated(targetLang) {
    try {
        const key = `deepl_translated:${CACHE_VERSION}:${targetLang}:${location.pathname}`;
        return sessionStorage.getItem(key) === "1";
    } catch {
        return false;
    }
}

function markPageTranslated(targetLang) {
    try {
        const key = `deepl_translated:${CACHE_VERSION}:${targetLang}:${location.pathname}`;
        sessionStorage.setItem(key, "1");
    } catch {
        // ignore
    }
}

// ------------------------------
// Main translate function
// ------------------------------
async function translatePage(targetLang) {
    // Skip translation if personal preference is set to Spanish
    if (personalLanguagePreference === "es") {
        return;
    }

    // Skip translation if quota exceeded
    if (getCookie("translationQuotaExceeded") === "true") {
        return;
    }

    // Normalize targetLang
    const normalizedLang = (targetLang || "").substring(0, 2).toUpperCase();
    if (!normalizedLang || normalizedLang === "ES") return;

    // If we already translated this page in this session, skip
    if (isPageAlreadyTranslated(normalizedLang)) {
        return;
    }

    // ---- Collect text nodes
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
        const parentTag = node.parentNode && node.parentNode.tagName;

        // Skip script/style/noscript
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parentTag)) continue;

        // Skip very short nodes (saves quota and calls)
        const trimmed = node.nodeValue.trim();
        if (trimmed.length <= 1) continue;

        // Preserve spacing
        const needsLeadingSpace =
            node.previousSibling &&
            node.previousSibling.nodeType === Node.ELEMENT_NODE;
        const needsTrailingSpace =
            node.nextSibling && node.nextSibling.nodeType === Node.ELEMENT_NODE;

        textNodes.push({
            node,
            needsLeadingSpace,
            needsTrailingSpace,
        });
    }

    if (!textNodes.length) return;

    // ------------------------------
    // IMPORTANT LIMITERS
    // ------------------------------
    const batchSize = 25; // smaller batch = lower payload risk
    const MAX_REQUESTS_PER_PAGE = 6; // hard cap invocations per page
    let requestsMade = 0;

    // Pre-apply cached translations and build the list of missing ones
    // We translate only missing strings.
    const missing = [];

    for (const item of textNodes) {
        let text = item.node.nodeValue.trim();

        if (item.needsLeadingSpace) text = " " + text;
        if (item.needsTrailingSpace) text = text + " ";

        const cachedTranslation = getLocalTranslation(normalizedLang, text);
        if (cachedTranslation) {
            item.node.nodeValue = cachedTranslation;
        } else {
            missing.push({ item, text });
        }
    }

    // If everything was cached, mark page translated and exit
    if (!missing.length) {
        markPageTranslated(normalizedLang);
        return;
    }

    // ---- Translate missing strings in capped batches
    for (let i = 0; i < missing.length; i += batchSize) {
        if (requestsMade >= MAX_REQUESTS_PER_PAGE) break;

        const batch = missing.slice(i, i + batchSize);
        const textsToTranslate = batch.map((x) => x.text);

        try {
            requestsMade++;

            const response = await fetch(
                "https://luiscarlospando.com/api/translate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        texts: textsToTranslate,
                        targetLang: normalizedLang,
                    }),
                }
            );

            if (response.status === 456) {
                setCookie("translationQuotaExceeded", "true", 1);
                return;
            }

            if (!response.ok) {
                throw new Error(`Translation API error: ${response.status}`);
            }

            const data = await response.json();

            if (
                !data ||
                !data.translations ||
                !Array.isArray(data.translations)
            ) {
                continue;
            }

            // Apply translations back to DOM + write to localStorage cache
            data.translations.forEach((t, idx) => {
                const { item, text } = batch[idx] || {};
                if (!item || !t || typeof t.text !== "string") return;

                let translatedText = t.text;

                // preserve spacing (same as your original)
                if (item.needsLeadingSpace && !translatedText.startsWith(" ")) {
                    translatedText = " " + translatedText;
                }
                if (item.needsTrailingSpace && !translatedText.endsWith(" ")) {
                    translatedText = translatedText + " ";
                }

                item.node.nodeValue = translatedText;
                setLocalTranslation(normalizedLang, text, translatedText);
            });
        } catch (error) {
            console.error("Translation error:", error);
        }
    }

    // Mark page translated even if capped (prevents repeat spam)
    markPageTranslated(normalizedLang);
}

// ------------------------------
// Init translation
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // Reset quota exceeded flag after a day (optional)
    const lastReset = getCookie("quotaResetDate");
    const today = new Date().toDateString();
    if (lastReset !== today) {
        deleteCookie("translationQuotaExceeded");
        setCookie("quotaResetDate", today, 1);
    }

    // Only translate if user language is not Spanish and personal pref isn't Spanish
    if (
        userLang.substring(0, 2) !== "es" &&
        personalLanguagePreference !== "es"
    ) {
        translatePage(userLang);
    }
});
