// src/features/home/components/NavBarHomeView.jsx
import React from "react";
import "../../../css/NavBarHome.css";
import BookSearchBar from "../../../components/homecomponents/BookSearchBar.jsx";
import { User, Setting, Exit } from "../../../icons/Icons";

export default function NavBarHomeView({
  user,
  userRoleLabel,
  avatarUrl,
  isOpen,
  onToggleDropDown,
  onGoToMyProfile,
  onGoToConfiguration,
  onLogout,
}) {
  if (!user) return null;

  return (
    <div className="navbar">
      <BookSearchBar />

      <div className="iconos-navbar">
        <div className="separador-vertical"></div>

        <div className="user-navbar" onClick={onToggleDropDown}>
          <img src={avatarUrl} alt="Foto de perfil" className="avatar" />
          <div className="user-profile">
            <span className="name">@{user.userName}</span>
            <span className="rol">{userRoleLabel}</span>
          </div>
        </div>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-user-info">
              <img
                src={avatarUrl}
                alt="Foto de perfil"
                className="dropdown-avatar"
              />
              <p className="dropdown-name">
                {user.name} {user.lastname}
              </p>
            </div>

            <button onClick={onGoToMyProfile}>
              <User /> Ver perfil
            </button>
            <button onClick={onGoToConfiguration}>
              <Setting /> Ajustes
            </button>
            <button onClick={onLogout}>
              <Exit /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}