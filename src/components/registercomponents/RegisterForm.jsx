import "../../css/Register.css";

function RegisterForm({
  name, setName,
  lastname, setLastname,
  username, setUsername,
  email, setEmail,
  password, setPassword,
  errors,
  serverError,
  onSubmit,
  onGoToLogin,
  onGoHome,
}) {
  return (
    <div className="login-container">
      <div onClick={onGoHome} className="login-left"></div>

      <div className="login-wrapper">
        <div className="background">
          <div className="register">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="formRegister"
            >
              <h2 className="textRegister">Registro de Usuario</h2>

              <p className="login1">
                ¿Ya tienes cuenta?{" "}
                <a id="color-register" onClick={onGoToLogin}>
                  Inicia Sesión
                </a>
              </p>

              <div className="name-container">
                <div className="input-group">
                  <label htmlFor="name" className="register-label">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="register-input"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="lastname" className="register-label">Apellido</label>
                  <input
                    type="text"
                    name="lastname"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="register-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="register-label">Nombre de usuario</label>
                <input
                  type="text"
                  name="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="register-input"
                />
              </div>

              <div>
                <label htmlFor="email" className="register-label">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="register-input"
                />
              </div>

              <div>
                <label htmlFor="password" className="register-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="register-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* field errors */}
              {errors.name && <p className="error-message">{errors.name}</p>}
              {errors.lastname && <p className="error-message">{errors.lastname}</p>}
              {errors.username && <p className="error-message">{errors.username}</p>}
              {errors.email && <p className="error-message">{errors.email}</p>}
              {errors.password && <p className="error-message">{errors.password}</p>}

              {/* server error */}
              {serverError && <p className="error-message">{serverError}</p>}

              <button type="submit" className="register-button">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
