export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const apiKey = process.env.DEEPL_API_KEY;

    if (!apiKey) {
        console.error("Missing DeepL API key");
        return res.status(500).json({
            error: "Server misconfiguration: Missing DeepL API key",
        });
    }

    try {
        const { texts, targetLang } = req.body;
        const fetch = (await import("node-fetch")).default;

        const response = await fetch("https://api.deepl.com/v2/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                auth_key: apiKey,
                text: texts,
                source_lang: "ES",
                target_lang: targetLang,
            }),
        });

        if (!response.ok) {
            if (response.status === 456) {
                console.error("DeepL translation quota exceeded");
                return res.status(456).json({
                    error: "Translation quota exceeded",
                });
            }

            const errorText = await response.text();
            console.error(
                "Failed to fetch translations from DeepL",
                response.status,
                errorText
            );
            return res.status(response.status).json({
                error: "Failed to fetch translations from DeepL",
                details: errorText,
            });
        }

        const data = await response.json();
        console.log("Translations fetched successfully from DeepL");
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching translations:", error);
        return res
            .status(500)
            .json({ error: "Internal Server Error", details: error.message });
    }
}
