import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateNewBookForm from "../components/bookcomponents/CreateNewBookForm.jsx";
import NameChapterModal from "../components/bookpagecomponents/NameChapterModal.jsx";
import { useCreateBook } from "../features/books/hooks/useCreateBook";

const CreateNewBook = ({ onClose }) => {
  const navigate = useNavigate();

  const {
    createdBookId,
    bookId,
    showChapterModal,
    setShowChapterModal,
    createBook,
    createFirstChapter,
    // formError, // lo dejo listo por si luego quieres mostrarlo en UI
  } = useCreateBook();

  const [formData, setFormData] = useState({
  title: "",
  shortDescription: "",
  description: "",
  priceType: "FREE",
  price: null,
  category: "",
  status: "",
});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBook(formData); // abre modal al éxito (igual que antes)
  };

  const handleChapterSubmit = async (chapterTitle) => {
    try {
      const createdPage = await createFirstChapter({
        createdBookIdentifierCode: createdBookId,
        chapterTitle,
        bookId,
      });

      setShowChapterModal(false);
      onClose?.();

      navigate(`/dashboard/write/create-page/${createdBookId}`, {
        replace: true,
        state: {
          selectedPage: createdPage,
          bookId,
          bookIdentifierCode: createdBookId,
        },
      });
    } catch (error) {
      console.log("Error al guardar el capítulo: ", error);
    }
  };

  return (
    <>
      <CreateNewBookForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        handleCancel={onClose}
      />

      {showChapterModal && (
        <NameChapterModal
          onSubmit={handleChapterSubmit}
          onCancel={() => setShowChapterModal(false)}
        />
      )}
    </>
  );
};

export default CreateNewBook;
