import { apiClient } from "./apiClient";

export async function getUserByEmail(email) {
  const res = await apiClient.get(`/api/bookify/users/${encodeURIComponent(email)}`);
  return res.data;
}

export async function updateUserByEmail(email, payload) {
  const res = await apiClient.put(`/api/bookify/user/${encodeURIComponent(email)}`, payload);
  return res.data;
}

export async function deleteUserByEmail(email) {
  const res = await apiClient.delete(`/api/bookify/user/${encodeURIComponent(email)}`);
  return res.data;
}
