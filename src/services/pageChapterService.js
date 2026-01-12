import axios from "axios";

const API = "http://localhost:8080/api/bookify";

export const pageChapterService = {
  getPageContent(bookPageId) {
    return axios.get(`${API}/content/page/${bookPageId}`);
  },

  createPage(bookIdentifierCode, payload, token) {
    return axios.post(`${API}/page/${bookIdentifierCode}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updatePage(bookPageId, payload, token) {
    return axios.put(`${API}/page/${bookPageId}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getPageMeta(pageId, pageNumber, bookId) {
    return axios.get(`${API}/page/${pageId}/${pageNumber}/${bookId}`);
  },
};
