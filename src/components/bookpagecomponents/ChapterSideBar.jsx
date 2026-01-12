import React from "react";
import UploadBookCover from "./UploadBookCover";
import NameChapterModal from "./NameChapterModal";
import { Window, More } from "../../icons/Icons";

const ChapterSidebar = ({
  bookTitle,
  bookPages,
  bookIdentifierCode,
  mostrarContenido,
  onToggleContenido,
  onSelectPage,
  onNewChapterClick,
  showChapterModal,
  onChapterSubmit,
  onCloseModal,
}) => {
  return (
    <div className={`ventana ${mostrarContenido ? "" : "ventana-colapsada"}`}>
      <div className="edit-book-modal" onClick={onToggleContenido}>
        <h4>
          {bookTitle}
          <Window className={`icon-window ${!mostrarContenido ? "pulsar" : ""}`} />
        </h4>
      </div>

      {mostrarContenido && (
        <>
          <UploadBookCover bookIdentifierCode={bookIdentifierCode} />

          <div className="capitulos2">
            <h4>Lista de capítulos</h4>

            <button className="agg-new-capitulo" onClick={onNewChapterClick}>
              + Agregar nuevo capítulo
            </button>

            {showChapterModal && (
              <NameChapterModal onSubmit={onChapterSubmit} onCancel={onCloseModal} />
            )}

            {bookPages?.map((page) => (
              <div
                key={page.bookPageId}
                onClick={() => onSelectPage(page)}
                className="containes-capitulos"
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
  );
};

export default ChapterSidebar;
