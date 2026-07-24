// RSS feed for Last.fm loved tracks, built on top of the already-enriched
// /api/lastfmLovedTracks response (album art + iTunes preview).

function escapeXml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function toRfc822(uts) {
    return new Date(Number(uts) * 1000).toUTCString();
}

export default async function handler(req, res) {
    const SITE_URL = "https://luiscarlospando.com";
    const FEED_URL = `${SITE_URL}/api/loved-tracks`;
    const PAGE_URL = `${SITE_URL}/music/loved-tracks/`;

    try {
        const response = await fetch(`${SITE_URL}/api/lastfmLovedTracks`);
        if (!response.ok) {
            throw new Error(`Upstream error: ${response.status}`);
        }

        const data = await response.json();
        const tracks = data.lovedtracks?.track || [];

        const items = tracks
            .map((track) => {
                const artist = track.artist?.name || "";
                const title = track.name || "";
                const link = track.url || PAGE_URL;
                const uts = track.date?.uts;
                const guid = `${link}${uts ? `#${uts}` : ""}`;

                const hasRealImage = (track.image || []).some(
                    (img) =>
                        img["#text"] &&
                        !img["#text"].includes(
                            "2a96cbd8b46e442fc41c2b86b821562f"
                        )
                );
                const albumArt = hasRealImage
                    ? track.image[3]?.["#text"]
                    : null;

                const descriptionParts = [];
                if (albumArt) {
                    descriptionParts.push(
                        `<img src="${escapeXml(albumArt)}" alt="${escapeXml(artist)} - ${escapeXml(title)}" />`
                    );
                }
                descriptionParts.push(`${escapeXml(artist)} — ${escapeXml(title)}`);

                const enclosure = track.preview_url
                    ? `\n      <enclosure url="${escapeXml(track.preview_url)}" type="audio/mp4" />`
                    : "";

                return `
    <item>
      <title>${escapeXml(`${artist} — ${title}`)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(guid)}</guid>${uts ? `\n      <pubDate>${toRfc822(uts)}</pubDate>` : ""}
      <description><![CDATA[${descriptionParts.join("<br/>")}]]></description>${enclosure}
    </item>`;
            })
            .join("");

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Luis Carlos Pando - Canciones favoritas</title>
    <link>${PAGE_URL}</link>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <description>Canciones que le he dado &quot;love&quot; en Last.fm.</description>
    <language>es</language>
    <ttl>60</ttl>${items}
  </channel>
</rss>`;

        res.setHeader("Content-Type", "application/rss+xml; charset=UTF-8");
        res.setHeader(
            "Cache-Control",
            "public, s-maxage=1800, stale-while-revalidate=3600"
        );
        return res.status(200).send(rss);
    } catch (error) {
        console.error("Error generating loved tracks RSS feed:", error);
        return res.status(500).send("Error generating RSS feed");
    }
}
