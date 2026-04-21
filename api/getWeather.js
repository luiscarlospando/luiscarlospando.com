export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Cache 10 minutes — weather doesn't need to be real-time
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=600, stale-while-revalidate=1200"
    );

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "Missing OPENWEATHER_API_KEY" });
    }

    try {
        const fetch = (await import("node-fetch")).default;

        const url = new URL("https://api.openweathermap.org/data/2.5/weather");
        url.searchParams.set("q", "Chihuahua,MX");
        url.searchParams.set("appid", apiKey);
        url.searchParams.set("units", "metric");
        url.searchParams.set("lang", "es");

        const response = await fetch(url.toString());

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({
                error: "Failed to fetch weather data",
                details: errorText,
            });
        }

        const data = await response.json();

        return res.status(200).json({
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}
