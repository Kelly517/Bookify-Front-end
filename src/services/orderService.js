import axios from "axios";

const API = "http://localhost:8080/api/bookify";

export const orderService = {
  createOrderResponse({ bookIdentifierCode, quantity, token }) {
    return axios.post(
      `${API}/order-response/${bookIdentifierCode}/${quantity}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
};
