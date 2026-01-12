import { useEffect, useState } from "react";
import { pageService } from "../../../services/pageService";

export function useReadChapter({ bookId, pageId, pageNumber }) {
  const [contentPage, setContentPage] = useState("");
  const [extractContentPage, setExtractContentPage] = useState("");

  const limpiarParrafosVacios = (html) => html.replace(/<p>\s*<\/p>/g, "");

  useEffect(() => {
    if (!pageId) return;

    pageService
      .getPageContent(pageId)
      .then((res) => {
        const html = limpiarParrafosVacios(res.data);
        setExtractContentPage(html);
      })
      .catch((error) => console.error("Error al extraer contenido del archivo:", error));
  }, [pageId]);

  useEffect(() => {
    if (!bookId || !pageId) return;

    pageService
      .getPageMeta(pageId, pageNumber, bookId)
      .then((res) => setContentPage(res.data))
      .catch((error) => console.error("Error al cargar capítulo:", error));
  }, [bookId, pageId, pageNumber]);

  return { contentPage, extractContentPage };
}
