import React from "react";

const SearchBar = ({ query, setQuery, fetchNews, fetchSavedArticles }) => (
  <div className="search-bar">
    <input
      value={query}
      placeholder="Search news topic..."
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && fetchNews()}
    />
    <button onClick={fetchNews}>Search</button>
    <button
      style={{ padding: "0.5rem 1rem", marginLeft: "1rem", fontSize: "1rem" }}
      onClick={fetchSavedArticles}
    >
      Show Saved Results
    </button>
  </div>
);

export default SearchBar;
