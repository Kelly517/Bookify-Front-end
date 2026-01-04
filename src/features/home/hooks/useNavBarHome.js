import { useMemo, useState, useCallback } from "react";
import { loadAuthFromStorage } from "../../../storage/authStorage";
import { roleNames } from "../../../components/profilecomponents/profileComponentsMessages.js";
import { useUserData } from "../../../components/profilecomponents/GetUserData.jsx";
import { getProfilePhotoUrl } from "../../../utils/mediaUrls";

export function useNavBarHome() {
  const { email } = loadAuthFromStorage();

  const { user, loading, error } = useUserData(email);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropDown = useCallback(() => setIsOpen((v) => !v), []);
  const closeDropDown = useCallback(() => setIsOpen(false), []);

  const userRoleLabel = useMemo(() => {
    const roleName = user?.userRole?.roleName;
    return roleName ? roleNames[roleName] : "";
  }, [user]);

  const avatarUrl = useMemo(() => {
    if (!user) return "";
    return getProfilePhotoUrl(user.userId, user.profilePhoto);
  }, [user]);

  return {
    user,
    loading,
    error,
    userRoleLabel,
    avatarUrl,
    isOpen,
    toggleDropDown,
    closeDropDown,
  };
}
