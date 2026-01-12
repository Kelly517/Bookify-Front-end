import { useEffect, useState } from "react";
import { bookPageService } from "../../../services/bookPageService";

export function useBookDetail(bookIdentifierCode) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await bookPageService.getBookByIdentifierCode(bookIdentifierCode);
        setBook(response.data);
      } catch (err) {
        console.log("Error obteniendo el detalle del libro", err);
      }
    }

    fetchBook();
  }, [bookIdentifierCode]);

  // Mantengo tu log EXACTO (solo está movido)
  useEffect(() => {
    console.log("📚 Book actualizado:", book);
  }, [book]);

  return { book };
}
