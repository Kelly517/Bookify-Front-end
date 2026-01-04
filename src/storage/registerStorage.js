const REGISTER_EMAIL_KEY = "email";

export function savePendingRegisterEmail(email) {
  if (!email) return;
  localStorage.setItem(REGISTER_EMAIL_KEY, email);
}

export function loadPendingRegisterEmail() {
  return localStorage.getItem(REGISTER_EMAIL_KEY) || "";
}

export function clearPendingRegisterEmail() {
  localStorage.removeItem(REGISTER_EMAIL_KEY);
}
