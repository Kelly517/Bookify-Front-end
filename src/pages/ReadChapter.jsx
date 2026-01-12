import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "../../../css/BookDetaildesing/bookRead.css";
import { Expant, FlechaRegresar, Pen } from "../../../icons/Icons";
import { useReadChapter } from "../hooks/useReadChapter";

const ReadChapter = () => {
  const location = useLocation();
  const { bookId, pageId, pageNumber } = location.state || {};

  const [bgColor, setBgColor] = useState("white");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { contentPage, extractContentPage } = useReadChapter({ bookId, pageId, pageNumber });

  const handleChange = (e) => setBgColor(e.target.value);

  const handleFullScreen = () => {
    const element = document.documentElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      element
        .requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch(() => console.log("Error al intentar pantalla completa"));
    }
  };

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const navbar = document.querySelector(".navbar");

    if (isFullScreen) {
      navbar && (navbar.style.display = "none");
      sidebar && (sidebar.style.display = "none");
    } else {
      navbar && (navbar.style.display = "flex");
      sidebar && (sidebar.style.display = "flex");
    }
  }, [isFullScreen]);

  return (
    <div className={`conte-readBook ${bgColor}`}>
      <div className="options-read">
        <div className="arrow-read">
          <FlechaRegresar />
        </div>

        <div className="options-read2">
          <div className="color-select">
            <Pen />
            <select onChange={handleChange}>
              <option value="white">Blanco</option>
              <option value="black">morado</option>
              <option value="gray">Gris</option>
            </select>
          </div>

          <div className="chapter-title">
            <p>{contentPage?.pageTitle}</p>
          </div>

          <button className="fullscreen-btn" onClick={handleFullScreen}>
            <Expant />
          </button>
        </div>
      </div>

      <div
        className={`Writing-sheet ${bgColor}`}
        dangerouslySetInnerHTML={{ __html: extractContentPage }}
      />
    </div>
  );
};

export default ReadChapter;
