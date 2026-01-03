// src/storage/authStorage.js
const KEYS = {
    token: "authToken",
    email: "email",
    role: "role",
    userId: "userId",
  };
  
  /**
   * Guarda los datos de auth en localStorage
   */
  export function saveAuthToStorage({ token, email, role, userId }) {
    localStorage.setItem(KEYS.token, token);
    if (email != null) localStorage.setItem(KEYS.email, email);
    if (role != null) localStorage.setItem(KEYS.role, role);
    if (userId != null) localStorage.setItem(KEYS.userId, String(userId));
  }
  
  /**
   * Lee los datos de auth desde localStorage
   */
  export function loadAuthFromStorage() {
    return {
      token: localStorage.getItem(KEYS.token),
      email: localStorage.getItem(KEYS.email),
      role: localStorage.getItem(KEYS.role),
      userId: localStorage.getItem(KEYS.userId),
    };
  }
  
  /**
   * Borra todo lo relacionado con auth
   */
  export function clearAuthStorage() {
    Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
  }
  