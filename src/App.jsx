import './App.css'
import EnhancedResume from './components/EnhancedResume';
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Middle from './components/Middle'
import Footer from './components/Footer'
import AuthForm from './components/AuthForm'
import Score from './components/Score'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ScoreCard from './components/ScoreCard';
import ImproveResume from './components/ImproveResume';

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
    },
    {
      path: "/ScoreCard",
      element: <><Navbar/><ScoreCard/><Middle/><Footer/></>
    },
    {
      path: "/improve-resume",
      element:<><Navbar/><ImproveResume/><Middle/><Footer/></>
    }
  ]);
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
