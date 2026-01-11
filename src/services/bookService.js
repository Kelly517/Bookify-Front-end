// src/services/bookService.js
import { apiClient } from "./apiClient";

export async function getBooks({ page = 0, size = 5, sort = "title,asc" } = {}) {
  const { data } = await apiClient.get("/api/bookify/books", {
    params: { page, size, sort },
  });
  return data; // viene con .content
}

export async function getBooksPage({ page = 0, size = 200, sort = "title,asc" } = {}) {
  const res = await apiClient.get("/api/bookify/books", {
    params: { page, size, sort },
  });
  return res.data;
}

export async function getBooksByCategory({
  category,
  page = 0,
  size = 5,
  sort = "title,asc",
} = {}) {
  const { data } = await apiClient.get("/api/bookify/books/category", {
    params: { category, page, size, sort },
  });
  return data; // viene con .content
}

export async function getTopRatedBooks() {
  const { data } = await apiClient.get("/api/bookify/books/rated");
  return data; // array
}

export async function searchBooks({ query } = {}) {
  const { data } = await apiClient.get("/api/bookify/find/book", {
    params: { query },
  });
  return data; // viene con .content
}
