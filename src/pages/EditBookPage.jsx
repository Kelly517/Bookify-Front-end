import React, { useEffect, useState } from "react";
import BookPageForm from "../components/bookpagecomponents/BookPageForm";
import { useNavigate, useParams } from "react-router-dom";
import "../css/editor/editor-book.css";
import { Window, More } from "../icons/Icons";
import UploadBookCover from "../components/bookpagecomponents/UploadBookCover";
import NameChapterModal from "../components/bookpagecomponents/NameChapterModal";
import axios from "axios";

const EditChapter = () => {
 const { bookIdentifierCode } = useParams();
 const [mostrarContenido, setMostrarContenido] = useState(true);
 const [book, setBook] = useState([]);
 const [getPage, setGetPage] = useState("");
 const [showChapterModal, setShowChaperModal] = useState(null);
 const navigate = useNavigate();

 useEffect(() => {
   const fetchBook = async () => {
     try {
       const books = await axios.get(
         `http://localhost:8080/api/bookify/book/${bookIdentifierCode}`
       );
       const bookData = books.data;
       setBook(bookData);

       const firstPage = bookData.bookPageEntity?.[0];

       if (firstPage) {
         const contentResponse = await axios.get(
           `http://localhost:8080/api/bookify/content/page/${firstPage.bookPageId}`
         );
         const content = contentResponse.data;

         const fullPage = {
           ...firstPage,
           pageContent: content,
         };

         setGetPage(fullPage);
       }
     } catch (error) {
       console.log("Error: ", error);
     }
   };

   fetchBook();
 }, [bookIdentifierCode]);

 const toggleContenido = () => {
   setMostrarContenido((prev) => !prev);
 };

 const handleSelectPage = async (page) => {
   try {
     const res = await axios.get(
       `http://localhost:8080/api/bookify/content/page/${page.bookPageId}`
     );
     const content = res.data;

     const fullPage = {
       ...page,
       pageContent: content,
     };

     setGetPage(fullPage);
   } catch (error) {
     console.log("Error al obtener contenido de capítulo:", error);
   }
 };

 const handleUpdatePage = (updatedContent) => {
   setGetPage(prevPage => ({
     ...prevPage,
     pageContent: updatedContent
   }));
 };

 const handleChapterSubmit = async (chapterTitle) => {
   const token = localStorage.getItem("authToken");

   try {
     await axios.post(
       `http://localhost:8080/api/bookify/page/${bookIdentifierCode}`,
       {
         pageTitle: chapterTitle,
         pageContent: "",
         bookId: book.bookId,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       }
     );

     console.count('submit chapter')
     setShowChaperModal(false);
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

 const handleNewChapter = () => {
   setShowChaperModal(true);
 };

 return (
   <div className="content-editor">
     <div className={`ventana ${mostrarContenido ? "" : "ventana-colapsada"}`}>
       <div className="edit-book-modal" onClick={toggleContenido}>
         <h4 >
           {book.title}
           <Window  className={`icon-window ${!mostrarContenido ? "pulsar" : ""}`}/>
         </h4>
       </div>

       {mostrarContenido && (
         <>
           <UploadBookCover bookIdentifierCode={ bookIdentifierCode } />
           <div className="capitulos2">
             <h4>Lista de capítulos</h4>
             <button className="agg-new-capitulo" onClick={handleNewChapter}>
               + Agregar nuevo capítulo
             </button>
             {showChapterModal && (
               <NameChapterModal
                 onSubmit={handleChapterSubmit}
                 onCancel={() => setShowChaperModal(false)}
               />
             )}
             {book.bookPageEntity?.map((page) => {
               return (
                 <div
                   key={page.bookPageId}
                   onClick={() => {
                     handleSelectPage(page);
                   }}
                   className="containes-capitulos"
                 >
                   <div className="capitulo-creado">
                     <More className="icon-more" />
                     <p>{page.pageTitle}</p>
                   </div>
                 </div>
               );
             })}
           </div>
         </>
       )}
     </div>

     {getPage && (
       <BookPageForm 
         mode="edit" 
         pageData={getPage} 
         onContentUpdated={handleUpdatePage}
       />
     )}
   </div>
 );
};

export default EditChapter;