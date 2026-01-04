import { useCallback, useEffect, useState } from "react";
import { loadAuthFromStorage } from "../../../storage/authStorage";
import { getPurchasedBooksByUserId } from "../../../services/libraryService";

export function useReadLibrary() {
  const { userId } = loadAuthFromStorage();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPurchasedBooks = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getPurchasedBooksByUserId(userId);
      setBooks(data.content ?? []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadPurchasedBooks();
  }, [loadPurchasedBooks]);

  return { books, loading, error, reload: loadPurchasedBooks };
}