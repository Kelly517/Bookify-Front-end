import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdatePasswordForm from '../components/updatepasswordcomponents/UpdatePasswordForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdatePassword = () => {
    const { email } = useParams();
    const navigate = useNavigate();

    console.log("Email: ", email)

    const handleUpdatePassword = async (formData) => {
        try {
            
            const data = { ...formData, email };
            await axios.put('http://localhost:8080/api/bookify/password', data);
            alert('Se actualizó su contraseña. Ya puede iniciar sesión.');
            navigate("/login");
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            alert('Error al actualizar la contraseña');
        }
    };

    return (
        <div>
            {/* <h2>Establecer nueva contraseña</h2> */}
            {email ? (
                <UpdatePasswordForm onSubmit={handleUpdatePassword} />
            ) : (
                <p>Correo no encontrado en la URL</p>
            )}
        </div>
    );
};

export default UpdatePassword;
