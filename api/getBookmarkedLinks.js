export default async function handler(req, res) {
  const accessToken = process.env.RAINDROP_ACCESS_TOKEN;
  const collectionId = 50598757;
  const perPage = 50;
  const maxPages = 10; // Page limit to avoid infinite loops
  let page = 0;
  let allItems = [];

  try {
    console.log("📡 Fetching all Raindrop bookmarks...");

    while (page < maxPages) {
      const apiUrl = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=${perPage}&page=${page + 1}`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Raindrop error body:`, errorText);
        throw new Error(`Raindrop API error: ${response.status}`);
      }

      const json = await response.json();

      if (!json.items || !Array.isArray(json.items)) {
        throw new Error("Invalid response structure from Raindrop API");
      }

      allItems = allItems.concat(json.items);
      page++;

      if (json.items.length < perPage) {
        // No more pages
        break;
      }
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
