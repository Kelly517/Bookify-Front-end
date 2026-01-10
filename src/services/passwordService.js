import { apiClient } from "./apiClient";

export async function updatePassword({ email, newPassword, confirmNewPassword }) {
  const res = await apiClient.put("/api/bookify/password", {
    email,
    newPassword,
    confirmNewPassword,
  });
  return res.data;
}
