// src/services/userService.js
import { apiClient } from "./apiClient";

export async function getUserByEmail(email) {
  const path = `/api/bookify/users/${encodeURIComponent(email)}`;

  try {
    const response = await apiClient.get(path);
    return response.data; // user
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Error obteniendo el usuario");
    }
    throw new Error("Error de conexión con el servidor");
  }
}