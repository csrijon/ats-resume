
import './App.css'
import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Middle from './components/Middle'
import Footer from './components/Footer'
import AuthForm from './components/AuthForm'

function App() {
  return (
    <>
      <Navbar/>
      <HeroSection/>

      <Middle/>
      <Footer/>
      <AuthForm/>
     
    </>
  )
}

export default App
