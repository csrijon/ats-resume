import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../components/ScoreCard.css"; // optional styling

const ScoreCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scoreData, resumeId } = location.state || {};

  if (!scoreData || !resumeId) return <p>Invalid data. Please upload again.</p>;

  return (
    <div className="scoreCard">
      <h2>🎯 Resume Score: {scoreData.score}/100</h2>
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

      <button
        className="improveBtn"
        onClick={() => navigate('/improve-resume', { state: { resumeId } })}
      >
        ✨ Improve Resume
      </button>
    </div>
  );
};

export default ScoreCard;
