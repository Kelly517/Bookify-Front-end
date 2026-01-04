import { useCallback, useMemo, useState } from "react";
import { registerUser } from "../../../services/registerService";
import { savePendingRegisterEmail } from "../../../storage/registerStorage";
import { validateRegisterFields } from "../../../utils/validators/registerValidators";

export function useRegister({ onSuccessNavigate } = {}) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const formValues = useMemo(
    () => ({ name, lastname, username, email, password }),
    [name, lastname, username, email, password]
  );

  const validate = useCallback(() => {
    const nextErrors = validateRegisterFields(formValues);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [formValues]);

  const submit = useCallback(async () => {
    setServerError("");

    if (!validate()) return;

    setIsLoading(true);
    try {
      // Mapeo al formato del backend
      const payload = {
        name,
        lastname,
        userName: username,
        email,
        password,
      };

      await registerUser(payload);

      // Guardamos email para el flow de verificación
      savePendingRegisterEmail(email);

      // Navegación (la decide el orquestador)
      if (onSuccessNavigate) onSuccessNavigate();
    } catch (error) {
      // Mensajes de error controlados
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Ocurrió un error al registrar.";
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [validate, name, lastname, username, email, password, onSuccessNavigate]);

  return {
    // values
    name, setName,
    lastname, setLastname,
    username, setUsername,
    email, setEmail,
    password, setPassword,

    // ui states
    errors,
    isLoading,
    serverError,

    // actions
    submit,
  };
}