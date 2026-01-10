import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdatePasswordForm from "../components/updatepasswordcomponents/UpdatePasswordForm";
import { useUpdatePassword } from "../features/auth/hooks/useUpdatePassword";

const UpdatePassword = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const {
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    errors,
    isLoading,
    serverError,
    submit,
  } = useUpdatePassword({
    email,
    onSuccess: () => {
      alert("Se actualizó su contraseña. Ya puede iniciar sesión.");
      navigate("/login");
    },
  });

  if (!email) return <p>Correo no encontrado en la URL</p>;

  return (
    <UpdatePasswordForm
      newPassword={newPassword}
      confirmNewPassword={confirmNewPassword}
      onNewPasswordChange={setNewPassword}
      onConfirmNewPasswordChange={setConfirmNewPassword}
      onSubmit={submit}
      isLoading={isLoading}
      errors={errors}
      serverError={serverError}
    />
  );
};

export default UpdatePassword;
