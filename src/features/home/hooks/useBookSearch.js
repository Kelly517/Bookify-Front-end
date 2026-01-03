import { useCallback, useEffect, useState } from "react";
import { getBooks, searchBooks } from "../../../services/bookService";

/**
 * Hook para:
 * - manejar searchTerm
 * - buscar libros
 * - recargar libros cuando searchTerm queda vacío
 *
 * Recibe setBooks (del BookContext) para actualizar la lista visible.
 */
export function useBookSearch({ setBooks, pageSize = 5 } = {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllBooks = useCallback(async () => {
    setIsSearching(true);
    setError(null);
    try {
      const data = await getBooks({ page: 0, size: pageSize, sort: "title,asc" });
      setBooks(data.content);
    } catch (err) {
      setError(err);
    } finally {
      setIsSearching(false);
    }
  }, [setBooks, pageSize]);

  const runSearch = useCallback(
    async (term) => {
      const trimmed = (term ?? "").trim();

      // Si está vacío, recargamos todo
      if (trimmed === "") {
        await fetchAllBooks();
        return;
      }

      setIsSearching(true);
      setError(null);
      try {
        const data = await searchBooks({ query: trimmed });
        setBooks(data.content);
      } catch (err) {
        setError(err);
      } finally {
        setIsSearching(false);
      }
    },
    [setBooks, fetchAllBooks]
  );

  // Si el usuario borra todo el texto, recargamos
  useEffect(() => {
    if (searchTerm.trim() === "") {
      // OJO: esto se dispara al inicio también (y está bien)
      fetchAllBooks();
    }
  }, [searchTerm, fetchAllBooks]);

  return {
    searchTerm,
    setSearchTerm,
    isSearching,
    error,
    runSearch,
    fetchAllBooks,
  };
}
