import React from "react";
import "../../../css/sidebar/write.css";
import BookStatus from "../../../components/bookcomponents/BookStatus.jsx";
import CreateNewBook from "../../../pages/CreateNewBook.jsx";
import { Books, Money, More } from "../../../icons/Icons.jsx";

export default function WriteHomeView({
  books,
  loading,
  error,

  openDropdownId,
  onToggleDropDown,

  showModal,
  onOpenModal,
  onCloseModal,

  messages,
  onGoToSales,
  onEditBook,
  onDeleteBook,
}) {
  return (
    <>
      <div className="write-section">
        <h4 id="titulo-read-section">{messages.welcome}</h4>
        <p className="secondary-text">{messages.recentBooksMessage}</p>

        {loading ? <p>Cargando tus libros...</p> : null}
        {error ? <p>Hubo un error cargando tus libros.</p> : null}

        <div className="stats">
          <div className="stat-box ">
            <div className="icon-title">
              <Books className="icon" />
              <h5>Libros publicados</h5>
            </div>
            <p>{books.length}</p>
          </div>

          <div className="stat-box" onClick={onGoToSales}>
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
                <div className={`book-info ${isOpen ? "is-open" : ""}`} key={book.bookId}>
                  <h3>{book.title}</h3>
                  <p className={statusClass}>
                    <BookStatus status={book.status} />
                  </p>

                  <More className="icon-more" onClick={() => onToggleDropDown(book.bookId)} />

                  {isOpen && (
                    <div className="book-modal-book-created">
                      <button className="book-modal-button" onClick={() => onEditBook(book.bookIdentifierCode)}>
                        Editar libro
                      </button>
                      <button className="book-modal-button" onClick={() => onDeleteBook(book.bookIdentifierCode)}>
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
              if (e.target.classList.contains("modal-bg")) onCloseModal();
            }}
          >
            <div className="modal-content">
              <CreateNewBook onClose={onCloseModal} />
            </div>
          </div>
        )}

        <div className="create-button">
          <button onClick={onOpenModal}>
            <span>+</span> {messages.create}
          </button>
          <p>{messages.createMessage}</p>
        </div>
      </div>
    </>
  );
}