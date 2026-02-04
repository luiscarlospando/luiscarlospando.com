let cachedTwitchToken = null;
let cachedTokenExpiresAt = 0;

async function getAccessToken(clientId, clientSecret) {
    const now = Date.now();

    // Reuse token in-memory if still valid (very important)
    if (cachedTwitchToken && now < cachedTokenExpiresAt) {
        return cachedTwitchToken;
    }

    const fetch = (await import("node-fetch")).default;

    const response = await fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "client_credentials",
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `Failed to get access token: ${response.status} ${errorText}`
        );
    }

    const data = await response.json();

    // Twitch returns expires_in (seconds). We set a safe early refresh window.
    const expiresInMs = (data.expires_in || 3600) * 1000;
    cachedTwitchToken = data.access_token;
    cachedTokenExpiresAt = now + expiresInMs - 60_000; // refresh 1 min early

    return cachedTwitchToken;
}

export default async function handler(req, res) {
    // --- CORS ---
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Only allow GET
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Live status does not need to be real-time.
    // 60 seconds cache is usually perfect.
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=600"
    );

    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;
    const channelName = "heymijotv";

    if (!clientId || !clientSecret) {
        return res.status(500).json({
            error: "Server misconfiguration: Missing clientId or clientSecret",
        });
    }

    try {
        const accessToken = await getAccessToken(clientId, clientSecret);

        const fetch = (await import("node-fetch")).default;

        const url = new URL("https://api.twitch.tv/helix/streams");
        url.searchParams.set("user_login", channelName);

        const response = await fetch(url.toString(), {
            headers: {
                "Client-ID": clientId,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({
                error: "Failed to fetch data from Twitch",
                details: errorText,
            });
        }

        const data = await response.json();

        // Optional: slim down the response to reduce payload
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}
