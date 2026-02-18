// API route to fetch and normalize Crucial Tracks JSON Feed
export default async function handler(req, res) {
    const FEED_URL = "https://app.crucialtracks.org/profile/mijo/feed.json";

    try {
        // Fetch the JSON feed
        const response = await fetch(FEED_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Normalize the feed to a Raindrop-like structure
        const items = data.items.map((entry) => ({
            id: entry.id,
            title: entry.title,
            link: entry.url,
            created: entry.date_published,
            note: entry.content_html || "",
            content: entry._song_details?.content || "",
            song: entry._song_details?.song || "",
            artist: entry._song_details?.artist || "",
            artwork_url: entry._song_details?.artwork_url || "",
            apple_music_url: entry._song_details?.apple_music_url || "",
            preview_url: entry._song_details?.preview_url || "",
        }));

        res.status(200).json(items);
    } catch (err) {
        console.error("🚨 Error fetching Crucial Tracks:", err);
        res.status(500).json({ error: "Error fetching Crucial Tracks feed" });
    }
}
