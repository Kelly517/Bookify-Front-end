import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import BookHeader from "../components/bookdetail/BookHeader";
import BookDescription from "../components/bookdetail/BookDescription";
import BookChapters from "../components/bookdetail/BookChapters";

import "../css/BookDetaildesing/Bookdetail.css";
import { FlechaRegresar } from "../icons/Icons";
import { useBookDetail } from "../features/books/hooks/useBookDetails";

const BookDetail = () => {
  const { bookIdentifierCode } = useParams();
  const navigate = useNavigate();

  const { book } = useBookDetail(bookIdentifierCode);

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  if (!book) return <div>Cargando...</div>;

  return (
    <div className="book-detail-background">
      <div className="flecha" onClick={handleSubmit}>
        <FlechaRegresar />
      </div>

      <div>
        <BookHeader book={book} />
      </div>

      <div className="book-detalle2">
        <BookDescription book={book} />
        <BookChapters book={book} />
      </div>
    </div>
  );
};

export default BookDetail;
