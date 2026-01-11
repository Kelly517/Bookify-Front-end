import React from "react";
import BookCard from "../../../components/homecomponents/BookCard";
import "../../../css/profile/getProfile.css";

export default function BooksUserProfileView({ books, loading, error }) {
  return (
    <div className="components-container-profile">
      <div className="book-publishe">
        <h3>Libros publicados</h3>

        <div className="conte-book-profile">
          {loading ? <p>Cargando tus libros...</p> : null}
          {error ? <p>Error obteniendo los libros.</p> : null}

          {!loading && (!books || books.length === 0) ? (
            <p>No tienes libros publicados aún. ¡Anímate a publicar tu primer libro!</p>
          ) : null}

          {!loading && books && books.length > 0 ? (
            <BookCard
              books={books}
              showPrice={false}
              showDescription={true}
              customClassName="bookcard-read-style"
              showDivider={false}
              booksPerPage={6}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
