// src/components/registercomponents/LoginForm.jsx
import React, { useState } from "react";
import "../../css/login.css";

function LoginForm({ onSubmit, onGoRegister, onGoForgotPassword, onGoHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await onSubmit(email, password);
    } catch (error) {
      setErrorMessage(error.message || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div onClick={onGoHome} className="login-left" role="button" tabIndex={0}></div>

      <div className="login-wrapper">
        <form onSubmit={handleSubmit} className="formLogin">
          <h2 className="login-title">Iniciar sesión</h2>

          <p className="invita22">
            ¿No tienes cuenta?{" "}
            <span id="color-registro" role="button" tabIndex={0} onClick={onGoRegister}>
              Regístrate
            </span>
          </p>

          <div>
            <label htmlFor="email" className="login-label">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <div>
            <label htmlFor="password" className="login-label">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <p>
            <span id="forgetPass" role="button" tabIndex={0} onClick={onGoForgotPassword}>
              ¿Olvidaste la contraseña?
            </span>
          </p>

          {errorMessage && <p className="login-error-message">{errorMessage}</p>}

          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
