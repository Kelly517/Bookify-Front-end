import { useEffect, useMemo, useState } from "react";
import { loadAuthFromStorage } from "../../../storage/authStorage";
import { getBooksPage } from "../../../services/bookService";

export function useMyBooks() {
  const { email } = loadAuthFromStorage();
  const numericUserId = useMemo(() => (email ? email : null), [email]);

  console.log("Email: ", numericUserId)

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!numericUserId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    getBooksPage({ page: 0, size: 200, sort: "title,asc" })
      .then((data) => {
        if (cancelled) return;
        const allBooks = data?.content ?? [];
        const mine = allBooks.filter((b) => b.author?.email === numericUserId);
        setBooks(mine);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [numericUserId]);

  return { books, loading, error };
}
