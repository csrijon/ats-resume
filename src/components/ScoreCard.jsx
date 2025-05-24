// ScoreCard.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./ScoreCard.css";

const ScoreCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scoreData } = location.state || {};

  if (!scoreData) {
    return (
      <div className="scoreCardContainer">
        <h2>No Score Data Found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="scoreCardContainer">
      <h1>🎯 Resume Score: {scoreData.score}/100</h1>
      <ul>
        <li>📌 Keyword Matching: {scoreData.breakdown.keyword_matching}</li>
        <li>📌 Section Presence: {scoreData.breakdown.section_presence}</li>
        <li>📌 Action Verbs: {scoreData.breakdown.action_verbs_metrics}</li>
        <li>📌 Formatting: {scoreData.breakdown.formatting}</li>
        <li>📌 Readability: {scoreData.breakdown.readability}</li>
      </ul>

      <h3>Suggestions</h3>
      <ul>
        {scoreData.suggestions.map((s, i) => (
          <li key={i}>👉 {s}</li>
        ))}
      </ul>

      <button onClick={() => navigate("/")}>🏠 Score Another Resume</button>
    </div>
  );
};

export default ScoreCard;
