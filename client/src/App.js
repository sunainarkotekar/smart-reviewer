import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ArticleList from "./components/ArticleList";
import AnalysisPanel from "./components/AnalysisPanel";
import SavedReviews from "./components/SavedReviews";

function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [savedReviews, setSavedReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const fetchNews = async () => {
    if (!query.trim()) return alert("Please enter a search query");
    try {
      setArticles([]);
      setAnalysis(null);
      setSelectedArticle(null);
      setSavedReviews([]);
      setLoading(true);
      const res = await axios.get(`/api/news?q=${query}`);
      setArticles(res.data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      alert("Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  };

  const analyzeArticle = async (article) => {
    setSelectedArticle(article);
    setAnalysis(null);
    setLoading(true);
    try {
      const res = await axios.post("/api/reviews", {
        title: article.title,
        url: article.url,
        content: article.content || article.description || "",
      });
      setAnalysis(res.data);
    } catch (error) {
      console.error("Error analyzing article:", error);
      alert("Failed to analyze article.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedArticles = async () => {
    try {
      setQuery("");
      setArticles([]);
      setSelectedArticle(null);
      setAnalysis(null);
      setLoading(true);
      setSentimentFilter("All");
      setSortOrder("Newest");
      const res = await axios.get("/api/reviews");
      setSavedReviews(res.data || []);
    } catch (err) {
      console.error("Error fetching saved results:", err.message);
      alert("Failed to fetch saved results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>📰 Smart Reviewer</h2>

      <SearchBar
        query={query}
        setQuery={setQuery}
        fetchNews={fetchNews}
        fetchSavedArticles={fetchSavedArticles}
      />

      {loading && <p>⏳ Loading...</p>}

      {savedReviews.length > 0 ? (
        <SavedReviews
          reviews={savedReviews}
          sentimentFilter={sentimentFilter}
          sortOrder={sortOrder}
          setSentimentFilter={setSentimentFilter}
          setSortOrder={setSortOrder}
        />
      ) : (
        <div className="flex-layout">
          <ArticleList articles={articles} onAnalyze={analyzeArticle} />
          {selectedArticle && analysis && (
            <AnalysisPanel article={selectedArticle} analysis={analysis} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
