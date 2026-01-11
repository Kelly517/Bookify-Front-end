import React from "react";
import { useNavigate } from "react-router-dom";

import ProfileSpinners from "../../spinners/ProfileSpinners";
import { navBarProfileMessages } from "./profileComponentsMessages";

import { useMyUser } from "../../features/profile/hooks/useMyUser";
import { getProfilePhotoUrl } from "../../utils/mediaUrls";
import NavBarProfileView from "../../features/profile/components/NavBarProfileView";

export default function NavBarProfile() {
  const navigate = useNavigate();
  const { user, loading, error } = useMyUser();

  if (loading) return <p>{navBarProfileMessages.charging}</p>;
  if (error) return <ProfileSpinners />;
  if (!user) return null;

  const photoUrl = getProfilePhotoUrl(user.userId, user.profilePhoto);

  return (
    <NavBarProfileView
      user={user}
      photoUrl={photoUrl}
      onEditProfile={() => navigate("/dashboard/configuration")}
    />
  );
}
