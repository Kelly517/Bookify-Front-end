import axios from "axios";
import React, { useEffect, useState } from "react";
import BookStatus from "../bookcomponents/BookStatus.jsx";
import CreateNewBook from "../../pages/CreateNewBook.jsx";
import { useNavigate } from "react-router-dom";
import "../../css/sidebar/write.css";
import { Books, Money, More } from "../../icons/Icons.jsx";

const WriteHome = () => {
  const [books, setBooks] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropDown = (bookId) => {
    setOpenDropdownId((prevId) => (prevId === bookId ? null : bookId));
  };

  const [stats, setStats] = useState({
    counPublishedBooks: 0,
    countTotalLikes: 0,
    countCurrentBooks: 0,
    countDraftBooks: 0,
  });

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("userId"));
    const fetchStats = async () => {
      try {
        const bookResponse = await axios.get(
          `http://localhost:8080/api/bookify/books`
        );
        const allBooks = bookResponse.data.content;
        const filteredBooks = allBooks.filter(
          (book) => book.author?.userId === userId
        );

        setBooks(filteredBooks);
      } catch (error) {
        console.log("An error occurred with the data: ", error);
      }
    };

    fetchStats();
  }, []);

  const handleNavigateToSales = () => {
    navigate(`/dashboard/sales`);
  };

  const handleEditBook = (bookIdentifierCode) => {
    navigate(`/dashboard/write/edit/page/${bookIdentifierCode}`);
  };

  const handleDeleteBook = (bookIdentifierCode) => {
    try {
      axios.delete(
        `http://localhost:8080/api/bookify/book/${bookIdentifierCode}`
      );
      console.log("Book deleted: ", bookIdentifierCode);
      window.location.reload();
    } catch (err) {
      console.log("Error obteniendo los libros", err);
    }
  };

  const messages = {
    welcome: "¿Listo para crear tu próxima historia?",
    recentBooks: "Tus libros recientes",
    recentBooksMessage: `Tienes ${books.length} libros publicados y 
       ${stats.countDraftBooks} en borrador . No dejes que tu imáginación se detenga!`,
    create: "Crear libro",
    createMessage: "Haz que tu próxima historia cobre vida",
  };

  return (
    <>
      <div className="write-section">
        <h4 id="titulo-read-section">{messages.welcome}</h4>
        <p className="secondary-text">{messages.recentBooksMessage}</p>

        <div className="stats">
          <div className="stat-box ">
            <div className="icon-title">
              <Books className="icon" />
              <h5>Libros publicados</h5>
            </div>
            <p>{books.length}</p>
          </div>

          <div className="stat-box" onClick={handleNavigateToSales}>
            <div className="icon-title">
              <Money className="icon" />
              <h5>Mis ventas</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="write-area">
        <div className="recent-books">
          <h3>{messages.recentBooks}</h3>

          <div className="book-card">
            {books.map((book) => {
              const statusKey = book.status?.trim();
              const statusClass =
                statusKey === "PUBLIC" ? "status-published" : "status-draft";

              const isOpen = openDropdownId === book.bookId;

              return (
                <div
                  className={`book-info ${isOpen ? "is-open" : ""}`}
                  key={book.bookId}
                >
                  <h3>{book.title}</h3>
                  <p className={statusClass}>
                    <BookStatus status={book.status} />
                  </p>

                  <More
                    className="icon-more"
                    onClick={() => toggleDropDown(book.bookId)}
                  />

                  {isOpen && (
                    <div className="book-modal-book-created">
                      <button
                        className="book-modal-button"
                        onClick={() =>
                          handleEditBook(book.bookIdentifierCode)
                        }
                      >
                        Editar libro
                      </button>
                      <button
                        className="book-modal-button"
                        onClick={() =>
                          handleDeleteBook(book.bookIdentifierCode)
                        }
                      >
                        Eliminar libro
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {showModal && (
          <div
            className="modal-bg"
            onClick={(e) => {
              if (e.target.classList.contains("modal-bg")) {
                setShowModal(false);
              }
            }}
          >
            <div className="modal-content">
              <CreateNewBook onClose={() => setShowModal(false)} />
            </div>
          </div>
        )}

        <div className="create-button">
          <button onClick={() => setShowModal(true)}>
            <span>+</span> {messages.create}
          </button>
          <p>{messages.createMessage}</p>
        </div>
      </div>
    </>
  );
};

export default WriteHome;
