/**
 * ----------------------------------------------------------------------------------------------------------------------
 *                        PÁGINA DE REGISTRO DE USUARIOS. ES EL PRIMER PASO OBLIGATORIO
 * ----------------------------------------------------------------------------------------------------------------------
 */

//ESTA PÁGINA SE CONECTA DIRECTO CON  components/registercomponents/RegisterForm.jsx

/**
 * Aquí se importa todo lo necesario para el código
 * axios: es la función para hacer la conexión al backend. Await va acompañado de axios, siempre
 * useNavigate: es la función que me ayuda a navegar entre las páginas del sitio web. Redirecciones, carga de otras páginas, etc
 * useState: es para cargar los estados de las variables u objetos que voy a usar
 * RegisterForm: es el componente que creamos en react para traer el formulario de registro
 */

/**
 * event.preventDefault() se utiliza para evitar que react cargue automáticamente el formulario
 * esto quiere decir que se evita que un formulario de registro se envíe automáticamente, sin antes haber presionado 
 * el botón de registrarse. Esto es importante para evitar que se envíen datos vacíos al iniciar la página
 */
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RegisterForm from "../components/registercomponents/RegisterForm";
import '../css/Register.css'

//Esta es la función principal, sobre la que vamos a trabajar toda la page
const RegisterPage = () => {

  //Aquí se declaran las variables u objetos
  const navigate = useNavigate(); //navigate es la variable que usamos para navegar entre páginas
  const [loading, setLoading] = useState(false); //loading es la variable para mostrar la vista de "cargando". setLoading se utiliza para enviar el estado de loading
  const [errorMessage, setErrorMessage] = useState(""); //errorMessage es la variable que muestra los mensajes de error. setErrorMessage se utiliza para enviar el estado de setErrorMessage

  //Esta función asíncrona es la que maneja el evento principal, que es registrar al usuario
  const handleRegister = async (event) => {
    event.preventDefault(); //preventDefault evita que react envíe el formulario de forma automática sin haber llenado los datos
    setLoading(true);
    setErrorMessage("");

    /**
    * Recoge los datos de un formulario y los organiza en un objeto.
    * 
    * @param {Event} event - El evento de envío del formulario.
    * @returns {Object} Un objeto con los datos del formulario.
    * 
    * La función crea un FormData a partir del formulario y luego extrae los valores de los campos 'name',
    * 'lastname', 'username', 'email' y 'password', que se almacenan en un objeto.
    */
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      lastname: formData.get("lastname"),
      userName: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      /**
       * response: variable encargada de hacer la conexión al backend
       * post: es el método HTTP que envía información para guardar
       * data: es el objeto creado en formData para recoger la información del formulario de registro
      */ 
      const response = await axios.post("http://localhost:8080/api/bookify/user", data);
      localStorage.setItem("email", data.email); //Almacena el email en el localstorage para ser utilizado después. Toda la información de localStorage se elimina al cerrar sesión

      navigate("/verification-code"); //navigate se encarga de redirigir a la página de verificar el código enviado al email
    } catch (error) {
      /**
       * Estas condiciones son las encargadas de enviar la información del error
       * en caso de que el fallo se produzca por un error controlado, se mostrará un mensaje
       * pero si es por un error inesperado, se mostrará un error diferente
       */
      if (error.response) { //error controlado
        console.log("Error del servidor:", error.response.data);
        setErrorMessage(error.response.data.message || "Ocurrió un error al registrar.");
      } else { //error inesperado
        console.log("Error de conexión:", error.message);
        setErrorMessage("No se pudo conectar al servidor.");
      }
    } finally {//Siempre se ejecuta
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? ( //el loading se encarga de mostrar la ventana de enviando correo durante el tiempo de espera
      <div class="send-email-container">
        <div class="central-icon">✦</div>
        <div class="stars">
          <span class="star star1">✧</span>
          <span class="star star2">✦</span>
          <span class="star star3">✩</span>
          <span class="star star4">✦</span>
          <span class="star star5">✧</span>
        </div>
        <h2 id="send-email-desing">Enviando correo...</h2>
      </div>
      ) : (
        <RegisterForm onSubmit={handleRegister} /> //onSubmit es la función que ejecuta el método de registrar usuarios, que pasa directo al formulario de registro
      )}
    </div>
  );
};

export default RegisterPage;
