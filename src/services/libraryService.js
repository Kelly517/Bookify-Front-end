import { apiClient } from "./apiClient";

export async function getPurchasedBooksByUserId(userId) {
  const path = `/api/bookify/books/purchased/${userId}`;
  const res = await apiClient.get(path);
  return res.data;
}