import React from "react";
import "../../css/codeForm.css";

function CodeForm({
  email,
  code,
  onCodeChange,
  onSubmit,
  onResend,
  isLoading,
  isResending,
  errorMessage,
  infoMessage,
}) {
  return (
    <div className="verification-wrapper">
      <div className="verification-image-section"></div>

      <h1>Verifica tu cuenta</h1>
      <p className="verification-subtext">
        Confiamos en ti, pero debemos verificar que tu correo sea real.
      </p>

      <p className="verification-subtext-email">
        Hemos enviado un código de 6 dígitos a tu correo{email ? `: ${email}` : ""}.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="form1"
      >
        <div className="verification-containter">
          <input
            type="text"
            placeholder="Ingrese el código"
            name="code"
            required
            maxLength={6}
            className="verification-code"
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Verificando..." : "Verificar"}
          </button>
        </div>
      </form>

      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      {infoMessage ? <p className="info-message">{infoMessage}</p> : null}

      <div className="verification-help">
        <p>¿No recibiste el código?</p>
        <button
          type="button"
          className="resend-button"
          onClick={onResend}
          disabled={isResending}
        >
          {isResending ? "Reenviando..." : "Reenviar código"}
        </button>
        <p className="code-expiry">Este código expirará en 10 minutos</p>
      </div>
    </div>
  );
}

export default CodeForm;
