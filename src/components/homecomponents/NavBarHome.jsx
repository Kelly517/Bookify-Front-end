// src/components/homecomponents/NavBarHome.jsx
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../assets/context/AuthContext.jsx";

import NavBarHomeView from "../../features/home/components/NavBarHomeView.jsx";
import { useNavBarHome } from "../../features/home/hooks/useNavBarHome.js";

const NavBarHome = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const {
    user,
    userRoleLabel,
    avatarUrl,
    isOpen,
    toggleDropDown,
    closeDropDown,
  } = useNavBarHome();

  const handleGoToMyProfile = useCallback(() => {
    closeDropDown();
    navigate("/dashboard/profile");
  }, [closeDropDown, navigate]);

  const handleGoToConfiguration = useCallback(() => {
    closeDropDown();
    navigate("/dashboard/configuration");
  }, [closeDropDown, navigate]);

  const handleLogout = useCallback(() => {
    closeDropDown();
    logout();
    navigate("/login");
  }, [closeDropDown, logout, navigate]);

  return (
    <NavBarHomeView
      user={user}
      userRoleLabel={userRoleLabel}
      avatarUrl={avatarUrl}
      isOpen={isOpen}
      onToggleDropDown={toggleDropDown}
      onGoToMyProfile={handleGoToMyProfile}
      onGoToConfiguration={handleGoToConfiguration}
      onLogout={handleLogout}
    />
  );
};

export default NavBarHome;