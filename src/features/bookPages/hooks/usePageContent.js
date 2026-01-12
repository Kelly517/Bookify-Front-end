import { useState } from "react";
import { pageChapterService } from "../../../services/pageChapterService";

export function usePageContent(initialPage = null) {
  const [selectedPage, setSelectedPage] = useState(initialPage);

  const selectPage = async (page) => {
    try {
      const { data: content } = await pageChapterService.getPageContent(page.bookPageId);
      setSelectedPage({ ...page, pageContent: content });
    } catch (e) {
      console.log("Error cargando contenido de la página:", e);
    }
  };

  const newChapter = () => setSelectedPage(null);

  return { selectedPage, setSelectedPage, selectPage, newChapter };
}
