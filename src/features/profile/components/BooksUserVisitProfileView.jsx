import React from "react";
import BookCard from "../../../components/homecomponents/BookCard";
import "../../../css/profile/getProfile.css";

export default function BooksUserVisitProfileView({ books, loadingBooks, errorBooks }) {
  if (loadingBooks) return <p>Cargando libros...</p>;
  if (errorBooks) return <p>Error obteniendo los libros.</p>;

  return (
    <div className="components-container-profile">
      <div className="book-publishe">
        <h3>Libros publicados</h3>

        <div className="conte-book-profile">
          {!books || books.length === 0 ? (
            <p>No tiene libros publicados aún.</p>
          ) : (
            <BookCard
              books={books}
              showPrice={false}
              showDescription={true}
              customClassName="bookcard-read-style"
              showDivider={false}
              booksPerPage={6}
            />
          )}
        </div>
      </div>
    </div>
  );
}
