import React, { useState } from "react";
import axios from "axios";
import CreateNewBookForm from "../components/bookcomponents/CreateNewBookForm.jsx";
import NameChapterModal from "../components/bookpagecomponents/NameChapterModal.jsx";
import { useNavigate } from "react-router-dom";

const CreateNewBook = ({ onClose }) => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    price: "",
    category: "",
    status: "",
  });

  const [createdBookId, setCreatedBookId] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [bookIdentifierCode, setBookIdentifierCode] = useState(null);
  const [showChapterModal, setShowChaperModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/bookify/book",
        {
          title: formData.title,
          shortDescription: formData.shortDescription,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          status: formData.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const createdBook = response.data;
      setCreatedBookId(createdBook.bookIdentifierCode);
      setShowChaperModal(true);
      setBookId(createdBook.bookId);
      setBookIdentifierCode(createdBook.bookIdentifierCode);
      console.log("Abriendo modal");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setFormError(
          "Ya existe un libro con ese título. Por favor elige otro."
        );
        alert("Ya existe un libro con este título");
      } else {
        setFormError("Ocurrió un error al guardar el libro.");
      }
      console.log("Error al guardar el libro", error);
    }
  };

  const handleChapterSubmit = async (chapterTitle) => {
    const token = localStorage.getItem("authToken");

    try {
      const { data: createdPage } = await axios.post(
        `http://localhost:8080/api/bookify/page/${createdBookId}`,
        {
          pageTitle: chapterTitle,
          pageContent: "",
          bookId: bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShowChaperModal(false);
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
          onCancel={() => setShowChaperModal(false)}
        />
      )}
    </>
  );
};

export default CreateNewBook;
