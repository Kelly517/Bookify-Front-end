import React from "react";
import { useState } from "react";
import "../../css/NavBarHome.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../assets/context/AuthContext.jsx"; 
import { useUserData } from "../profilecomponents/GetUserData.jsx"; 
import { roleNames } from "../profilecomponents/profileComponentsMessages.js"; 
import { User, Setting, Exit } from "../../icons/Icons"; 
import BookSearchBar from "./BookSearchBar.jsx"; 

// Este componente es la barra de navegación principal que se muestra en la parte superior.
// Contiene el buscador de libros, la foto de perfil del usuario y un menú desplegable con opciones.
const NavBarHome = () => {

  // Estado para controlar si el menú desplegable (dropdown) está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropDown = () => setIsOpen(!isOpen); // cada click cambia entre abrir/cerrar

  // Estado para almacenar lo que se escribe en el buscador (aunque aquí no se usa directamente)
  const [searchTerm, setSearchTerm] = useState("");

  // Hook que me da acceso a la función de cerrar sesión desde el contexto de autenticación
  const { logout } = useAuth();

  // Hook de react-router que me permite navegar entre páginas
  const navigate = useNavigate();

  // Saco el email del usuario del localStorage (se guarda cuando inicia sesión)
  const email = localStorage.getItem("email");

  // Custom hook que trae toda la información del usuario desde el backend
  const { user, loading, error } = useUserData(email);

  // Si aún no tengo al usuario cargado, no muestro nada de la barra
  if (!user) return null;

  // A partir del rol que viene en el user, saco el nombre legible de ese rol
  const userRole = roleNames[user.userRole.roleName];

  // Función que me lleva al checkout de compras
  const handleShopping = () => {
    navigate("/dashboard/checkout");
  };

  // Cierra el menú, hace logout y redirige al login
  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate("/login");
  };

  // Me lleva al perfil del usuario
  const handleGoToMyProfile = () => {
    setIsOpen(false);
    navigate("/dashboard/profile");
  };

  // Me lleva a la configuración de la cuenta
  const handleGoToConfiguration = () => {
    setIsOpen(false);   
    navigate("/dashboard/configuration");
  };

  return (
    <div className="navbar">
      {/* Este es mi componente de barra de búsqueda de libros */}
      <BookSearchBar />

      {/* Contenedor donde están los íconos y la info del usuario */}
      <div className="iconos-navbar">

        {/* Línea vertical para separar la búsqueda de la sección de usuario */}
        <div className="separador-vertical"></div>

        {/* Bloque que muestra el avatar, el username y el rol.
            Al hacer click aquí se abre/cierra el menú desplegable */}
        <div className="user-navbar" onClick={toggleDropDown}>
          <img
            src={`http://localhost:8080/api/bookify/profile/photo/${user.userId}/${encodeURIComponent(user.profilePhoto)}`}
            alt="Foto de perfil"
            className="avatar"
          />
          <div className="user-profile">
            <span className="name">@{user.userName}</span>
            <span className="rol">{userRole}</span>
          </div>
        </div>

        {/* Si el estado isOpen está en true, muestro el menú desplegable */}
        {isOpen && (
          <div className="dropdown-menu">
            
            {/* Parte de arriba del menú: foto grande + nombre completo */}
            <div className="dropdown-user-info">
              <img
                src={`http://localhost:8080/api/bookify/profile/photo/${user.userId}/${encodeURIComponent(user.profilePhoto)}`}
                alt="Foto de perfil"
                className="dropdown-avatar"
              />
              <p className="dropdown-name">
                {user.name} {user.lastname}
              </p>
            </div>

            {/* Botones del menú con sus íconos y funciones */}
            <button onClick={handleGoToMyProfile}>
              <User /> Ver perfil
            </button>
            <button onClick={handleGoToConfiguration}>
              <Setting /> Ajustes
            </button>
            <button onClick={handleLogout}>
              <Exit /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarHome;
