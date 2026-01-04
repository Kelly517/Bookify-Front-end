import { apiClient } from "./apiClient";

export async function getBooksPage({ page = 0, size = 50, sort = "title,asc" } = {}) {
  const res = await apiClient.get("/api/bookify/books", {
    params: { page, size, sort },
  });
  return res.data;
}

export async function deleteBookByIdentifierCode(bookIdentifierCode) {
  const path = `/api/bookify/book/${bookIdentifierCode}`;
  await apiClient.delete(path);
}