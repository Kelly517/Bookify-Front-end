/**
 * ----------------------------------------------------------------------------------------------------------------------
 *                   CONTEXT PARA LA AUTENTICACIÓN DE LOS USUARIOS. VITAL PARA MANTENER LA SEGURIDAD
 * ----------------------------------------------------------------------------------------------------------------------
 */

/**
 * ¡NOTA IMPORTANTE!
 * SI NO SABE QUÉ ES UN JWT, POR FAVOR REVISAR LA DOCUMENTACIÓN COMPLETA DEL PROYECTO
 * AHÍ SE EXPLICA QUÉ ES UN JWT Y CÓMO SE CREA
 */

/**
 * importamos el jwt decoder, que nos va a permitir desencriptar el token de seguridad y verificar su información interna
 * importamos useContext para enviar el context de autenticación a las clases que requieran de esta info 
 * (si no sabe qué es un context por favor revisar la documentación interna del proyecto)
 */
import { jwtDecode } from 'jwt-decode';
import React, { useContext, useEffect, useState, createContext } from 'react'

const AuthContext = createContext(); //Creamos el contexto que va a contener los compontentes importantes de la seguridad

//Componente AuthProvider, se encarga de proporcionar el estado de la autenticación a los componentes que vayan a utilizar la autenticación de usuario
export const AuthProvider = ({ children }) => {

    //Estas son las variables que se encargan de manejar la autenticación del usuario. Toda la información empieza como valores nulos, para después recibir los datos.
    //Reciben la información después de que el useEffect hace la validación y retorna la información del usuario
    const [ auth, setAuth ] = useState({
        token: null,
        email: null,
        role: null,
        isInitialized: false,
    });

    //Nota, el useEffect se encarga de ejecutar un flujo automáticamente sin necesidad de hacer algo más. Es un proceso automático
    useEffect(() => {
        const token = localStorage.getItem("authToken"); //Aquí se extrae el token desde el localstorage

        //Esta validación verifica que el token exista. Si es así entonces procede a validar la información
        if(token) {
            try {
                const decoded = jwtDecode(token); //Decodifica el código. O sea, lo abre para ver qué hay en su interior
                const email = decoded.sub; //Saca el email del token
                const role = decoded.role; //Saca el rol del usuario del token

                setAuth({ token, email, role, isInitialized: true }); //Envía la información de autenticación hacia el objeto de autenticación anterior
            } catch(error) {
                console.error("Error decodificando el token: ", error);
            }
        } else {
            setAuth((prev) => ({ //Toma la información de autenticación, exista o no, y la mantiene
                ...prev, //En caso de que exista, conserva la información. En caso de que no exista, también conserva la información vacía
                isInitialized: true,
                //Esto evita que la información se vaya cruzada y se generen problemas de autenticación
            }));
        }

    }, []);

    /**
     * Cerrar sesión. Básicamente hace que todo lo que esté en el localstorage o en la autenticación se elimine, para quedar en ceros
     */
    const logout = () => {
        localStorage.clear();
        setAuth({ token: null, role: null, email: null, isInitialized: true });
    };

    /**
     * Este return se encarga de envolver a todos los componentes hijos que necesiten acceder a la información de autenticación
     * El AuthContext.Provider es el que "distribuye" los datos a través de toda la aplicación donde sea necesario
     * Le pasamos como value un objeto con toda la información y funciones útiles relacionadas con la autenticación:
     * - ...auth → contiene token, email, role, isInitialized
     * - setAuth → función para actualizar el estado de autenticación
     * - logout → función para cerrar sesión y limpiar datos
     */
    return (
        <AuthContext.Provider value={{ ...auth, setAuth, logout }}>
            {children} {/* Aquí se renderizan todos los componentes hijos que estarán dentro del contexto de autenticación */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); //Retorna el contexto ya procesado, con la información que se tenga que propagar por todo el código