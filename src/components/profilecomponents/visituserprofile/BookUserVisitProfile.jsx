import React, { useState, useEffect }  from "react";
import axios from "axios";
import BookCard from "../../homecomponents/BookCard";
import { useNavigate, useParams } from "react-router-dom";
import { useUserData } from "../GetUserData";
import { navBarProfileMessages } from "../profileComponentsMessages";
import "../../../css/profile/getProfile.css";

const BookUserVisitProfile = () => {
  const { email } = useParams();
  const { user, loading, error } = useUserData(email);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!user || !user.userId) return;

    async function fetchBooks() {
      try {
        const bookResponse = await axios.get(
          `http://localhost:8080/api/bookify/books`
        );
        const allBooks = bookResponse.data.content;
        const filteredBooks = allBooks.filter(
          (book) => book.author?.userId === user.userId
        );

        setBooks(filteredBooks);
      } catch (err) {
        console.log("Error obteniendo los libros", err);
      }
    }
    fetchBooks();
  }, [user?.userId]);

  if (loading) return <p>{navBarProfileMessages.charging}</p>;
  if (error) return <ProfileSpinners />;
  if (!user) return null;

  console.log("user ud", user.userId)

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

export default BookUserVisitProfile;
