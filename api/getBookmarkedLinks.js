export default async function handler(req, res) {
  const accessToken = process.env.RAINDROP_ACCESS_TOKEN;
  const collectionId = 50598757;
  const perPage = 50;
  const maxPages = 10;
  const baseUrl = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}`;
  let page = 1;
  let allItems = [];

  // Check for missing access token early
  if (!accessToken) {
    console.error("❌ Missing RAINDROP_ACCESS_TOKEN in environment");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  console.log("📡 Fetching Raindrop bookmarks from collection:", collectionId);

  try {
    while (page <= maxPages) {
      const url = `${baseUrl}?perpage=${perPage}&page=${page}`;
      console.log(`➡️  Fetching page ${page}: ${url}`);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `❌ HTTP ${response.status} from Raindrop API:`,
          errorText,
        );
        throw new Error(`Raindrop API error: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data.items)) {
        console.error("❌ Invalid response structure from Raindrop API:", data);
        throw new Error("Unexpected API response structure");
      }

      const itemsThisPage = data.items.length;
      allItems = allItems.concat(data.items);
      console.log(
        `✅ Page ${page}: Fetched ${itemsThisPage} items (Total so far: ${allItems.length})`,
      );

      if (itemsThisPage < perPage) {
        console.log("📭 No more pages to fetch (final page reached).");
        break;
      }

      page++;
    }

    // Transform and simplify items
    const simplifiedItems = allItems.map((item) => ({
      title: item.title,
      link: item.link,
      date: item.created,
    }));

    // Response headers
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");

    console.log(`🎉 Total bookmarks returned: ${simplifiedItems.length}`);
    return res.status(200).json(simplifiedItems);
  } catch (error) {
    console.error("❌ Unexpected error during fetch:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
