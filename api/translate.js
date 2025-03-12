export default async function handler(req, res) {
    // Define allowed origins
    const allowedOrigins = [
        "https://luiscarlospando.com",
        "https://blog.luiscarlospando.com",
    ];
    const origin = req.headers.origin;

    // Check if the origin is in our allowed list
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    // Handle preflight request (OPTIONS)
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    // Handle actual request
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const apiKey = process.env.DEEPL_API_KEY;

    if (!apiKey) {
        console.error("Missing DeepL API key");
        return res.status(500).json({
            error: "Server misconfiguration: Missing DeepL API key",
        });
    }

    try {
        const { texts, targetLang } = req.body;

        if (!texts || !targetLang) {
            return res.status(400).json({
                error: "Missing required parameters",
            });
        }

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

        console.log("DeepL response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("DeepL API Error:", response.status, errorText);
            return res.status(response.status).json({
                error: "Failed to fetch translations from DeepL",
                details: errorText,
            });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching translations:", error);
        return res
            .status(500)
            .json({ error: "Internal Server Error", details: error.message });
    }
}
