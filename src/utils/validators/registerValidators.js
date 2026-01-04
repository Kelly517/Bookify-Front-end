const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-~])[A-Za-z\d!-~]{8,}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Si quieres permitir tildes/ñ, luego lo mejoramos.
// Por ahora te dejo tu versión básica:
const nameRegex = /^[A-Za-z\s]+$/;

export function validateRegisterFields({ name, lastname, username, email, password }) {
  const errors = {};

  // NAME
  if (!name || name.startsWith(" ")) {
    errors.name = "El nombre no puede iniciar con espacios";
  } else if (!nameRegex.test(name)) {
    errors.name = "El nombre no puede contener caracteres especiales. Solo letras";
  }

  // LASTNAME
  if (!lastname || lastname.startsWith(" ")) {
    errors.lastname = "El apellido no puede iniciar con espacios";
  } else if (!nameRegex.test(lastname)) {
    errors.lastname = "El apellido no puede contener caracteres especiales. Solo letras";
  }

  // USERNAME
  if (!username || username.startsWith(" ")) {
    errors.username = "El nombre de usuario no puede iniciar con espacios";
  }

  // EMAIL
  if (!emailRegex.test(email || "")) {
    errors.email = "El correo tiene un formato inválido";
  }

  // PASSWORD
  if (!password || password.startsWith(" ")) {
    errors.password = "La contraseña no puede iniciar con espacios";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "La contraseña debe contener al menos una mayúscula, una minúscula, un número, un caracter especial y mínimo 8 caracteres";
  }

  return errors;
}