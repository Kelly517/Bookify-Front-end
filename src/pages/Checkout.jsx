import React, { useEffect, useState } from 'react'
import CheckoutComponent from '../components/checkoutcomponents/CheckoutComponent'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const Checkout = () => {
  const location = useLocation();
  const { book, bookIdentifierCode, quantity } = location.state || {};
  const token = localStorage.getItem("authToken")
  const [ response, setResponse ] = useState("");
  const navigate = useNavigate();

  const handleGetOrder = async () => {
    
  }

  const handleBuy = async (event) => {
    event.preventDefault();
  
      axios.post(`http://localhost:8080/api/bookify/order-response/${bookIdentifierCode}/${quantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        console.log("Orden creada: ", res.data)
        setResponse(res);
        navigate(`/dashboard/book/${book.bookIdentifierCode}`);
      })
      .catch(error => {
        if(error.response) {
          console.log("Error: ", error.response.data.message);
        }
      });
  }

  return (
    <div>
      <CheckoutComponent onSubmit={handleBuy} book={book} />
    </div>
  )
}

export default Checkout
