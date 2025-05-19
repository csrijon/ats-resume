import React from 'react'
import "./Score.css"

const Score = () => {
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
        <form className="uploadForm">
          <label htmlFor="resume-upload" className="uploadLabel">
            Select your Resume (PDF)
            <input
              type="file"
              id="resume-upload"
              accept="application/pdf"
              className="fileInput"
            />
          </label>
          <button type="submit" className="submitBtn">
            Score Resume
          </button>
        </form>
      </div>
    </section>  
  )
}

export default Score