import React from "react";
import { useUserData } from "../GetUserData";
import { navBarProfileMessages } from "../profileComponentsMessages";
import ProfileSpinners from "../../../spinners/ProfileSpinners";
import '../../../css/profile/getProfile.css';
import { useNavigate, useParams } from "react-router-dom";

const NavBarVisitProfile = () => {
  const { email } = useParams();
  const { user, loading, error } = useUserData(email);

  if (loading) return <p>{navBarProfileMessages.charging}</p>;
  if (error) return <ProfileSpinners />;
  if (!user) return null;

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
      </div>
    
    </>
  );
  
};

export default NavBarVisitProfile;
