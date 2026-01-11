import React from "react";
import "../../../css/profile/getProfile.css";
import { Destello } from "../../../icons/Icons";

export default function NavBarProfileView({ user, photoUrl, onEditProfile }) {
  return (
    <div className="profile-card">
      <div className="profile-info">
        <img className="profile-photo" src={photoUrl} alt="Foto de perfil" />
        <div className="profile-details">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-username">@{user.userName}</p>
          <p className="profile-bio">{user.aboutMe}</p>
        </div>
      </div>

      <button className="profile-button" onClick={onEditProfile}>
        Editar perfil <Destello />
      </button>
    </div>
  );
}
