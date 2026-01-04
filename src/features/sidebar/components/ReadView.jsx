import React from "react";
import BookCard from "../../../components/homecomponents/BookCard.jsx";
import "../../../css/sidebar/read.css";

export default function ReadView({ books, loading, error }) {
  return (
    <div className="read-section">
      <h2 id="titulo-read-section">Mi biblioteca</h2>
      <p className="read-text">
        Este es el resumen de tus lecturas. Aquí puedes encontrar tus libros y tus listas de libros.
      </p>

      {loading ? <p>Cargando tu biblioteca...</p> : null}
      {error ? <p>Hubo un error cargando tus libros.</p> : null}

      <div className="read-area-container">
        <div className="read-area">
          <div className="book-read">
            <BookCard
              books={books}
              showPrice={false}
              showDescription={true}
              customClassName="bookcard-read-style"
              showDivider={false}
              booksPerPage={6}
            />
          </div>
        </div>
      </div>
    </div>
  );
}