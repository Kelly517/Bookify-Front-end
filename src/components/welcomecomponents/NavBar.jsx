import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/navbar.css';
import { navBarMessages } from './welcomePageMessages.js';
import logoSmall from '../../assets/logoSmall.png';


const NavBar = () => {
  const navigate = useNavigate();

  const handleGoToRegisterClick = () => {
    navigate("/register");
  }

  const handleGoToLoginClick = () => {
    navigate("/login");
  }
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className='nav-bar'>
        <div className="logo">
         <img src={logoSmall} alt="logo-Bookify"onClick={() => scrollToSection("home")} />

        </div>

        <ul className="navbar-menu">
          <li className="navbar-item" onClick={() => scrollToSection("home")}>{navBarMessages.home}</li>
          <li className="navbar-item" onClick={() => scrollToSection("who-are")}>{navBarMessages.whoAre}</li>
          <li className="navbar-item" onClick={() => scrollToSection("books")}>{navBarMessages.books}</li>
          <li className="navbar-item" onClick={() => scrollToSection("reviews")}>{navBarMessages.reviews}</li>
          <li className="navbar-item" onClick={() => scrollToSection("contacts")}>{navBarMessages.contacts}</li>
        </ul>


        <div className="navbar-buttons">
          <button className="navbar-button-register" onClick={handleGoToRegisterClick}>{navBarMessages.register}</button>
          <button className="navbar-button-login" onClick={handleGoToLoginClick}>{navBarMessages.logIn}</button>
        </div>
      </nav>
    </>
  )
}

export default NavBar
