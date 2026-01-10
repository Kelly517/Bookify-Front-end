import { useCallback, useMemo, useState } from "react";
import { loadPendingRegisterEmail, clearPendingRegisterEmail } from "../../../storage/registerStorage";
import { resendVerificationCode, verifyEmailCode } from "../../../services/verificationService";

export function useEmailVerification({ onVerified } = {}) {
  const email = useMemo(() => loadPendingRegisterEmail(), []);
  const [code, setCode] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const submit = useCallback(async () => {
    setErrorMessage("");
    setInfoMessage("");

    if (!email) {
      setErrorMessage("No encontramos el email a verificar. Vuelve a registrarte.");
      return;
    }
    if (!code || code.trim().length !== 6) {
      setErrorMessage("Ingresa un código de 6 dígitos.");
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmailCode({ email, code: code.trim() });

      // Limpieza del email temporal (ya no lo necesitamos)
      clearPendingRegisterEmail();

      if (onVerified) onVerified();
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Código inválido o expirado.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }, [email, code, onVerified]);

  const resend = useCallback(async () => {
    setErrorMessage("");
    setInfoMessage("");

    if (!email) {
      setErrorMessage("No encontramos el email a verificar. Vuelve a registrarte.");
      return;
    }

    setIsResending(true);
    try {
      await resendVerificationCode({ email });
      setInfoMessage("Listo. Te reenviamos un código al correo.");
    } catch (error) {
      // Si no existe el endpoint en backend, aquí caerá
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "No se pudo reenviar el código.";
      setErrorMessage(msg);
    } finally {
      setIsResending(false);
    }
  }, [email]);

  return {
    email,
    code,
    setCode,
    isLoading,
    isResending,
    errorMessage,
    infoMessage,
    submit,
    resend,
  };
}
