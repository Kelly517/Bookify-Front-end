import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { USers, Book, Bookss, NewUser, Grafi } from '../../../icons/Icons';
import "../../../css/admi/homeAdmi.css";

const AdminHome = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [booksRes, usersRes] = await Promise.all([
          axios.get("http://localhost:8080/api/bookify/books", {
            params: { page: 0, sort: "title,asc" }
          }),
          axios.get("http://localhost:8080/api/bookify/get-all/users")
        ]);
  
        setBooks(booksRes.data.content);
        setUsers(usersRes.data.content);
        console.log("users", users);
      } catch (error) {
        console.log("An error occurred with the data: ", error);
      }
    };

    fetchStats();
  }, []);


  return (
    <div>
      <div className="admin-cards-container">
        <div className="admin-card">
          <div className="admin-card-icon">
            <USers />
          </div>
          <div>
            <p className="admin-card-label">Total de usuarios</p>
            <p className="admin-card-value">{users.length} usuarios</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon">
            <Book />
          </div>
          <div>
            <p className="admin-card-label">Libros publicados</p>
            <p className="admin-card-value">{books.length} Libros</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon">
            <Bookss />
          </div>
          <div>
            <p className="admin-card-label">Libros nuevos hoy</p>
            <p className="admin-card-value">{books.length} Libros</p>
          </div>
        </div>
      </div>


      <div className=''>
        <div className=''>
          <h3 id='top'>Top 5 libros destacados de la semana</h3>
          <div className="book-card-admi">
            {books.map((book) => {
              return (
                <div className="book-info" key={book.bookId}>
                  <img
                    src={`http://localhost:8080/api/bookify/view-image/${book.title}/${book.coverPage}`}
                    alt="Portada"
                    className="book-cover-horizontal2"
                  />
                  <div id='autor-admi'> <h3>{book.title}</h3> 
                  <p >{book.author.userName}</p> </div>
                 
                </div>

              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
