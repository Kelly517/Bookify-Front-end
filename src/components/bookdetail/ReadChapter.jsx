import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "../../css/BookDetaildesing/bookRead.css";
import { Expant, FlechaRegresar, Pen } from '../../icons/Icons';

const ReadChapter = () => {
    const location = useLocation();
    const [ bgColor, setBgColor ] = useState("white");
    const [ isFullScreen, setIsFullScreen ] = useState(false);
    const { bookId, pageId, pageNumber } = location.state || {};
    const [contentPage, setContentPage] = useState("");
    const [extractContentPage, setExtractContentPage] = useState("");

    const handleChange = (e) => {
        setBgColor(e.target.value);
    }

    console.log(pageId, bookId, pageNumber);

    const handleFullScreen = () => {
        const element = document.documentElement;
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullScreen(false);
        } else {
            element.requestFullscreen()
            .then(() => {
                setIsFullScreen(true);
            }).catch(err => {
                console.log("Error al intentar pantalla completa");
            });
        }
    };

    const limpiarParrafosVacios = (html) => {
        return html.replace(/<p>\s*<\/p>/g, '');
      };
      

    useEffect(() => {
        const sidebar = document.querySelector('.sidebar');
        const navbar = document.querySelector('.navbar');

        if (isFullScreen) {
            navbar && (navbar.style.display = 'none');
            sidebar && (sidebar.style.display = 'none')
        } else {
            navbar && (navbar.style.display = 'flex');
            sidebar && (sidebar.style.display = 'flex');
        }
    }, [isFullScreen]);

    useEffect(() => {
        if (pageId) {
            axios.get(`http://localhost:8080/api/bookify/content/page/${pageId}`)
                .then(res => {
                    const html = limpiarParrafosVacios(res.data);
                    setExtractContentPage(html);
                })
                .catch(error => console.error("Error al extraer contenido del archivo:", error));
        }

        if (bookId && pageId) {
            axios.get(`http://localhost:8080/api/bookify/page/${pageId}/${pageNumber}/${bookId}`)
                .then(res => {
                    setContentPage(res.data);
                })
                .catch(error => console.error("Error al cargar capítulo:", error));
        }
    }, [bookId, pageId, pageNumber]);

    return (
        <div className={`conte-readBook ${bgColor}`}>
            <div className='options-read'>
                <div className='arrow-read'>
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
                        <p>{contentPage.pageTitle}</p>
                    </div>

                    <button className="fullscreen-btn" onClick={handleFullScreen}>
                        <Expant />
                    </button>
                </div>


            </div>
            <div className={`Writing-sheet ${bgColor}`} dangerouslySetInnerHTML={{ __html: extractContentPage}}></div>
        </div>
    );
};

export default ReadChapter;
