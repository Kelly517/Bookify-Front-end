import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookHeader from '../components/bookdetail/BookHeader';
import BookDescription from '../components/bookdetail/BookDescription';
import BookChapters from '../components/bookdetail/BookChapters';
import axios from 'axios';
import "../css/BookDetaildesing/Bookdetail.css";
import { FlechaRegresar } from '../icons/Icons';
import { useNavigate } from 'react-router-dom';

const BookDetail = () => {
  const { bookIdentifierCode } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await axios.get(`http://localhost:8080/api/bookify/book/${bookIdentifierCode}`);
        setBook(response.data);
      } catch (err) {
        console.log("Error obteniendo el detalle del libro", err);
      }
    }
    fetchBook();
  }, [bookIdentifierCode]);

  useEffect(() => {
    console.log("📚 Book actualizado:", book);
  }, [book]);

  const handleSubmit = () => {
    navigate("/dashboard")
  }

  if (!book) return <div>Cargando...</div>;

  return (
    <div className="book-detail-background">
      <div className='flecha' onClick={handleSubmit}><FlechaRegresar/></div>
      <div>
        <BookHeader book={book} />
      </div>
      <div className='book-detalle2'>
        <BookDescription book={book} />
        <BookChapters book={book} />
      </div>
    </div>
  );
  
}

export default BookDetail;
