import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


const BookSalesComponent = () => {
  const [ orders, setOrders ] = useState([]);

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
    <div>
      <h3>Ventas por libro</h3>

      <table className="table-container">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Fecha de venta</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
             <tr key={order.id}>
             <td>{order.orderDetailEntity.bookEntity.title}</td>
             <td>{order.orderDetailEntity.bookEntity.author.userName}</td>
             <td>{order.orderDetailEntity.orderDate}</td>
             <td>{order.orderDetailEntity.totalAmount}</td>
             </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default BookSalesComponent
