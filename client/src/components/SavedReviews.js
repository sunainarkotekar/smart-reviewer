import React from "react";

const SavedReviews = ({
  reviews,
  sentimentFilter,
  sortOrder,
  setSentimentFilter,
  setSortOrder,
}) => {
  const filteredAndSorted = [...reviews]
    .filter(
      (r) =>
        sentimentFilter === "All" ||
        r.sentiment?.toLowerCase().includes(sentimentFilter.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <>
      <h3>📚 Saved Reviews</h3>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <label>
          Filter by Sentiment:
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="All">All</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
        </label>

        <label>
          Sort by Date:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </label>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredAndSorted.map((review, i) => (
          <li
            key={i}
            style={{
              paddingBottom: "1rem",
              borderBottom: "1px solid #ccc",
              marginBottom: "1rem",
            }}
          >
            <p>
              <strong>Title:</strong> {review.title}
            </p>
            <p>
              <strong>Summary:</strong> {review.summary}
            </p>
            <p>
              <strong>Sentiment:</strong> {review.sentiment}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(review.createdAt).toLocaleString()}
            </p>
            <a href={review.url} target="_blank" rel="noopener noreferrer">
              🔗 Read full article
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SavedReviews;
