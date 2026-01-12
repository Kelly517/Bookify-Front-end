import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadAuthFromStorage } from "../../../storage/authStorage";
import { orderService } from "../../../services/orderService";

export function useCheckout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { book, bookIdentifierCode, quantity } = location.state || {};
  const { token } = loadAuthFromStorage();

  const [response, setResponse] = useState("");

  const handleBuy = async (event) => {
    event.preventDefault();

    orderService
      .createOrderResponse({ bookIdentifierCode, quantity, token })
      .then((res) => {
        console.log("Orden creada: ", res.data);
        setResponse(res);
        navigate(`/dashboard/book/${book.bookIdentifierCode}`);
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error: ", error.response.data.message);
        }
      });
  };

  return {
    book,
    bookIdentifierCode,
    quantity,
    response,
    handleBuy,
  };
}
