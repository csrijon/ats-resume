import React, { useState } from 'react';
import "./Score.css";

const Score = () => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("File not found");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      // Make sure backend URL is correct here
      const response = await fetch("http://localhost:5000/uploads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Upload failed");
        return;
      }

      const result = await response.json();
      alert("✅ File uploaded successfully!");
      console.log(result);
    } catch (error) {
      console.error("❌ Upload failed:", error);
    }
  };

  return (
    <section className="pageContainer">
      <div className="leftSide">
        <h1>Score My Resume</h1>
        <p>
          Upload your resume to get an instant, detailed score based on industry
          best practices. Improve your chances by knowing exactly where to improve.
        </p>
        <ul>
          <li>Quick feedback on formatting and keywords</li>
          <li>Identify strengths and gaps in your resume</li>
          <li>Tailor your resume for specific job applications</li>
          <li>Boost your chances to get interviews</li>
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
          <button type="submit" className="submitBtn">
            Score Resume
          </button>
        </form>
      </div>
    </section>
  );
};

export default Score;
