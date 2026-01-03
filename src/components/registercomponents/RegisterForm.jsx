/**
 * ----------------------------------------------------------------------------------------------------------------------
 *                                      COMPONENTE DE REGISTRO DE USUARIOS.
 * ----------------------------------------------------------------------------------------------------------------------
 */

//¡ATENCIÓN!: ESTE COMPONENTE SE CONECTA DIRECTO CON LA SIGUIENTE PAGE: pages/UsersRegister.jsx

/**
 * NOTA: onChange se encarga de ir actualizando en tiempo real los valores de la variable dentro del campo
 * que se está manejando
 */

import "../../css/Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * El parámetro onSubmit se envía hacia la page con la información del formulario recolectada
 * 
 * Los regex son los formatos establecidos por el sitio web permitidos. Estos validan el formato de los diferentes campos
 * regex: es el formato utilizado para la contraseña (password) que debe usarse: 
 * letras mayúsculas y minúsculas, números, mayor a 8 caracteres y opcional un caracter especial. Otro formato será denegado
 * emailRegex: es el formato exclusivo para el email. Otro formato inválido que no sea un email en toda regla será denegado
 * nameAndLastnameRegex: es el formato para los demás datos. Solo se permiten letras, sin números de por medio
 * el username sí permite cualquier formato
 * 
 * @param {obSubmit} param0 
 * @returns retorna la información del usuario validada y procesada
 */
function RegisterForm({ onSubmit }) {
  const navigate = useNavigate();
  const [ password, setPassword ] = useState('');
  const [ name, setName ] = useState('');
  const [ lastname, setLastname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ errors, setErrors ] = useState({});
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-~])[A-Za-z\d!-~]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameAndLastnameRegex = /^[A-Za-z\s]+$/;


  /**
   * Función creada para validar los formatos de los campos ingresados
   * Cada variable recibe el campo del formulario y hace dos validaciones
   * startsWith: valida que el campo NO inicie con espacios
   * test: compara el regex con la variable para hacer la validación de formato correcto
   * 
   * @returns un objeto con los errores, o por el contrario retorna 0 errores y continúa sin problemas
   */
  const validate = () => {
    let errorsTemp = {}; //variable que almacena el error en caso de que salte

    if (name.startsWith(' ')) {
      errorsTemp.name = 'El nombre no puede iniciar con espacios';
    }
    if (!nameAndLastnameRegex.test(name)) {
      errorsTemp.name = 'El nombre no puede contener caracteres especiales. Solo letras';
    }
    if (lastname.startsWith(' ')) {
      errorsTemp.lastname = 'El apellido no puede iniciar con espacios';
    }
    if (!nameAndLastnameRegex.test(lastname)) {
      errorsTemp.name = 'El apellido no puede contener caracteres especiales. Solo letras';
    }
    if (!emailRegex.test(email)) {
      errorsTemp.email = 'El gmail tiene un formato inválido';
    }
    if (username.startsWith(' ')) {
      errorsTemp.username = 'El nombre de usuario no puede iniciar con espacios';
    }
    if (password.startsWith(' ')) {
      errorsTemp.password = 'La contraseña no puede iniciar con espacios';
    }
    if (!regex.test(password)) {
      errorsTemp.password = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número, un caracter especial y mínimo 8 caracteres';
    }
    setErrors(errorsTemp);
    return Object.keys(errorsTemp).length === 0;
  }

  /**
   * Verifica si toda la información es correcta. Si la función validate retorna cero errores, entonces será un true
   * y al ser true permite el paso de la información hacia la página que la va a guardar
   * el event previene que el formulario se envíe vacío, y también envía la información que se llenó en el onsubmit
   * @param {Event} event 
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      onSubmit(event);
    }
  }

  /**
   * Si el registro del usuario se hizo correctamente, la página le redirige al inicio de sesión. 
   * Esto solo se permite si el usuario ya está registrado, cuando ya pasó el proceso de verificar el email
   */
  const handleLoginClick = () => {
    navigate("/login"); 
  };
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="login-container">
      <div onClick={handleHome} className="login-left"></div>

      <div className="login-wrapper">
        <div className="background">
          <div className="register">
            <form onSubmit={handleSubmit} className="formRegister">
              <h2 className="textRegister">Registro de Usuario</h2>
              <p className="login1">
                ¿Ya tienes cuenta?{" "}
                <a id="color-register" onClick={handleLoginClick}>
                  Inicia Sesión
                </a>
              </p>

              {/*En este div se encierra un campo del formulario. Exactamente la misma lógica se repite en todos los campos,
              solo cambian sus nombres.
              ¡ESTE FORMATO ES USADO PARA TODOS LOS FORMS. TYPE, NAME, REQUIRED, VALUE, ONCHANGE, TODOS LOS CAMPOS TIENEN LA MISMA FUNCIÓN!*/}
              <div className="name-container">
                <div className="input-group">
                  <label htmlFor="name" className="register-label">Nombre</label>
                  <input
                    type="text" //tipo de información a enviarse: en este caso es 'text', depende del campo que sea
                    name="name" //nombre del campo: en este caso es 'name', depende del campo que sea
                    required //indica que es obligatorio
                    value={name} //variable que va a manejar: en este caso es 'name', depende del campo que sea
                    onChange={(e) => setName(e.target.value)} //actualiza el valor de la variable 'name' cada vez que el usuario escribe
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

              {/*Muestra si hay un error con el campo que se está manejando. Si el objeto de error contiene algo, es porque falló el campo
              Pero si no tiene nada, es porque el campo es válido y no genera error*/}
              {errors.name && <p  className="error-message">{errors.name}</p>}
              {errors.lastname && <p  className="error-message">{errors.lastname}</p>}
              {errors.username && <p  className="error-message">{errors.username}</p>}
              {errors.email && <p  className="error-message">{errors.email}</p>}
              {errors.password && <p  className="error-message">{errors.password}</p>}

              <button type="submit" className="register-button">
                Registrarse
              </button> {/*Botón del formulario que completa el registro de usuario */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
