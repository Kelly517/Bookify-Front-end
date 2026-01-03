import React, { useState } from 'react';
import { USers, Book, User, NewUser, Money, Moneydos, Cerdo} from '../../../../icons/Icons';
import "../../../../css/admi/salesAdmi.css"
import SaleTable from '../SaleTable';

const ControlPanelSales = () => {

  return (
    <div>
      <h2>Ventas</h2>
      <div className="user-stats-container">
        <div className="user-stats-card">
          <div className="user-stats-icon">
            <Money />
          </div>
          <div>
            <p className="user-stats-label">Total vendido este mes</p>
            <p className="user-stats-value">Por calcular</p>
          </div>
        </div>
      
        <div className="user-stats-card" id='blue'>
          <div className="user-stats-icon" id='blueicon' >
            <Moneydos id='moneyblue' />
          </div>
          <div>
            <p className="user-stats-label">Ganancia para autores</p>
            <p className="user-stats-value">Por calcular</p>
          </div>
        </div>
      
        <div className="user-stats-card">
          <div className="user-stats-icon">
            <Cerdo />
          </div>
          <div>
            <p className="user-stats-label">Comisión Bookify</p>
            <p className="user-stats-value">Por calcular</p>
          </div>
        </div>
      </div>

      <SaleTable />
      
    </div>
  )
}

export default ControlPanelSales
