import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../css/editor/editor-book.css";
import BookPageForm from "../components/bookpagecomponents/BookPageForm";
import ChapterSidebar from "../components/bookpagecomponents/ChapterSideBar";

import { useBookByIdentifierCode } from "../features/bookPages/hooks/useBookByIdentifierCode";
import { usePageContent } from "../features/bookPages/hooks/usePageContent";
import { useInitialPageFromBook } from "../features/bookPages/hooks/useInitialPageFromBook";
import { pageChapterService } from "../services/pageChapterService";

const EditChapter = () => {
  const { bookIdentifierCode } = useParams();
  const navigate = useNavigate();

  const [mostrarContenido, setMostrarContenido] = useState(true);
  const [showChapterModal, setShowChapterModal] = useState(false);

  const { book } = useBookByIdentifierCode(bookIdentifierCode);

  const { selectedPage, setSelectedPage, selectPage } = usePageContent(null);

  // Carga el primer capítulo como lo hacías antes
  useInitialPageFromBook(book, setSelectedPage);

  const toggleContenido = () => setMostrarContenido((prev) => !prev);

  const handleNewChapter = () => setShowChapterModal(true);

  const handleChapterSubmit = async (chapterTitle) => {
    const token = localStorage.getItem("authToken");

    try {
      await pageChapterService.createPage(
        bookIdentifierCode,
        {
          pageTitle: chapterTitle,
          pageContent: "",
          bookId: book?.bookId,
        },
        token
      );

      setShowChapterModal(false);

      // Mantengo EXACTO tu comportamiento: navega a create-page
      navigate(`/dashboard/write/create-page/${bookIdentifierCode}`, {
        replace: true,
        state: {
          selectedPage: { pageTitle: chapterTitle, pageContent: "" },
          bookIdentifierCode,
        },
      });
    } catch (error) {
      console.log("Error al guardar el capítulo: ", error);
    }
  };

  return (
    <div className="content-editor">
      <ChapterSidebar
        bookTitle={book?.title}
        bookPages={book?.bookPageEntity}
        bookIdentifierCode={bookIdentifierCode}
        mostrarContenido={mostrarContenido}
        onToggleContenido={toggleContenido}
        onSelectPage={selectPage}
        onNewChapterClick={handleNewChapter}
        showChapterModal={showChapterModal}
        onChapterSubmit={handleChapterSubmit}
        onCloseModal={() => setShowChapterModal(false)}
      />

      {selectedPage && (
        <BookPageForm
          mode="edit"
          pageData={selectedPage}
          bookIdentifierCode={bookIdentifierCode}
        />
      )}
    </div>
  );
};

export default EditChapter;
