import { API_BASE_URL } from "../services/apiClient";

export function getProfilePhotoUrl(userId, profilePhoto) {
  if (!userId || !profilePhoto) return "";
  return `${API_BASE_URL}/api/bookify/profile/photo/${userId}/${encodeURIComponent(profilePhoto)}`;
}