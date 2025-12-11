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

        // Get loved tracks
        const response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=${username}&api_key=${apiKey}&format=json&limit=50`
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
        const tracks = data.lovedtracks.track;

        // Enrich each track with album and preview information
        const enrichedTracks = await Promise.all(
            tracks.map(async (track) => {
                try {
                    // Get track info to obtain album art
                    const trackInfoResponse = await fetch(
                        `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(track.artist.name)}&track=${encodeURIComponent(track.name)}&format=json`
                    );

                    let albumImages = track.image;

                    if (trackInfoResponse.ok) {
                        const trackInfo = await trackInfoResponse.json();

                        // If track info has album with images, use those
                        if (
                            trackInfo.track &&
                            trackInfo.track.album &&
                            trackInfo.track.album.image
                        ) {
                            albumImages = trackInfo.track.album.image;
                        }
                    }

                    // Get preview from iTunes
                    let previewUrl = null;
                    try {
                        const itunesResponse = await fetch(
                            `https://itunes.apple.com/search?term=${encodeURIComponent(track.artist.name + " " + track.name)}&entity=song&limit=1`
                        );

                        if (itunesResponse.ok) {
                            const itunesData = await itunesResponse.json();
                            if (
                                itunesData.results &&
                                itunesData.results.length > 0
                            ) {
                                previewUrl = itunesData.results[0].previewUrl;
                            }
                        }
                    } catch (error) {
                        console.error(
                            `Error fetching iTunes preview for ${track.name}:`,
                            error
                        );
                    }

                    return {
                        ...track,
                        image: albumImages,
                        preview_url: previewUrl,
                    };
                } catch (error) {
                    console.error(
                        `Error fetching info for ${track.name}:`,
                        error
                    );
                    return track;
                }
            })
        );

        console.log(
            "Loved tracks data fetched and enriched successfully from Last.fm"
        );
        return res.status(200).json({
            lovedtracks: {
                ...data.lovedtracks,
                track: enrichedTracks,
            },
        });
    } catch (error) {
        console.error("Error fetching Last.fm loved tracks:", error);
        return res
            .status(500)
            .json({ error: "Internal Server Error", details: error.message });
    }
}
