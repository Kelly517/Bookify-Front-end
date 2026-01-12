import { useEffect } from "react";
import { pageChapterService } from "../../../services/pageChapterService";

export function useInitialPageFromBook(book, setSelectedPage) {
  useEffect(() => {
    const loadFirst = async () => {
      const firstPage = book?.bookPageEntity?.[0];
      if (!firstPage?.bookPageId) return;

      try {
        const { data: content } = await pageChapterService.getPageContent(firstPage.bookPageId);
        setSelectedPage({ ...firstPage, pageContent: content });
      } catch (e) {
        console.log("Error cargando el primer capítulo:", e);
      }
    };

    loadFirst();
  }, [book, setSelectedPage]);
}
