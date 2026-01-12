import RatingStars from "./RatingStars.jsx";
import categoryOptions from "../bookcomponents/categoryOptions.js";
import "../../css/BookDetaildesing/Bookdetail.css";
import { loadAuthFromStorage } from "../../storage/authStorage";

const BookHeader = ({ book }) => {
  const categoryLabel =
    categoryOptions.find((cat) => cat.value === book.category)?.label || book.category;

  const { userId } = loadAuthFromStorage();

  return (
    <div className="contenedor-book-detail">
      <img
        src={`http://localhost:8080/api/bookify/view-image/${book.title}/${book.filePathCoverPage}`}
        alt="Portada"
        className="portada-book-detail"
      />

      <div className="contenido">
        <h1 className="titulo">{book.title}</h1>

        <div className="autor-categoria">
          <h3 className="autor">{book.author.userName}</h3>
          <span className="categoria">{categoryLabel}</span>
        </div>

        <p className="descripcion">{book.shortDescription}</p>

        <p className="precio">
          Precio:{" "}
          <span className="valor-precio">
            {book.price == null || Number(book.price) === 0 ? (
              <span className="badge-free">Gratis</span>
            ) : (
              <span>${book.price.toLocaleString("es-CO")}</span>
            )}
          </span>
        </p>

        <div className="book-rating">
          <RatingStars book={book.bookId} user={userId} />
        </div>
      </div>
    </div>
  );
};

export default BookHeader;
