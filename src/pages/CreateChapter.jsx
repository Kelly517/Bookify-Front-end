import React, { useEffect, useState } from 'react';
import BookPageForm from '../components/bookpagecomponents/BookPageForm';
import { useLocation, useParams } from 'react-router-dom';
import "../css/editor/editor-book.css";
import { Window, More } from '../icons/Icons';
import UploadBookCover from '../components/bookpagecomponents/UploadBookCover';
import axios from 'axios';

const CreateChapter = () => {
  const { bookIdentifierCode } = useParams();
  const [mostrarContenido, setMostrarContenido] = useState(true);
  const { state } = useLocation();
  const [book, setBook] = useState({});
  const [selectedPage, setSelectedPage] = useState(state?.selectedPage || null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/bookify/book/${bookIdentifierCode}`
        );
        setBook(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchBook();
  }, [bookIdentifierCode]);

  const toggleContenido = () => setMostrarContenido(prev => !prev);

  const handleSelectPage = async (page) => {
    try {
      const { data: content } = await axios.get(
        `http://localhost:8080/api/bookify/content/page/${page.bookPageId}`
      );
      setSelectedPage({ ...page, pageContent: content });
    } catch (e) {
      console.log("Error cargando contenido de la página:", e);
    }
  };

  const handleNewChapter = () => setSelectedPage(null);

  return (
    <div className="content-editor">
      <div className={`ventana ${mostrarContenido ? "" : "ventana-colapsada"}`}>
        <div className="edit-book-modal" onClick={toggleContenido}>
          <h4>
            {book?.title}
            <Window className={`icon-window ${!mostrarContenido ? "pulsar" : ""}`} />
          </h4>
        </div>

        {mostrarContenido && (
          <>
            <UploadBookCover bookIdentifierCode={bookIdentifierCode} />
            <div className="capitulos2">
              <h4>Lista de capítulos</h4>
              <button className='agg-new-capitulo' onClick={handleNewChapter}>
                + Agregar nuevo capítulo
              </button>

              {book?.bookPageEntity?.map((page) => (
                <div
                  key={page.bookPageId}
                  className='containes-capitulos'
                  onClick={() => handleSelectPage(page)}
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
