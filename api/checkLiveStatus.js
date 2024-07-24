import fetch from "node-fetch";

export default async function handler(req, res) {
    const clientId = process.env.TWITCH_CLIENT_ID; // Vercel environment variable
    const accessToken = process.env.TWITCH_CLIENT_SECRET; // Vercel environment variable
    const channelName = "mijostreams";

    try {
        const response = await fetch(
            `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
            {
                headers: {
                    "Client-ID": clientId,
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            return res
                .status(response.status)
                .json({ error: "Failed to fetch data from Twitch" });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching live status:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
