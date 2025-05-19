import React from "react";
import "./HeroSection.css";
import heroimage from "../assets/ats-resume font photo.png"

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="content">
        <h1>Welcome to Our Platform</h1>
        <p>
          Discover the best tools and features to boost your productivity and
          connect with a vibrant community.
        </p>
        <div className="buttons">
          <button className="primary">Get Started</button>
          <button className="secondary">Learn More</button>
        </div>
        {/* <div className="card-container">
          <div className="card">
            <h3>Feature One</h3>
            <p>Effortlessly manage your workflow with our smart tools.</p>
          </div>
          <div className="card">
            <h3>Feature Two</h3>
            <p>Collaborate in real-time and stay in sync with your team.</p>
          </div>
        </div> */}
      </div>
      <div className="image">
        <img src={heroimage} alt="Hero" />
      </div>
    </section>
  );
};

export default HeroSection;
