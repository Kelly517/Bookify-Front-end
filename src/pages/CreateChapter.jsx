import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import BookPageForm from "../components/bookpagecomponents/BookPageForm";
import UploadBookCover from "../components/bookpagecomponents/UploadBookCover";
import "../css/editor/editor-book.css";
import { Window, More } from "../icons/Icons";

import { useBookByIdentifierCode } from "../features/bookPages/hooks/useBookByIdentifierCode";
import { usePageContent } from "../features/bookPages/hooks/usePageContent";

const CreateChapter = () => {
  const { bookIdentifierCode } = useParams();
  const { state } = useLocation();

  const [mostrarContenido, setMostrarContenido] = useState(true);

  const { book } = useBookByIdentifierCode(bookIdentifierCode);

  const { selectedPage, selectPage, newChapter } = usePageContent(
    state?.selectedPage || null
  );

  const toggleContenido = () => setMostrarContenido((prev) => !prev);

  return (
    <div className="content-editor">
      <div className={`ventana ${mostrarContenido ? "" : "ventana-colapsada"}`}>
        <div className="edit-book-modal" onClick={toggleContenido}>
          <h4>
            {book?.title}
            <Window
              className={`icon-window ${!mostrarContenido ? "pulsar" : ""}`}
            />
          </h4>
        </div>

        {mostrarContenido && (
          <>
            <UploadBookCover
              bookIdentifierCode={bookIdentifierCode}
              title={book?.title}
              coverPage={book?.coverPage}
            />

            <div className="capitulos2">
              <h4>Lista de capítulos</h4>

              <button className="agg-new-capitulo" onClick={newChapter}>
                + Agregar nuevo capítulo
              </button>

              {book?.bookPageEntity?.map((page) => (
                <div
                  key={page.bookPageId}
                  className="containes-capitulos"
                  onClick={() => selectPage(page)}
                >
                  <div className="capitulo-creado">
                    <More className="icon-more" />
                    <p>{page.pageTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <BookPageForm
        mode={"create"}
        pageData={selectedPage || { pageTitle: "", pageContent: "" }}
        bookIdentifierCode={bookIdentifierCode}
        bookId={book?.bookId}
      />
    </div>
  );
};

export default CreateChapter;
