import React, { useEffect, useState } from "react";
import "../../css/check.css";
import { FlechaRegresar } from "../../icons/Icons";

const CheckoutComponent = ({ onSubmit, book }) => {
  const [cart, setCart] = useState([]);

  const addBookCart = (book) => {
    setCart((prevCart) => [
      ...prevCart,
      {
        bookCoverPage: book.filePathCoverPage,
        bookTitle: book.title,
        bookAuthor: book.author.userName,
      },
    ]);
  };

  useEffect(() => {
    if (book) addBookCart(book);
    // mismo comportamiento (solo corrige el warning)
  }, [book]);

  // Persistencia del carrito (mismo resultado: se guarda, pero estable)
  useEffect(() => {
    localStorage.setItem("currentCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="checkout-cart-wrapper">
      <div className="arrow-read3">
        <FlechaRegresar />
      </div>

      <div className="checkout-cart-section-left">
        <h2>Carrito de compras</h2>

        <table className="checkout-cart-table">
          <thead>
            <tr>
              <th>Libro</th>
              <th>Formato</th>
              <th>Precio</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="checkout-cart-table-row">
                <td className="checkout-cart-book-info">
                  <img
                    src={`http://localhost:8080/api/bookify/view-image/${item.bookTitle}/${item.bookCoverPage}`}
                    alt="Portada"
                    className="checkout-cart-book-cover"
                  />
                  <div className="checkout-cart-book-texts">
                    <p className="checkout-cart-book-title">{item.bookTitle}</p>
                    <p className="checkout-cart-book-author">{item.bookAuthor}</p>
                  </div>
                </td>

                <td className="checkout-cart-book-format">Dígital</td>
                <td className="checkout-cart-book-price">${book.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="checkout-summary-section-right">
        <h3>Resumen de la compra</h3>
        <p className="checkout-summary-book-title">{book.title}</p>
        <p className="checkout-summary-book-price">${book.price}</p>
        <p className="checkout-summary-total-price">Total: ${book.price}</p>

        <button className="checkout-summary-pay-button" onClick={onSubmit}>
          Proceder al pago
        </button>

        <p className="checkout-summary-note">
          📚 Los libros estarán disponibles en tu biblioteca digital inmediatamente
          después del pago.
        </p>
      </div>
    </div>
  );
};

export default CheckoutComponent;
