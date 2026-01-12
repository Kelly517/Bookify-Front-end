import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/BookDetaildesing/Bookdetail.css";
import { useUserData } from "../profilecomponents/GetUserData";
import { loadAuthFromStorage } from "../../storage/authStorage";

const BookChapters = ({ book }) => {
  const navigate = useNavigate();

  const { email } = loadAuthFromStorage();
  const { user } = useUserData(email);

  const isPurchased = user?.purchasedBooks?.some((p) => p.bookId === book.bookId);

  const handleNavigator = (chapter) => {
    navigate(`/dashboard/read-book/${book.bookIdentifierCode}`, {
      state: {
        bookId: book.bookId,
        pageId: chapter.bookPageId,
        pageNumber: chapter.pageNumber,
      },
    });
  };

  return (
    <div className="container-capitulos">
      <h2>Capítulos</h2>

      <div className="capitulos">
        {book.bookPageEntity && book.bookPageEntity.length > 0 ? (
          <div className="list-capitulos">
            {book.bookPageEntity.map((chapter) => (
              <div
                className="capitulo-item"
                key={chapter.bookPageId}
                onClick={() => {
                  if (isPurchased) handleNavigator(chapter);
                }}
              >
                {chapter.pageTitle}
              </div>
            ))}
          </div>
        ) : (
          <p>No hay capítulos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default BookChapters;
