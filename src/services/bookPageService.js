import axios from "axios";

const API = "http://localhost:8080/api/bookify";

export const bookPageService = {
  getBookByIdentifierCode(bookIdentifierCode) {
    return axios.get(`${API}/book/${bookIdentifierCode}`);
  },
};
