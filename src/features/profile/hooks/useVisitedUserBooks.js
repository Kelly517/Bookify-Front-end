import { useEffect, useState } from "react";
import { getBooksPage } from "../../../services/bookService";

export function useVisitedUserBooks(email) {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [errorBooks, setErrorBooks] = useState(null);

  useEffect(() => {
    if (!email) return;

    let cancelled = false;
    setLoadingBooks(true);
    setErrorBooks(null);

    getBooksPage({ page: 0, size: 200, sort: "title,asc" })
      .then((data) => {
        if (cancelled) return;
        const allBooks = data?.content ?? [];
        const filtered = allBooks.filter((b) => b.author?.email === email);
        setBooks(filtered);
      })
      .catch((err) => {
        if (!cancelled) setErrorBooks(err);
      })
      .finally(() => {
        if (!cancelled) setLoadingBooks(false);
      });

    return () => {
      cancelled = true;
    };
  }, [email]);

  return { books, loadingBooks, errorBooks };
}
