import { useCallback, useState } from "react";
import { updatePassword } from "../../../services/passwordService";
import { validateUpdatePassword } from "../../../utils/validators/passwordValidators";

export function useUpdatePassword({ email, onSuccess } = {}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const submit = useCallback(async () => {
    setServerError("");

    if (!email) {
      setServerError("Correo no encontrado en la URL.");
      return;
    }

    const nextErrors = validateUpdatePassword({ newPassword, confirmNewPassword });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsLoading(true);
    try {
      await updatePassword({ email, newPassword, confirmNewPassword });
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al actualizar la contraseña.";
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [email, newPassword, confirmNewPassword, onSuccess]);

  return {
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    errors,
    isLoading,
    serverError,
    submit,
  };
}
