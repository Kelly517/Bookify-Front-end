import React from 'react';
import LogoAdmi from '../../../../assets/admi/LogoAdmi.png';
import Perfil2 from '../../../../../public/reviews/perfil2.jpg';

import { NavLink } from "react-router-dom";
import "../../../../css/admi/sidebarAdmi.css";
import { Home, Book, User, Grafi } from '../../../../icons/Icons';
import { useAuth } from '../../../../assets/context/AuthContext';

const AdminSideBar = () => {
  const { logout } = useAuth();
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <img src={LogoAdmi} alt="Logo Bokify" />
      </div>
      <ul className="admin-nav">
        <li>
          <NavLink to="/admin-dashboard" end className="admin-link" activeclassname="active">
            <span className="admin-link-content"><Home />Inicio</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-dashboard/control-panel/user" className="admin-link" activeclassname="active">
            <span className="admin-link-content"><User />Usuarios</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-dashboard/control-panel/sale" className="admin-link" activeclassname="active">
            <span className="admin-link-content"><Grafi />Ventas</span>
          </NavLink>
        </li>
      </ul>
      <div className="admin-user" onClick={handleLogout}>
        <div className="admin-user-info">
          <strong>{email}</strong>
          <span>Administrador</span>
        </div>
      </div>
    </aside>
  );
};

export default AdminSideBar;
