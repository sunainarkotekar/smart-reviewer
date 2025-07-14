import React from "react";

const ArticleList = ({ articles, onAnalyze }) => (
  <div className="article-list">
    <h3>Articles</h3>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {articles.map((a, i) => (
        <li key={i} className="article-item">
          <div className="article-title">{a.title}</div>
          <div className="article-description">{a.description}</div>
          <button onClick={() => onAnalyze(a)}>Summarize & Analyze</button>
        </li>
      ))}
    </ul>
  </div>
);

export default ArticleList;
