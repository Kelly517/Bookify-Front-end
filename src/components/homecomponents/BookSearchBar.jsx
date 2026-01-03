import React, { useContext, useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Search } from "../../icons/Icons";
import { BookContext } from "../../assets/context/BookContext";

const BookSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setBooks } = useContext(BookContext);
  const inputRef = useRef(null); // 👈 para enfocar al tocar la lupa/contenedor

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      fetchAllBooks();
      return;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/bookify/find/book`,
        { params: { query: searchTerm } }
      );
      setBooks(data.content);
    } catch (error) { console.error(error); }
  };

  const fetchAllBooks = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/bookify/books`, {
        params: { page: 0, size: 5, sort: "title,asc" },
      });
      setBooks(data.content);
    } catch (error) { console.error("Error recargando libros:", error); }
  };

  useEffect(() => { if (searchTerm.trim() === "") fetchAllBooks(); }, [searchTerm]);

  return (
    <form onSubmit={handleSearch} className="barra-busqueda">
      <div
        className="contenedor-input-lupa"
        onClick={() => inputRef.current?.focus()} /* 👈 toca la lupa y abre */
      >
        <Search className="icono-lupa" />
        <input
          ref={inputRef}                 /* 👈 para focus() */
          className="input-busqueda"
          type="search"
          placeholder="Buscar por título o el autor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default BookSearchBar;
