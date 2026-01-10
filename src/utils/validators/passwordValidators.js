const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-~])[A-Za-z\d!-~]{8,}$/;

export function validateUpdatePassword({ newPassword, confirmNewPassword }) {
  const errors = {};

  if (!newPassword || newPassword.startsWith(" ")) {
    errors.newPassword = "La contraseña no puede iniciar con espacios.";
  } else if (!passwordRegex.test(newPassword)) {
    errors.newPassword =
      "Debe tener mayúscula, minúscula, número, caracter especial y mínimo 8 caracteres.";
  }

  if (confirmNewPassword !== newPassword) {
    errors.confirmNewPassword = "Las contraseñas no coinciden.";
  }

  return errors;
}
