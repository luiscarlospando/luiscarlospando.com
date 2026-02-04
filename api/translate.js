import crypto from "crypto";

const TRANSLATION_CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24h
const translationCache = new Map();

/**
 * Very simple cache:
 * key -> { value, expiresAt }
 */
function cacheGet(key) {
    const entry = translationCache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
        translationCache.delete(key);
        return null;
    }

    return entry.value;
}

function cacheSet(key, value) {
    translationCache.set(key, {
        value,
        expiresAt: Date.now() + TRANSLATION_CACHE_TTL_MS,
    });
}

function makeCacheKey({ texts, targetLang }) {
    const hash = crypto
        .createHash("sha256")
        .update(JSON.stringify({ texts, targetLang }))
        .digest("hex");

    return hash;
}

export default async function handler(req, res) {
    // --- CORS ---
    const allowedOrigins = [
        "https://luiscarlospando.com",
        "https://blog.luiscarlospando.com",
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    // Preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const apiKey = process.env.DEEPL_API_KEY;
    if (!apiKey) {
        return res.status(500).json({
            error: "Server misconfiguration: Missing DeepL API key",
        });
    }

    try {
        const { texts, targetLang } = req.body;

        if (!texts || !targetLang) {
            return res
                .status(400)
                .json({ error: "Missing required parameters" });
        }

        // validate input
        if (!Array.isArray(texts) || texts.length === 0) {
            return res
                .status(400)
                .json({ error: "`texts` must be a non-empty array" });
        }

        // prevent abuse: too many strings in one call
        if (texts.length > 30) {
            return res.status(400).json({
                error: "`texts` is too large (max 30 strings per request)",
            });
        }

        // prevent abuse: max length per string
        const tooLong = texts.some(
            (t) => typeof t !== "string" || t.length > 2000
        );
        if (tooLong) {
            return res.status(400).json({
                error: "Each text must be a string up to 2000 characters",
            });
        }

        // CACHE CHECK
        const key = makeCacheKey({ texts, targetLang });
        const cached = cacheGet(key);
        if (cached) {
            // Helpful header so you can confirm caching is working
            res.setHeader("x-translate-cache", "HIT");
            return res.status(200).json(cached);
        }

        res.setHeader("x-translate-cache", "MISS");

        const fetch = (await import("node-fetch")).default;

        const response = await fetch(
            "https://api-free.deepl.com/v2/translate",
            {
                method: "POST",
                headers: {
                    Authorization: `DeepL-Auth-Key ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: texts,
                    target_lang: targetLang,
                    source_lang: "ES",
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({
                error: "Failed to fetch translations from DeepL",
                details: errorText,
            });
        }

        const data = await response.json();

        // store in cache
        cacheSet(key, data);

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}
