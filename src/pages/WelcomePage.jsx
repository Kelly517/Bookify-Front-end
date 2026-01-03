import React from 'react'
import NavBar from '../components/welcomecomponents/NavBar.jsx';
import WelcomeComponent from '../components/welcomecomponents/WelcomeComponent.jsx';
import Footer from '../components/welcomecomponents/Footer.jsx';

const WelcomePage = () => {
  return (
    <>
      <NavBar />
      <WelcomeComponent />
      <Footer />
    </>
  )
}

export default WelcomePage
