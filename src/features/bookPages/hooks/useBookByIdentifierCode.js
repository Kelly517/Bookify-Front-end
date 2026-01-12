import { useEffect, useState } from "react";
import { bookPageService } from "../../../services/bookPageService";

export function useBookByIdentifierCode(bookIdentifierCode) {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookIdentifierCode) return;

    let alive = true;
    setLoading(true);
    setError(null);

    bookPageService
      .getBookByIdentifierCode(bookIdentifierCode)
      .then(({ data }) => {
        if (!alive) return;
        setBook(data);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [bookIdentifierCode]);

  return { book, loading, error };
}
