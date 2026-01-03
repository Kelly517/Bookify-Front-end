import React, { useState } from 'react';
import '../../css/requestPassword/requestRecovery.css';
const RequestRecovery = ({ onEmailSubmitted }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onEmailSubmitted(email);
    };
    return (
        <div className='containerSendEmail'>
            <div className='containerLeft'></div>
            <div className='containerRight'>
                <h1 className="rr-title">Recuperar contraseña</h1>
                <p className="rr-login">
                    ¿Ya recordaste tu contraseña? <a href="/login" className="rr-link">Iniciar sesión</a>
                </p>

                <div className="rr-card">
                    <h3 className="rr-subtitle">
                        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                    </h3>

                    <form onSubmit={handleSubmit} className="rr-form">
                        <h3 className="rr-label">Correo electrónico</h3>
                        <input
                            className="rr-input"
                            type="email"
                            placeholder="Escribe tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button className="rr-btn">Enviar enlace</button>
                    </form>
                </div>
            </div>


        </div>
    );
};
export default RequestRecovery;
