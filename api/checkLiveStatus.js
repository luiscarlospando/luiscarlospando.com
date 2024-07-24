import fetch from "node-fetch";

async function getAccessToken(clientId, clientSecret) {
    console.log("Getting access token...");

    try {
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
            console.error(
                `Failed to get access token: ${response.status} ${errorText}`
            );
            throw new Error(
                `Failed to get access token: ${response.status} ${errorText}`
            );
        }

        const data = await response.json();
        console.log("Access token obtained:", data.access_token);
        return data.access_token;
    } catch (error) {
        console.error("Error in getAccessToken:", error);
        throw error;
    }
}

export default async function handler(req, res) {
    console.log("Handler function invoked");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

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
        console.log("Attempting to get access token...");
        const accessToken = await getAccessToken(clientId, clientSecret);

        console.log("Attempting to fetch live status from Twitch...");
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
        console.log("Data fetched successfully from Twitch:", data);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching live status:", error);
        return res
            .status(500)
            .json({ error: "Internal Server Error", details: error.message });
    }
}
