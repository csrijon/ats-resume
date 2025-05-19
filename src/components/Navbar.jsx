import React from 'react'
import { NavLink } from 'react-router-dom'
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
        <li>< NavLink to="#">Home</NavLink></li>
        <li>< NavLink to="/Score">Score My Resume</NavLink></li>
        <li>< NavLink to="#">Services</NavLink></li>
        <li>< NavLink to="#">Contact</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar