export default async function handler(req, res) {
  const accessToken = process.env.RAINDROP_ACCESS_TOKEN;
  const collectionId = process.env.RAINDROP_COLLECTION_ID;
  const perPage = 50; // max per page allowed by Raindrop.io API
  let page = 0;
  let allItems = [];
  let total = 0;

  if (!accessToken || !collectionId) {
    return res.status(500).json({ error: "Missing environment variables." });
  }

  console.log("📡 Fetching all Raindrop items...");

  try {
    while (true) {
      const url = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=${perPage}&page=${page}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.items) {
        console.error("❌ Error fetching page", page, data);
        break;
      }

      if (page === 0) {
        total = data.count;
        console.log(`📊 Total items to fetch: ${total}`);
      }

      allItems.push(...data.items);
      console.log(`✅ Page ${page + 1}: fetched ${data.items.length} items`);

      if (data.items.length < perPage) break;

      page += 1;
    }

    console.log(`🎉 Total bookmarks fetched: ${allItems.length}`);
    res.status(200).json(allItems);
  } catch (err) {
    console.error("🚨 Unexpected error:", err);
    res.status(500).json({ error: "Error fetching bookmarks" });
  }
}
