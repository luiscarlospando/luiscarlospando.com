export default async function handler(req, res) {
  const accessToken = process.env.RAINDROP_ACCESS_TOKEN;
  const collectionId = process.env.RAINDROP_COLLECTION_ID;
  const perPage = 50; // max per page allowed by Raindrop.io API

  if (!accessToken || !collectionId) {
    return res.status(500).json({ error: "Missing environment variables." });
  }

  const fetchPage = async (page) => {
    const url = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=${perPage}&page=${page}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok || !data.items) {
      throw new Error(`Raindrop page ${page} failed: ${response.status}`);
    }

    return data;
  };

  console.log("📡 Fetching all Raindrop items...");

  try {
    const first = await fetchPage(0);
    const total = first.count;
    const totalPages = Math.ceil(total / perPage);
    console.log(`📊 Total items to fetch: ${total} (${totalPages} pages)`);

    const allItems = [...first.items];

    if (totalPages > 1) {
      // Pages are independent requests to Raindrop, so fetch them concurrently
      // instead of awaiting one at a time. Promise.allSettled preserves the
      // input order, so items stay sorted (newest first) once concatenated.
      const remainingPages = Array.from(
        { length: totalPages - 1 },
        (_, i) => i + 1
      );
      const results = await Promise.allSettled(
        remainingPages.map(fetchPage)
      );

      results.forEach((result, i) => {
        if (result.status === "fulfilled") {
          allItems.push(...result.value.items);
        } else {
          console.error(
            `❌ Error fetching page ${remainingPages[i]}`,
            result.reason
          );
        }
      });
    }

    console.log(`🎉 Total bookmarks fetched: ${allItems.length}`);

    // Let Vercel's edge cache serve repeat requests instantly; revalidate in
    // the background so the Raindrop round-trip isn't on the critical path
    // for most visitors.
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=3600"
    );
    res.status(200).json(allItems);
  } catch (err) {
    console.error("🚨 Unexpected error:", err);
    res.status(500).json({ error: "Error fetching bookmarks" });
  }
}
