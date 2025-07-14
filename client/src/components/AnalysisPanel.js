import React from "react";

const AnalysisPanel = ({ article, analysis }) => (
  <div className="analysis-panel">
    <h3>📌 Summary & Sentiment</h3>
    <p>
      <strong>Title:</strong> {article.title}
    </p>
    <p>
      <strong>Summary:</strong>
      <br />
      {analysis.summary}
    </p>
    <p>
      <strong>Sentiment:</strong> {analysis.sentiment}
    </p>
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      🔗 Read full article
    </a>
  </div>
);

export default AnalysisPanel;
