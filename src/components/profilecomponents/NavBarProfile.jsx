import React from "react";
import { useUserData } from "./GetUserData";
import { navBarProfileMessages } from "./profileComponentsMessages";
import ProfileSpinners from "../../spinners/ProfileSpinners";
import '../../css/profile/getProfile.css';
import logo from '../../assets/sidebar/logo-sidebar.png';
import { useNavigate } from "react-router-dom";
import { Destello } from "../../icons/Icons";

const NavBarProfile = () => {
  const email = localStorage.getItem("email");
  const { user, loading, error } = useUserData(email);
  const navigate = useNavigate();

  if (loading) return <p>{navBarProfileMessages.charging}</p>;
  if (error) return <ProfileSpinners />;
  if (!user) return null;

  const handleEditProfile = () => {
    navigate("/dashboard/configuration");
  }

  return (
    <>
    <div className="profile-card">
      <div className="profile-info">
        <img className="profile-photo"
        src={`http://localhost:8080/api/bookify/profile/photo/${user.userId}/${encodeURIComponent(user.profilePhoto)}`}
        alt="Foto de perfil" />
        <div className="profile-details">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-username">@{user.userName}</p>
          <p className="profile-bio">{user.aboutMe}</p>
        </div>
      </div>
  
      <button className="profile-button" onClick={handleEditProfile} >Editar perfil <Destello/> </button>
    </div>
    
    </>
  );
  
};

export default NavBarProfile;
