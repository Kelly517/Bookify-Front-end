import axios from "axios";

const API = "http://localhost:8080/api/bookify";

export const scoreService = {
  submitScore({ book, user, score }) {
    return axios.post(`${API}/score`, { book, user, score });
  },
};
