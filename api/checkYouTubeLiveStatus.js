let cachedVideoId = null;
let cachedStatus = null; // 'live' | 'offline'
let lastChecked = 0;

async function fetchWithNode(url) {
    const fetch = (await import("node-fetch")).default;
    return fetch(url);
}

async function searchLiveStream(apiKey, channelId) {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("channelId", channelId);
    url.searchParams.set("eventType", "live");
    url.searchParams.set("type", "video");
    url.searchParams.set("key", apiKey);

    const response = await fetchWithNode(url.toString());
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Search failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.items && data.items.length > 0
        ? data.items[0].id.videoId
        : null;
}

async function checkVideoStillLive(apiKey, videoId) {
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "liveStreamingDetails");
    url.searchParams.set("id", videoId);
    url.searchParams.set("key", apiKey);

    const response = await fetchWithNode(url.toString());
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Videos check failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) return false;

    const details = data.items[0].liveStreamingDetails;
    // Stream is live if it has actualStartTime but no actualEndTime
    return details && details.actualStartTime && !details.actualEndTime;
}

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
        if (cachedStatus === "live" && cachedVideoId) {
            // We know the stream was live — check if it's still active (1 unit)
            const stillLive = await checkVideoStillLive(apiKey, cachedVideoId);

            if (stillLive) {
                return res.status(200).json({
                    items: [{ id: { videoId: cachedVideoId } }],
                    source: "cache",
                });
            } else {
                // Stream ended — clear cache
                cachedVideoId = null;
                cachedStatus = "offline";
                return res.status(200).json({ items: [], source: "cache" });
            }
        } else if (cachedStatus === "offline") {
            // We know the stream was offline — use /search to detect if it started (100 units)
            const videoId = await searchLiveStream(apiKey, channelId);

            if (videoId) {
                cachedVideoId = videoId;
                cachedStatus = "live";
                return res.status(200).json({
                    items: [{ id: { videoId } }],
                    source: "search",
                });
            } else {
                return res.status(200).json({ items: [], source: "search" });
            }
        } else {
            // First call — no cache yet (100 units)
            const videoId = await searchLiveStream(apiKey, channelId);

            if (videoId) {
                cachedVideoId = videoId;
                cachedStatus = "live";
                return res.status(200).json({
                    items: [{ id: { videoId } }],
                    source: "search",
                });
            } else {
                cachedStatus = "offline";
                return res.status(200).json({ items: [], source: "search" });
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}
