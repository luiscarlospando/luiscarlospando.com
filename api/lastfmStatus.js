export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const apiKey = process.env.LASTFM_API_KEY;
    const username = "luiscarlospando";

    if (!apiKey) {
        console.error("Missing Last.fm API key");
        return res.status(500).json({
            error: "Server misconfiguration: Missing Last.fm API key",
        });
    }

    try {
        const fetch = (await import("node-fetch")).default;
        const response = await fetch(
            `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(
                "Failed to fetch data from Last.fm",
                response.status,
                errorText
            );
            return res.status(response.status).json({
                error: "Failed to fetch data from Last.fm",
                details: errorText,
            });
        }

        const data = await response.json();
        console.log("Data fetched successfully from Last.fm:", data);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching Last.fm status:", error);
        return res
            .status(500)
            .json({ error: "Internal Server Error", details: error.message });
    }
}
