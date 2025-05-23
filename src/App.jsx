import './App.css'

import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Middle from './components/Middle'
import Footer from './components/Footer'
import AuthForm from './components/AuthForm'
import Score from './components/Score'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

function App() {
 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthForm />  
    },
    {
      path: "/Home",
      element: <><Navbar/><HeroSection/><Middle/><Footer/></>
    },
    {
      path: "/Score",
      element: <><Navbar/><Score/><Middle/><Footer/></>
    }
  ]);
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
