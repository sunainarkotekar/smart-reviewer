const express = require("express");
const axios = require("axios");
const Review = require("../models/Review");
const router = express.Router();

// Save summary + sentiment
router.post("/", async (req, res) => {
  const { title, url, content } = req.body;
  try {
    // console.log("Received article for analysis:", title);
    if (!content) {
      return res
        .status(400)
        .json({ error: "Content is required for analysis" });
    }
    // console.log("Analyzing content:", content);
    const summaryRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Summarize this:\n${content}` }],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    // console.log("Summary response:", summaryRes.data);

    const sentimentRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Is this text positive, neutral, or negative?\n${content}`,
          },
        ],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    // console.log("Sentiment response:", sentimentRes.data);

    const review = new Review({
      title,
      url,
      summary: summaryRes.data.choices[0].message.content,
      sentiment: sentimentRes.data.choices[0].message.content,
    });

    await review.save();
    res.json(review);
  } catch (err) {
    console.error("Error details:", err.response?.data || err.message);
    res.status(500).json({ error: "Analysis failed" });
  }
});

// Get saved reviews
router.get("/", async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

// GET /api/reviews/sentiments - grouped by sentiment not needed as it is already handled in the client filtering
// This endpoint is not strictly necessary but can be useful for future enhancements
router.get("/sentiments", async (req, res) => {
  try {
    const reviews = await Review.find();

    const grouped = {
      Positive: [],
      Neutral: [],
      Negative: [],
      Unknown: [],
    };

    reviews.forEach((r) => {
      const sentiment = (r.sentiment || "Unknown").trim().toLowerCase();

      if (sentiment.includes("positive")) grouped.Positive.push(r);
      else if (sentiment.includes("neutral")) grouped.Neutral.push(r);
      else if (sentiment.includes("negative")) grouped.Negative.push(r);
      else grouped.Unknown.push(r);
    });

    res.json(grouped);
  } catch (err) {
    console.error("Error fetching sentiments:", err.message);
    res.status(500).json({ error: "Failed to get sentiment analysis" });
  }
});

module.exports = router;
