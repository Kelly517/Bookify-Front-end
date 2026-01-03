import React, { useState } from 'react';
import '../../css/requestPassword/updatePassword.css';
const UpdatePasswordForm = ({ onSubmit }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ newPassword, confirmNewPassword });
  };
  return (
    <div className='containerUpdate'>
      <div className='containerLeftUp'></div>
      <div className='containerRightUp'>
        <h1 className='titleUpPass'>Nueva contraseña</h1>
        <p className='upPassP'>Escribe una nueva contraseña para tu cuenta. Asegúrate de que sea segura y fácil de recordar para ti.</p>
        <div className='cardUpdatePass'>
          <form onSubmit={handleSubmit} className='formUpdatePass'>
          <h3 className="UpPassLabel">Nueva contraseña</h3>
            <input className='UpPassInput'
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          <h3 className="UpPassLabel">Confirmar contraseña</h3>
            <input className='UpPassInput'
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            <button type="submit" className='btonUpdatePass'>Actualizar contraseña</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default UpdatePasswordForm;
