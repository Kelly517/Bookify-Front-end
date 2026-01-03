// src/pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/registercomponents/LoginForm";
import { useAuth } from "../assets/context/AuthContext";

import { loginLegacy } from "../services/authService";
import { decodeAuthToken } from "../utils/tokenDecoder";
import { saveAuthToStorage } from "../storage/authStorage";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogin = async (email, password) => {
    // 1) pedir token al backend
    const token = await loginLegacy(email, password);

    // 2) decodificar token a datos
    const authData = decodeAuthToken(token);

    // 3) guardar localStorage
    saveAuthToStorage(authData);

    // 4) setear el context
    setAuth({
      token: authData.token,
      email: authData.email,
      role: authData.role,
      isInitialized: true,
    });

    // 5) redirigir por rol
    if (authData.role === "ADMIN") {
      navigate("/admin-dashboard", { replace: true });
    } else if (authData.role === "USER") {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/unauthorized", { replace: true });
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      onGoHome={() => navigate("/")}
      onGoRegister={() => navigate("/register")}
      onGoForgotPassword={() => navigate("/forgot/password")}
    />
  );
};

export default Login;
