import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/BookDetaildesing/Bookdetail.css";
import { IconoloveVacio, Iconolovelleno } from "../../icons/Icons";
import { useUserData } from '../profilecomponents/GetUserData';

const BookDescription = ({ book }) => {
  const email = localStorage.getItem("email");
  const { user, loading, error } = useUserData(email);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  const isPurchased = user?.purchasedBooks?.some(p => p.bookId === book.bookId);

  const handleAction = () => {
    if (!isPurchased) {
      navigate(`/dashboard/checkout`, {
        state: {
          book: book,
          bookIdentifierCode: book.bookIdentifierCode,
          quantity: 1
        }
      });
    } else {
      navigate(`/dashboard/read-book/${book.bookIdentifierCode}`);
    }
  };


  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="detalle-descripcion">
      <div className="acciones">
        <button className="leer-ahora" onClick={handleAction}>
          {book.price === 0 || isPurchased ? "Leer ahora" : "Comprar"}
        </button>

        <button className="iconolove" onClick={toggleFavorite}>
          {isFavorited ? (
            <Iconolovelleno className="heart-fill" />
          ) : (
            <IconoloveVacio className="heart-empty" />
          )}
        </button>

      </div>

      <div className="des">
        <h2 className="titulo-descripcion">Descripción</h2>
        <p className="texto-descripcion">{book.description}</p>
      </div>
    </div>
  );
};

export default BookDescription;
