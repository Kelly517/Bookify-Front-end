import React, { useState } from 'react';
import axios from 'axios';
import RequestRecoveryModal from '../components/updatepasswordcomponents/RequestRecoveryModal';

const ForgotPasswordPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmailSubmitted = async (email) => {
    try {
      await axios.put(`http://localhost:8080/api/bookify/user/email/update/${email}`);
      alert('Revisa tu correo. Te hemos enviado un enlace para restablecer tu contraseña.');
      
    } catch (error) {
      console.error('Error al enviar correo:', error);
      alert('Ocurrió un error al enviar el correo de recuperación');
    }
  };

  return (
    <div>
      <RequestRecoveryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEmailSubmitted={handleEmailSubmitted}
      />
    </div>
  );
};

export default ForgotPasswordPage;
