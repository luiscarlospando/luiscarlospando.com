export default async function handler(req, res) {
    // --- CORS ---
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Only GET
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // IMPORTANT: cache at the edge
    // Top artists (1 month) changes slowly → cache longer
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=21600, stale-while-revalidate=86400"
    );
    // 21600 = 6 hours

    const apiKey = process.env.LASTFM_API_KEY;
    const username = "luiscarlospando";

    if (!apiKey) {
        return res.status(500).json({
            error: "Server misconfiguration: Missing Last.fm API key",
        });
    }

    try {
        const fetch = (await import("node-fetch")).default;

        const url = new URL("https://ws.audioscrobbler.com/2.0/");
        url.searchParams.set("method", "user.gettopartists");
        url.searchParams.set("user", username);
        url.searchParams.set("api_key", apiKey);
        url.searchParams.set("format", "json");
        url.searchParams.set("period", "1month");
        url.searchParams.set("limit", "10");

        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({
                error: "Failed to fetch data from Last.fm",
                details: errorText,
            });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}
