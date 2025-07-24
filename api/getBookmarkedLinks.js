export default async function handler(req, res) {
  const accessToken = process.env.RAINDROP_ACCESS_TOKEN;
  const collectionId = 50598757;
  const perPage = 50;
  let page = 0;
  let allItems = [];

  try {
    console.log("📡 Fetching all Raindrop bookmarks...");

    while (true) {
      const apiUrl = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=${perPage}&page=${page + 1}`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Raindrop API error: ${response.status}`);
      }

      const json = await response.json();
      allItems = allItems.concat(json.items);
      page++;

      if (json.items.length < perPage) break; // No more pages
    }

    console.log(`✅ Total bookmarks fetched: ${allItems.length}`);

    const simplifiedItems = allItems.map((item) => ({
      title: item.title,
      link: item.link,
      date: item.created, // ISO 8601
    }));

    // Optional: cache headers
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");

    res.status(200).json(simplifiedItems);
  } catch (error) {
    console.error("❌ Error fetching from Raindrop API:", error);
    res.status(500).json({ error: error.message });
  }
}
