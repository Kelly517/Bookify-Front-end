import React from "react";
import "../../css/requestPassword/updatePassword.css";

const UpdatePasswordForm = ({
  newPassword,
  confirmNewPassword,
  onNewPasswordChange,
  onConfirmNewPasswordChange,
  onSubmit,
  isLoading,
  errors,
  serverError,
}) => {
  return (
    <div className="containerUpdate">
      <div className="containerLeftUp"></div>

      <div className="containerRightUp">
        <h1 className="titleUpPass">Nueva contraseña</h1>
        <p className="upPassP">
          Escribe una nueva contraseña para tu cuenta. Asegúrate de que sea segura y fácil de recordar para ti.
        </p>

        <div className="cardUpdatePass">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="formUpdatePass"
          >
            <h3 className="UpPassLabel">Nueva contraseña</h3>
            <input
              className="UpPassInput"
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => onNewPasswordChange(e.target.value)}
              required
            />
            {errors?.newPassword ? <p className="error-message">{errors.newPassword}</p> : null}

            <h3 className="UpPassLabel">Confirmar contraseña</h3>
            <input
              className="UpPassInput"
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmNewPassword}
              onChange={(e) => onConfirmNewPasswordChange(e.target.value)}
              required
            />
            {errors?.confirmNewPassword ? (
              <p className="error-message">{errors.confirmNewPassword}</p>
            ) : null}

            {serverError ? <p className="error-message">{serverError}</p> : null}

            <button type="submit" className="btonUpdatePass" disabled={isLoading}>
              {isLoading ? "Actualizando..." : "Actualizar contraseña"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
