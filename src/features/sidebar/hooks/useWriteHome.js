import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadAuthFromStorage } from "../../../storage/authStorage";
import { deleteBookByIdentifierCode, getBooksPage } from "../../../services/authorBooksService";

export function useWriteHome() {
  const navigate = useNavigate();
  const { email } = loadAuthFromStorage();

  const [books, setBooks] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleDropDown = useCallback((bookId) => {
    setOpenDropdownId((prev) => (prev === bookId ? null : bookId));
  }, []);

  const closeDropDown = useCallback(() => setOpenDropdownId(null), []);

  const loadAuthorBooks = useCallback(async () => {
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getBooksPage({ page: 0, size: 200, sort: "title,asc" });
      const allBooks = data.content ?? [];
      const filtered = allBooks.filter((b) => b.author?.email === email);
      setBooks(filtered);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    loadAuthorBooks();
  }, [loadAuthorBooks]);

  const goToSales = useCallback(() => {
    navigate("/dashboard/sales");
  }, [navigate]);

  const editBook = useCallback(
    (bookIdentifierCode) => {
      navigate(`/dashboard/write/edit/page/${bookIdentifierCode}`);
    },
    [navigate]
  );

  const deleteBook = useCallback(
    async (bookIdentifierCode) => {
      await deleteBookByIdentifierCode(bookIdentifierCode);
      setBooks((prev) => prev.filter((b) => b.bookIdentifierCode !== bookIdentifierCode));
      closeDropDown();
    },
    [closeDropDown]
  );

  const messages = useMemo(
    () => ({
      welcome: "¿Listo para crear tu próxima historia?",
      recentBooks: "Tus libros recientes",
      recentBooksMessage: `Tienes ${books.length} libros publicados. ¡No dejes que tu imaginación se detenga!`,
      create: "Crear libro",
      createMessage: "Haz que tu próxima historia cobre vida",
    }),
    [books.length]
  );

  return {
    books,
    loading,
    error,

    openDropdownId,
    toggleDropDown,

    showModal,
    openModal: () => setShowModal(true),
    closeModal: () => setShowModal(false),

    messages,
    goToSales,
    editBook,
    deleteBook,
  };
}