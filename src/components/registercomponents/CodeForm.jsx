/**
 * ----------------------------------------------------------------------------------------------------------------------
 *                        COMPONENTE DE VERIFICACIÓN DE EMAIL. OBLIGATORIA PARA REGISTRAR USUARIOS
 * ----------------------------------------------------------------------------------------------------------------------
 */

//¡ATENCIÓN!: ESTE COMPONENTE SE CONECTA DIRECTO CON LA SIGUIENTE PÁGINA: pages/CodeVerificator.jsx

import React from "react";
import '../../css/codeForm.css';

/**
 * Esta función recibe un formulario, este formulario tiene un único campo que toma el código y lo compara con el código guardado en redis
 * Si los códigos coinciden, se completa el registro de usuario. Este código solo se envía al email del usuario
 * @param {onSubmit} param0 
 * @returns un estado correcto de verificación. Esto permite registrar al usuario de forma segura, y se verifica que sea un email real
 */
function VerificationPage({ onSubmit }) {

  return (
    <div className="verification-wrapper">
      <div className="verification-image-section">
      </div>

      <h1>Verifica tu cuenta</h1>
      <p className="verification-subtext">
        Confiamos en ti, pero debemos verificar que tú correo sea real.
      </p>
      <p className="verification-subtext-email">
        Hemos enviado un código de 6 dígitos tú correo
      </p>

      {/*El onSubmit del código es el que se manda hacia la page y permite el registro completo */}
      <form onSubmit={onSubmit} className="form1">

        <div className="verification-containter">

          <input
            type="text"
            placeholder="Ingrese el código"
            name="code"
            required
            maxLength={6} //Esta función limita el tamaño del código para impedir enviar código exagerados
            className="verification-code"
          />
          <button type="submit">Verificar</button>
        </div>
      </form>

      <div className="verification-help">
        <p>¿No recibiste el código?</p>
        <button type="button" className="resend-button">Reenviar código</button>
        <p className="code-expiry">Este código expirará en 10 minutos</p>
      </div>
    </div>
  );
}

export default VerificationPage;