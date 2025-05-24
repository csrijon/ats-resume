import React, { useState } from 'react';

const EnhancedResume = ({ text }) => {
  const [isEnhanced, setIsEnhanced] = useState(false);

  const handleEnhance = async () => {
    // Call your backend Gemini AI endpoint here
    // const response = await fetch('/api/enhance', { method: 'POST', body: JSON.stringify({ text }) });
    // Mock response for demo:
    setIsEnhanced(true);
  };

  return (
    <div className="enhanced-resume">
      <button onClick={handleEnhance} className="enhance-btn">
        Enhance with AI
      </button>
      {isEnhanced && (
        <div className="resume-output">
          <h3>Enhanced Resume:</h3>
          <pre>{text || "AI-enhanced content will appear here..."}</pre>
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(text)}`}
            download="enhanced_resume.txt"
            className="download-btn"
          >
            Download Improved Resume
          </a>
        </div>
      )}
    </div>
  );
};

export default EnhancedResume;