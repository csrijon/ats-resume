import React, { useState } from "react";
import { useLocation } from "react-router-dom"; 
import "./improve.css"
import jsPDF from "jspdf";

const ImproveResume = () => {
  const location = useLocation();
  const { resumeId } = location.state || {};

  const [improvedResume, setImprovedResume] = useState("");
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImprove = async () => {
    if (!resumeId) return alert("Missing resume ID!");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/improve-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Improvement failed");

      setImprovedResume(data.improvedText);
      setScore(data.scoreData.score);
      setSuggestions(data.scoreData.suggestions);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

const handleDownload = () => {
  const doc = new jsPDF();
  const sections = improvedResume.split(/\n(?=[A-Z][a-z]+:)/g); // split by lines starting with a capital word and colon

  let y = 20;

  doc.setFont("Times", "Normal");
  doc.setFontSize(12);

  sections.forEach((section) => {
    const [header, ...contentLines] = section.split("\n");
    const content = contentLines.join("\n").trim();

    // 🟢 Header
    doc.setFont("Times", "Bold");
    doc.text(header.trim(), 10, y);
    y += 8;

    // 🟢 Content
    doc.setFont("Times", "Normal");
    const lines = doc.splitTextToSize(content, 180);
    doc.text(lines, 10, y);
    y += lines.length * 7 + 5;

    // Check for page overflow
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("Improved_Resume.pdf");
};


  return (
    <div className="improve-container">
      <h2>✨ Improve Resume</h2>
      {!improvedResume && (
        <button onClick={handleImprove} disabled={loading}>
          {loading ? "Improving..." : "🚀 Improve Now"}
        </button>
      )}

      {improvedResume && (
        <div className="result">
          <h3>📄 Improved Resume</h3>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#f4f4f4",
              padding: "1rem",
              borderRadius: "8px",
              color: "black",
            }}
          >
            {improvedResume}
          </pre>

          <h4>✅ ATS Score: {score}/100</h4>

          {suggestions.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <strong>Suggestions to Improve Further:</strong>
              <ul>
                {suggestions.map((sug, i) => (
                  <li key={i}>{sug}</li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={handleDownload} style={{ marginTop: "1rem" }}>
            ⬇️ Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ImproveResume;
