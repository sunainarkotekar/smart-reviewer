const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.q || "technology";
  console.log(`Fetching news for query: ${query}`);
  try {
    const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&apikey=${process.env.GNEWS_API_KEY}`;
    // console.log("GNews API URL:", url);
    const response = await axios.get(url);
    // console.log("✅ GNews Response:", response.data);
    res.json(response.data);
  } catch (err) {
    console.error("❌ GNews API error:", err.response?.data || err.message);
    res.status(500).json({ error: "News API error" });
  }
});

module.exports = router;
