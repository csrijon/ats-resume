import React from 'react'
import indkedinphoto from "../assets/linkedin-showcase.png"
import "./Middle.css"

const Middle = () => {
  return (
     <section className="linkedin-section">
      <h2 className="linkedin-title">Your personal resume & LinkedIn coach</h2>
      <p className="linkedin-subtitle">
        Join over 1 million experienced professionals, graduates and students
        who have used Resume Worded's toolkit to get ahead in their careers.
      </p>

      <div className="linkedin-tabs">
        <span>INSTANT RESUME REVIEW</span>
        <span>RESUME SAMPLES</span>
        <span>RESUME TARGETING</span>
        <span className="active-tab">LINKEDIN OPTIMIZATION</span>
      </div>

      <div className="linkedin-card">
        <img src={indkedinphoto} alt="Laptop" className="linkedin-image" />
        <div className="linkedin-text">
          <h3>Get found by the right people on LinkedIn</h3>
          <p>
            Instantly get tailored feedback on how to optimize your LinkedIn
            profile, for free. Generate 5x more jobs, leads and opportunities.
          </p>
          <button className="linkedin-btn">
            Optimize LinkedIn profile &nbsp; »
          </button>
        </div>
      </div>

      <div className="curve"></div>
    </section>
  )
}

export default Middle