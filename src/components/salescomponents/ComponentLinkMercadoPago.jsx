import React from 'react';
import "../../css/sales/desingSalesHome.css";

const ComponentLinkMercadoPago = () => {

    const handleSendToMercadoPago = () => {
        console.log("Vinculando cuenta con Mercado pago...");
        alert(`Gracias por vincular su cuenta con Mercado Pago.`);
    }

  return (
    <div>
      <div className='containerCuentaSale'>
        <h3 id='tituloSale3'>Vincular mi cuenta con Mercado Pago</h3>

        <div className='containerCuenta'>
            <p>Aún no tienes una cuenta vinculada con Mercado Pago</p>
            <button onClick={handleSendToMercadoPago} className='buttonMercadopago' >Vincular MercadoPago</button>
        </div>
      </div>
    </div>
  )
}

export default ComponentLinkMercadoPago
