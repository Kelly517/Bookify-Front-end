import { apiClient } from "./apiClient";

export async function verifyEmailCode({ email, code }) {
  const res = await apiClient.post("/api/bookify/code-verify", { email, code });
  return res.data;
}

/**
 * Si tu backend tiene endpoint para reenviar código, úsalo aquí.
 * Si no existe todavía, igual dejamos la función lista para cuando lo crees.
 */
export async function resendVerificationCode({ email }) {
  const res = await apiClient.post("/api/bookify/code-resend", { email });
  return res.data;
}