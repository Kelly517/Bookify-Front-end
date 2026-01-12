import { useState } from "react";
import axios from "axios";

function normalizePrice({ priceType, price }) {
  if (priceType === "FREE") return null;

  const numeric = Number(price);
  if (Number.isNaN(numeric)) return null;

  return numeric;
}

export function useCreateBook() {
  const [formError, setFormError] = useState("");
  const [createdBookId, setCreatedBookId] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [showChapterModal, setShowChapterModal] = useState(false);

  const createBook = async (formData) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/bookify/book",
        {
          title: formData.title,
          shortDescription: formData.shortDescription,
          description: formData.description,
          price: normalizePrice({ priceType: formData.priceType, price: formData.price }),
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
      setBookId(createdBook.bookId);
      setShowChapterModal(true);
      setFormError("");

      return createdBook;
    } catch (error) {
      if (error?.response?.status === 409) {
        setFormError("Ya existe un libro con ese título. Por favor elige otro.");
        alert("Ya existe un libro con este título");
      } else {
        setFormError("Ocurrió un error al guardar el libro.");
      }
      throw error;
    }
  };

  const createFirstChapter = async ({ createdBookIdentifierCode, chapterTitle, bookId }) => {
    const token = localStorage.getItem("authToken");

    const { data: createdPage } = await axios.post(
      `http://localhost:8080/api/bookify/page/${createdBookIdentifierCode}`,
      { pageTitle: chapterTitle, pageContent: "", bookId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return createdPage;
  };

  return {
    formError,
    createdBookId,
    bookId,
    showChapterModal,
    setShowChapterModal,
    createBook,
    createFirstChapter,
  };
}
