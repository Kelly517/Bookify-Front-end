import React, { useEffect, useState } from 'react'
import BookSalesComponent from './BookSalesComponent.jsx';
import ComponentLinkMercadoPago from './ComponentLinkMercadoPago.jsx';
import "../../css/sales/desingSalesHome.css";
import { SalesTotal, Profits, Money } from '../../icons/Icons.jsx';
import axios from 'axios';

const SalesHome = () => {
  const [orders, setOrders] = useState([]);
  const totalAmount = orders.reduce((accumulator, order) => accumulator + order?.orderDetailEntity?.totalAmount, 0);


  useEffect(() => {
    const email = localStorage.getItem("email");
    const fetchStats = async () => {

      try {
        const orderResponse = await axios.get(
          `http://localhost:8080/api/bookify/orders`
        );

        const order = orderResponse.data;
        const filteredOrders = order.filter((order) => {
          return order?.orderDetailEntity?.bookEntity?.author?.email === email;
        });

        setOrders(filteredOrders);

      } catch (error) {
        console.log("An error occurred with the data: ", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='containerAllSale'>
      <div className='saleSection'>

        <h2 id='tituloSalesHome'>Mis ventas</h2>
        <p>Consulta tus ingresos, ventas por libro y solicita tu retiro cuando quieras.</p>

        <div className='salesCards'>

          <div className='saleCads1'>
            <div className='contetCardSale'>
              <SalesTotal className='iconsSale' />
              <h5>Ganancias totales</h5>
            </div>
            <p>{totalAmount}</p>
          </div>

          <div className='saleCads1'>
            <div className='contetCardSale'>
              <Profits className='iconsSale' />
              <h5>Ventas totales</h5>
            </div>
            <p>{orders.length}</p>
          </div>
        </div>

        <p className='mensajeSale'>| Recibes el 70% del valor por cada libro vendido. Bookify retiene el 30% para cubrir servicios y ayudarte a crecer.</p>

        <div className='flexSaleContainer2'>
          <BookSalesComponent />
          <div className='dividerSale'></div>
          <ComponentLinkMercadoPago />
        </div>

      </div>
    </div>
  )
}

export default SalesHome
