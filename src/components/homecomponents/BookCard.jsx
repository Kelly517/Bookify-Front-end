import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flechaleft, Flecharight } from "../../icons/Icons";
import '../../css/homecomponents/bookCardHome.css';

const BookCard = ({
  books,
  showPrice = false,
  showDescription = false,
  showRating = false,
  customClassName = '',
  showDivider = true,
  booksPerPage = 5,
  showBoton = true,
  showBotonderecho = true
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = books.slice(startIndex, endIndex);
  const handleGoToProfile = (e, email) => {
    e.stopPropagation();
    navigate(`/dashboard/visit/profile/${email}`);
  };
  const canGoNext = endIndex < books.length;
  const canGoPrev = currentPage > 0;

  return (
    <>
      <div className={`book-card-wrapper-relative ${customClassName}`}>
        {showBotonderecho && (
          <button
            type="button"
            className="arrow-button left"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!canGoPrev}
          >
            <Flechaleft />
          </button>
        )}

        <div className="book-card-scroll-container">
          {currentBooks.map((bookData) => (
            <div
              className="book-card-horizontal"
              data-testid={`book-card-${bookData.title.replace(/\s+/g, "-")}`}
              key={bookData.bookId}
              onClick={() =>
                navigate(`/dashboard/book/${bookData.bookIdentifierCode}`)
              }
            >
              <img
                src={`http://localhost:8080/api/bookify/view-image/${bookData.title}/${bookData.coverPage}`}
                alt="Portada"
                className="book-cover-horizontal"
              />

              <div className="book-info-horizontal">
                <h3 className="book-title">{bookData.title}</h3>
                 <p className="autorBookCardHome" onClick={(e) => handleGoToProfile(e, bookData.author.email)}>  {bookData.author.username}
                 </p> 
                <div className="book-rating">
                  {showRating && (
                    <div className="book-rating">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i}>
                          {bookData.averageScore >= i + 1
                            ? "★"
                            : bookData.averageScore > i
                            ? "⯨"
                            : "☆"}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {showDescription && (
                  <p className="book-description">{bookData.description}</p>
                )}

                {showPrice && (
                  <div className="book-price">
                    {bookData.price === 0 ? (
                      <span className="badge-free">Gratis</span>
                    ) : (
                      <span>${bookData.price.toLocaleString("es-CO")}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {showBoton && (
          <button
            type="button"
            className="arrow-button right"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!canGoNext}
          >
            <Flecharight />
          </button>
        )}
      </div>

      {showDivider && <hr className="section-divider" />}
    </>
  );
};

export default BookCard;
