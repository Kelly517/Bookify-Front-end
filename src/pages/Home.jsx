import React, { useContext } from "react";
import Categories from "../components/homecomponents/Categories";
import BookCard from "../components/homecomponents/BookCard";
import "../css/homecomponents/bookcard.css";

import categoryOptions from "../components/bookcomponents/categoryOptions";
import { BookContext } from "../assets/context/BookContext";

import CategorySelect from "../features/home/components/CategorySelect";
import { useHomeBooks } from "../features/home/hooks/useHomeBooks";

const Home = () => {
  const { books, setBooks } = useContext(BookContext);

  const {
    selectedCategory,
    topBooks,
    loadingBooks,
    loadingTopBooks,
    errorBooks,
    errorTopBooks,
    changeCategory,
  } = useHomeBooks({ setBooks, initialPageSize: 5 });

  return (
    <div>
      <Categories />

      <p className="p-categories">Top 5 libros de la semana</p>

      {/* Si luego quieres spinners pro, aquí ya tenemos loadingTopBooks */}
      {errorTopBooks && <p style={{ paddingLeft: 16 }}>Error cargando Top 5</p>}

      <BookCard
        books={topBooks}
        showPrice={true}
        showDescription={true}
        showRating={true}
        showBoton={false}
        showBotonderecho={false}
      />

      <div className="containerCategoriesHomeOne">
        <p className="p-categories">Otros libros que te pueden gustar</p>

        <div className="selectCategory">
          <CategorySelect
            value={selectedCategory}
            onChange={(e) => changeCategory(e.target.value)}
            options={categoryOptions}
          />
        </div>
      </div>

      {/* Si luego quieres spinners pro, aquí ya tenemos loadingBooks */}
      {errorBooks && <p style={{ paddingLeft: 16 }}>Error cargando libros</p>}

      <BookCard
        books={books}
        showPrice={true}
        showDescription={true}
        showRating={true}
        showBoton={false}
        showBotonderecho={false}
      />
    </div>
  );
};

export default Home;
