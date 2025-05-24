import React, { useState } from 'react';
import "./Score.css";

const Score = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scoreData, setScoreData] = useState(null); // holds GenAI result

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a PDF file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      // Step 1: Upload PDF to server
      const uploadRes = await fetch("http://localhost:5000/uploads", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");

      // Step 2: Get file ID from MongoDB (if returned) — but your current upload route doesn't return file ID!
      // Let's assume we know the file is stored in Resume collection with `.text`, and we get ID back
      const resumeId = uploadData.resumeId; // <-- Must return this from backend

      // Step 3: Call GenAI analysis
      const analyzeRes = await fetch("http://localhost:5000/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      });

      const analyzeData = await analyzeRes.json();
      if (!analyzeRes.ok) throw new Error(analyzeData.error || "Analysis failed");

      setScoreData(analyzeData); // Save the GenAI response

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pageContainer">
      <div className="leftSide">
        <h1>Score My Resume</h1>
        <p>
          Upload your resume to get an instant, detailed score based on industry best practices.
        </p>
        <ul>
          <li>Quick feedback on formatting and keywords</li>
          <li>Identify strengths and gaps</li>
          <li>Tailor for job applications</li>
          <li>Boost your chances for interviews</li>
        </ul>
      </div>

      <div className="rightSide">
        <form className="uploadForm" onSubmit={handleSubmit}>
          <label htmlFor="resume-upload" className="uploadLabel">
            Select your Resume (PDF)
            <input
              type="file"
              id="resume-upload"
              accept="application/pdf"
              className="fileInput"
              name="resume"
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="submitBtn" disabled={loading}>
            {loading ? "Scoring..." : "Score Resume"}
          </button>
        </form>

        {scoreData && (
          <div className="scoreResult">
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
          </div>
        )}
      </div>
    </section>
  );
};

export default Score;
