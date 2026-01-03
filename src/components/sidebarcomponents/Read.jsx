import React, { useState, useEffect } from 'react';
import '../../css/sidebar/read.css';
import BookCard from '../homecomponents/BookCard.jsx';
import axios from 'axios';

const Read = () => {
  const [books, setBooks] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get(`http://localhost:8080/api/bookify/books/purchased/${userId}`);
        setBooks(response.data.content);
      } catch (err) {
        console.log("Error obteniendo los libros", err);
      }
    }
    fetchBooks();
  }, []);

  return (
    <div className='read-section'>
      <h2 id='titulo-read-section'>Mi biblioteca</h2>
      <p className="read-text">
        Este es el resumen de tus lecturas. Aquí puedes encontrar tus libros y tus listas de libros.
      </p>

      <div className='read-area-container'>
        <div className='read-area'>
            <>
              <div className='book-read'>
              <BookCard
                  books={books}
                  showPrice={false}
                  showDescription={true}
                  customClassName="bookcard-read-style"
                  showDivider={false} 
                  booksPerPage = {6}
                />
              </div>
            </>
        </div>
      </div>
    </div>
  );
};

export default Read;
