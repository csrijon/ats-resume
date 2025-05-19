import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
   <nav className="navbar">
      <h2 className="logo">Resumeworded</h2>

      {/* Toggle Button (Only visible on mobile) */}
      <button className="toggle-btn" id="menuToggle">
        ☰
      </button>

      {/* Nav Links */}
      <ul className="nav-links" id="navLinks">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar