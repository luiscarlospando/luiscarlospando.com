export default async function handler(req, res) {
  try {
    console.log("🔄 Serverless function: Attempting to fetch bookmarked links");

    const response = await fetch("https://bg.raindrop.io/rss/public/50598757", {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
    });

    if (!response.ok) {
      console.error(
        `❌ Serverless function: HTTP error! status: ${response.status}`,
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    console.log(
      "✅ Serverless function: Bookmarked links fetched successfully",
    );

    // Set appropriate headers
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");

    res.status(200).send(data);
  } catch (error) {
    console.error("❌ Serverless function error:", error);
    res.status(500).json({
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
}
