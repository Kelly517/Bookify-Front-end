// src/utils/tokenDecoder.js
import { jwtDecode } from "jwt-decode";

/**
 * Convierte el token en datos de usuario que tu app necesita.
 * Ajusta las keys si tu token usa nombres distintos.
 */
export function decodeAuthToken(token) {
  const decoded = jwtDecode(token);

  return {
    token,
    email: decoded.sub ?? null,
    role: decoded.role ?? null,
    userId: decoded.userId ?? null,
  };
}
