// src/services/authService.js
import { apiClient } from "./apiClient";

/**
 * LEGACY: tu backend actual usa GET con password en la URL (NO recomendado).
 * Lo dejamos igual para no romper tu app mientras cambias el backend.
 */
export async function loginLegacy(email, password) {
  const path = `/api/bookify/email/${encodeURIComponent(email)}/password/${encodeURIComponent(password)}`;

  try {
    const response = await apiClient.get(path);
    return response.data; // token (JWT)
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Correo o contraseña inválidos");
    }
    throw new Error("Error de conexión con el servidor");
  }
}

/**
 * RECOMENDADO: cuando tengas POST en backend.
 * Ej: POST /api/bookify/login { email, password }
 */
export async function login(email, password) {
  const path = "/api/bookify/login";

  try {
    const response = await apiClient.post(path, { email, password });
    return response.data; // token (JWT)
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || "Correo o contraseña inválidos");
    }
    throw new Error("Error de conexión con el servidor");
  }
}