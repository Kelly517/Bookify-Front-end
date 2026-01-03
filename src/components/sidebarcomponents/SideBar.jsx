import React from "react";
import logo from '../../assets/sidebar/logo-sidebar.png';
import { NavLink } from "react-router-dom";
import { Home, Read, Book } from "../../icons/Icons";
import "../../css/sidebar.css"; 

const SideBar = () => {
  return (
    <aside className="sidebar">
    <div className="logo-container">
      <img src={logo} alt="Logo Bokify" className="logo-img" />
    </div>
    <ul className="menu">
      <li>
        <NavLink to="/dashboard" end className="nav-link" activeclassname="active">
          <Home />
          <span>Inicio</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/read" className="nav-link" id="leer" activeclassname="active">
          <Read />
          <span>Leer</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/write" className="nav-link" activeclassname="active">
          <Book />
          <span>Escribir</span>
        </NavLink>
      </li>
    </ul>
  </aside>
  );
};

export default SideBar;
