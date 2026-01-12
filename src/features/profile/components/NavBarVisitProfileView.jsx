import React from "react";
import "../../../css/profile/getProfile.css";

export default function NavBarVisitProfileView({ user, photoUrl }) {
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
    </div>
  );
}
