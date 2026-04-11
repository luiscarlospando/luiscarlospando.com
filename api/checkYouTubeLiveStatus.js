export default async function handler(req, res) {
    // --- CORS ---
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=600"
    );

    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
        return res.status(500).json({
            error: "Server misconfiguration: Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID",
        });
    }

    try {
        const fetch = (await import("node-fetch")).default;

        const url = new URL("https://www.googleapis.com/youtube/v3/search");
        url.searchParams.set("part", "snippet");
        url.searchParams.set("channelId", channelId);
        url.searchParams.set("eventType", "live");
        url.searchParams.set("type", "video");
        url.searchParams.set("key", apiKey);

        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({
                error: "Failed to fetch data from YouTube",
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
