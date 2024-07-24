// api/checkLiveStatus.js
import fetch from "node-fetch";

async function getAccessToken(clientId, clientSecret) {
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
    return data.access_token;
}

export default async function handler(req, res) {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;
    const channelName = "mijostreams"; // Replace with your Twitch Channel Name

    if (!clientId || !clientSecret) {
        console.error("Missing clientId or clientSecret");
        return res
            .status(500)
            .json({
                error: "Server misconfiguration: Missing clientId or clientSecret",
            });
    }

    try {
        const accessToken = await getAccessToken(clientId, clientSecret);

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
            const errorText = await response.text();
            console.error(
                "Failed to fetch data from Twitch",
                response.status,
                errorText
            );
            return res
                .status(response.status)
                .json({
                    error: "Failed to fetch data from Twitch",
                    details: errorText,
                });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching live status:", error);
        return res
            .status(500)
            .json({ error: "Internal Server Error", details: error.message });
    }
}
