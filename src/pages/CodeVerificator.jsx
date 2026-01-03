/**
 * ----------------------------------------------------------------------------------------------------------------------
 *                        PÁGINA DE VERIFICACIÓN DE EMAIL. OBLIGATORIA PARA REGISTRAR USUARIOS
 * ----------------------------------------------------------------------------------------------------------------------
 */

//¡ATENCIÓN!: ESTA PÁGINA SE CONECTA DIRECTO CON EL SIGUIENTE COMPONENTE: components/registercomponents/CodeForm.jsx

import React from "react";
import axios from "axios";
import CodeForm from "../components/registercomponents/CodeForm";
import { useNavigate } from "react-router-dom";

const CodeVerificator = () => {
  const navigate = useNavigate();
  const handleVerification = async (event) => {
    event.preventDefault();

    /**
     * Como ya se mostró en el registro de usuarios, el formData recibe la información y la tranforma en un objeto
     * En este caso recibe el email y el código de verificación. El email se extrae del localStorage (se guardó en el registro de usuarios)
     * Y el código se escribe manualmente, enviado a través de un formData tradicional
     */
    const formData = new FormData(event.target);
    const data = {
      email: localStorage.getItem("email"), //se extrae desde el localStorage
      code: formData.get("code"), //Se agrega manualmente en el form
    };

    //Se hace el mismo proceso que se explicó en registro de usuarios, se conecta con el backend y se pasa la data con el email y el código
    try {
      const response = await axios.post(
        `http://localhost:8080/api/bookify/code-verify`,
        data 
      );

      navigate('/login'); //Una vez que se verifica el código, se redirige hacia el login para iniciar sesión
    } catch (error) {
      if (error.response) { //Error controlado
        console.log("Error del servidor:", error.response.data);
      } else { //Error inesperado
        console.log("Error de conexión:", error.message);
      }
    }
  };

  return (
    <div>
      <CodeForm onSubmit={handleVerification} /> {/*Se recibe el formulario del código y se maneja un onSubmit para validar info*/}
    </div>
  );
};

export default CodeVerificator;
