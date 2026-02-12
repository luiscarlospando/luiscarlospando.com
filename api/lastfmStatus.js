export default async function handler(req, res) {
    // --- CORS (keep yours) ---
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Only allow GET (this helps prevent accidental POST spam)
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // --- IMPORTANT: CACHE ---
    // Cache at the Vercel Edge for 30 seconds.
    // Serve stale while revalidating for 1 minute.
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=30, stale-while-revalidate=60"
    );

    const apiKey = process.env.LASTFM_API_KEY;
    const username = "luiscarlospando";

    if (!apiKey) {
        return res.status(500).json({
            error: "Server misconfiguration: Missing Last.fm API key",
        });
    }

    try {
        const fetch = (await import("node-fetch")).default;

        // Use HTTPS (important)
        const url = new URL("https://ws.audioscrobbler.com/2.0/");
        url.searchParams.set("method", "user.getrecenttracks");
        url.searchParams.set("user", username);
        url.searchParams.set("api_key", apiKey);
        url.searchParams.set("format", "json");
        url.searchParams.set("limit", "1");

        const response = await fetch(url.toString(), {
            headers: {
                "User-Agent": "luiscarlospando.com (Vercel Function)",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({
                error: "Failed to fetch data from Last.fm",
                details: errorText,
            });
        }

        const data = await response.json();

        // Optional: remove noisy logging
        // console.log("Data fetched successfully from Last.fm");

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}
