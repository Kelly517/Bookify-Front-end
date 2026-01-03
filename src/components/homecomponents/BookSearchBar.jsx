import React, { useContext, useRef } from "react";
import { Search } from "../../icons/Icons";
import { BookContext } from "../../assets/context/BookContext";
import { useBookSearch } from "../../features/home/hooks/useBookSearch";

const BookSearchBar = () => {
  const { setBooks } = useContext(BookContext);
  const inputRef = useRef(null);

  const { searchTerm, setSearchTerm, isSearching, error, runSearch } =
    useBookSearch({ setBooks, pageSize: 5 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await runSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="barra-busqueda">
      <div
        className="contenedor-input-lupa"
        onClick={() => inputRef.current?.focus()}
      >
        <Search className="icono-lupa" />

        <input
          ref={inputRef}
          className="input-busqueda"
          type="search"
          placeholder="Buscar por título o el autor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Opcional: indicador simple de carga (sin “cosas pro” todavía) */}
        {isSearching ? <span style={{ marginLeft: 8 }}>...</span> : null}
      </div>

      {/* Opcional: error simple (luego lo estilizamos pro) */}
      {error ? (
        <p style={{ marginTop: 6, fontSize: 12 }}>
          Hubo un error buscando. Intenta de nuevo.
        </p>
      ) : null}
    </form>
  );
};

export default BookSearchBar;