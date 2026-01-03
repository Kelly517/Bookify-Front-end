import { useEffect, useState, useCallback } from "react";
import { getBooks, getBooksByCategory, getTopRatedBooks } from "../../../services/bookService";

/**
 * Este hook se encarga de:
 * - cargar libros base (otros libros)
 * - cargar topBooks (top 5)
 * - manejar filtro por categoría
 */
export function useHomeBooks({ setBooks, initialPageSize = 5 } = {}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [topBooks, setTopBooks] = useState([]);

  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingTopBooks, setLoadingTopBooks] = useState(false);

  const [errorBooks, setErrorBooks] = useState(null);
  const [errorTopBooks, setErrorTopBooks] = useState(null);

  const loadBooks = useCallback(async () => {
    setLoadingBooks(true);
    setErrorBooks(null);
    try {
      const data = await getBooks({ page: 0, size: initialPageSize, sort: "title,asc" });
      setBooks(data.content);
    } catch (err) {
      setErrorBooks(err);
    } finally {
      setLoadingBooks(false);
    }
  }, [setBooks, initialPageSize]);

  const loadTopBooks = useCallback(async () => {
    setLoadingTopBooks(true);
    setErrorTopBooks(null);
    try {
      const data = await getTopRatedBooks();
      setTopBooks(data);
    } catch (err) {
      setErrorTopBooks(err);
    } finally {
      setLoadingTopBooks(false);
    }
  }, []);

  const changeCategory = useCallback(
    async (category) => {
      setSelectedCategory(category);
      setLoadingBooks(true);
      setErrorBooks(null);

      try {
        if (category === "") {
          const data = await getBooks({ page: 0, size: initialPageSize, sort: "title,asc" });
          setBooks(data.content);
          return;
        }

        const data = await getBooksByCategory({
          category,
          page: 0,
          size: initialPageSize,
          sort: "title,asc",
        });
        setBooks(data.content);
      } catch (err) {
        setErrorBooks(err);
      } finally {
        setLoadingBooks(false);
      }
    },
    [setBooks, initialPageSize]
  );

  // Carga inicial
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  useEffect(() => {
    loadTopBooks();
  }, [loadTopBooks]);

  return {
    selectedCategory,
    topBooks,
    loadingBooks,
    loadingTopBooks,
    errorBooks,
    errorTopBooks,
    changeCategory,
    reloadBooks: loadBooks,
    reloadTopBooks: loadTopBooks,
  };
}
