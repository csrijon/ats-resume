const ATSScoreCard = ({ score }) => (
  <div className="score-card">
    <h2>ATS Score: {score}/100</h2>
    <div className="score-bar">
      <div style={{ width: `${score}%` }}></div>
    </div>
    <p className="score-note">
      {score >= 80 ? "Great job!" : score >= 60 ? "Needs improvement" : "Poor ATS compatibility"}
    </p>
  </div>
);

export default ATSScoreCard;