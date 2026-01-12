import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/BookDetaildesing/Bookdetail.css";
import { IconoloveVacio, Iconolovelleno } from "../../icons/Icons";
import { useUserData } from "../profilecomponents/GetUserData";
import { loadAuthFromStorage } from "../../storage/authStorage";

const BookDescription = ({ book }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  const { email } = loadAuthFromStorage();
  const { user } = useUserData(email);

  const isPurchased = user?.purchasedBooks?.some((p) => p.bookId === book.bookId);

  const handleAction = () => {
    if (!isPurchased) {
      navigate(`/dashboard/checkout`, {
        state: {
          book,
          bookIdentifierCode: book.bookIdentifierCode,
          quantity: 1,
        },
      });
    } else {
      navigate(`/dashboard/read-book/${book.bookIdentifierCode}`);
    }
  };

  const toggleFavorite = () => setIsFavorited((prev) => !prev);

  return (
    <div className="detalle-descripcion">
      <div className="acciones">
        <button className="leer-ahora" onClick={handleAction}>
          {book.price === 0 || isPurchased ? "Leer ahora" : "Comprar"}
        </button>

        <button className="iconolove" onClick={toggleFavorite}>
          {isFavorited ? <Iconolovelleno className="heart-fill" /> : <IconoloveVacio className="heart-empty" />}
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
