import React, { useEffect, useState } from "react";
import "../../../css/admi/usersAdmi.css";

const SaleTable = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/bookify/orders");
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error("Error obteniendo las ventas:", error);
      }
    };

    fetchSales();
  }, []);

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Código de orden</th>
            <th>Fecha</th>
            <th>Libros</th>
            <th>Autor</th>
            <th>Monto</th>
            <th>Estado pago</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sales.map((venta) => (
            <tr key={venta.id}>
              <td>{venta.orderNumber}</td>
              <td>{venta.orderDetailEntity.orderDate}</td>
              <td>{venta.orderDetailEntity.bookEntity.title}</td>
              <td>{venta.orderDetailEntity.bookEntity.author.userName}</td>
              <td>${venta.totalAmount.toLocaleString()}</td>
              <td>
                <span
                  className={`user-status ${
                    venta.orderDetailEntity.status === "COMPLETED" ? "activo" : "inactivo"
                  }`}
                >
                  {venta.orderDetailEntity.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleTable;
