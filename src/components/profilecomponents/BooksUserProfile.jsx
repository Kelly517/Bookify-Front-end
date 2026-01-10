import React, { useState, useEffect } from "react";
import { useUserData } from "./GetUserData";
import axios from "axios";
import BookCard from "../homecomponents/BookCard";
import "../../css/profile/getProfile.css";

const BooksUserProfile = () => {
  const email = localStorage.getItem("email");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!email) return;

    async function fetchBooks() {
      try {
        const bookResponse = await axios.get(
          `http://localhost:8080/api/bookify/books`
        );
        const allBooks = bookResponse.data.content;
        const filteredBooks = allBooks.filter(
          (book) => book.author?.email === email
        );

        console.log("All boks: ", allBooks);
        console.log("Filtered books: ", filteredBooks);
        setBooks(filteredBooks);
      } catch (err) {
        console.log("Error obteniendo los libros", err);
      }
    }
    fetchBooks();
  }, [email]);

  return (
    <>
      <div className="components-container-profile">
        <div className="book-publishe">
        <h3>Libros publicados</h3>

          <div className="conte-book-profile">
            {!books || books.length === 0 ? (
              <p>No tienes libros publicados aún.\n¡Anímate a publicar tu primer libro!</p>
            ) : (
              <div >
                <BookCard
                  books={books}
                  showPrice={false}
                  showDescription={true}
                  customClassName="bookcard-read-style"
                  showDivider={false} 
                  booksPerPage = {6}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BooksUserProfile;
