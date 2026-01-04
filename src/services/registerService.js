import { apiClient } from "./apiClient";

export async function registerUser(payload) {
  // payload: { name, lastname, userName, email, password }
  const res = await apiClient.post("/api/bookify/user", payload);
  return res.data;
}