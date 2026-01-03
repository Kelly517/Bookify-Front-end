import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { welcomeMessages, simplePanel, colorPaneles } from './welcomePageMessages';
import '../../css/welcome.css';
import { Flechita, Read, Publish, People, Start } from '../../icons/Icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

/* ⭐ Overlay de estrellitas */
const EstrellasAnimadas = () => {
  const estrellas = [
    { txt: '✦', clase: 'mediana',  top: '50%', left: '50%' },
    { txt: '✦', clase: 'mediana', top: '30%', left: '45%' },
    { txt: '✦', clase: 'mediana', top: '65%', left: '40%' },
    { txt: '✦', clase: '',        top: '40%', left: '65%' },
    { txt: '✦', clase: '',        top: '60%', left: '70%' },
    { txt: '✦', clase: 'chica',   top: '25%', left: '60%' },
    { txt: '✦', clase: 'mini',    top: '70%', left: '55%' },
    { txt: '✦', clase: 'chica',   top: '45%', left: '30%' },
    { txt: '✦', clase: 'mini',    top: '55%', left: '25%' },
    { txt: '✦', clase: 'mini',    top: '35%', left: '70%' },
  ];

  return (
    <div className="cielo-estrellas" aria-hidden="true">
      {estrellas.map((e, i) => (
        <span
          key={i}
          className={`estrella ${e.clase}`}
          style={{ top: e.top, left: e.left }}
        >
          {e.txt}
        </span>
      ))}
    </div>
  );
};

const WelcomeComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 2400, once: true });
  }, []);

  const handleGoToRegisterClick = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="contenedorPrincipalInicio" id="home" data-aos="fade-up">
        <div className='bookify-bienvenida'>
          <h3 className='titulo-bienvenida'>{welcomeMessages.welcomeToBookify}</h3>
          <p className='descripcion-bienvenida'>{welcomeMessages.welcomeToBookifyDescription}</p>
          <button onClick={handleGoToRegisterClick} className='boton-empezar' data-aos="fade-right">
            <Flechita className="icono-flechita" />
            {welcomeMessages.startsNow}
          </button>
        </div>

        {/*  Estrella por fuera del contenedor de libros */}
        <EstrellasAnimadas />

        <div className="imagenes-libros" data-aos="fade-up">
          <div className="libro1"></div>
          <div className="libro2"></div>
          <div className="libro3"></div>
          <div className="libro4"></div>
        </div>
      </div>

      <div className='contenedor-quienes' id="who-are" data-aos="fade-left">
        <div className='quienes-somos'>
          <h3 className='titulo-quienes'>{welcomeMessages.whoAreWe}</h3>
          <p className='mensaje-quienes'>{welcomeMessages.whoAreWeMessage}</p>
        </div>
        <div className='descripcion-bookify'>
          <p className='texto-descripcion-bookify'>{welcomeMessages.bookifyDescription}</p>
        </div>
      </div>

      <div className='contenedor-paneles'>
        <div className='primer-panel' data-aos="fade-right">
          <Read className='icono-leer' />
          <h3>{colorPaneles.readWithoutLimits}</h3>
          <p>{colorPaneles.readText}</p>
        </div>

        <div className='segundo-panel' data-aos="fade-up">
          <Publish className='icono-publicar' />
          <h3>{colorPaneles.publishYourStory}</h3>
          <p>{colorPaneles.publishText}</p>
        </div>

        <div className='tercer-panel' data-aos="fade-left">
          <People className='icono-personas' />
          <h3>{colorPaneles.connectWithAudience}</h3>
          <p>{colorPaneles.connectText}</p>
        </div>
      </div>

      <div className="seccion-superior-panel" data-aos="zoom-in-up">
        <div className="panel-simple-izquierda">
          <div className="icono-mas-texto">
            <Start className="icono-personas" />
            <p className="descripcion-para-ti">{simplePanel.descriptionForYou}</p>
          </div>
          <h3 className="titulo-panel-simple">{simplePanel.simplePanel}</h3>
        </div>

        <div className="panel-para-ti-derecha">
          <div className="contenido-derecha">
            <p className="mensaje-para-ti">{simplePanel.messageForYou}</p>
            <button className="boton-video">Ver video instructivo</button>
          </div>
        </div>
      </div>

      <div className="panel-para-usuarios" data-aos="fade-up">
        <div className="textos-para-usuarios">
          <h3 className="titulo-lectores">Si lees</h3>
          <p className="para-lectores">{simplePanel.messageForReaders}</p>
          <h3 className="titulo-escritores">Si escribes</h3>
          <p className="para-escritores">{simplePanel.messageForWriters}</p>
        </div>
        <div className="imagen-para-usuarios"></div>
      </div>

      <div className="contenedor-resenas" id="reviews">
        <div className="tarjeta-resena" data-aos="fade-right">
          <div className="avatar-resena avatar-juan"></div>
          <span className="etiqueta-resena">Reseña</span>
          <p className="texto-resena">Gracias a Bookify publiqué mi primer libro y ya tengo más de 100 lectores.</p>
          <p className="autor-resena">— Juan, escritor desde Medellín</p>
        </div>

        <div className="tarjeta-resena" data-aos="fade-up">
          <div className="avatar-resena avatar-andres"></div>
          <span className="etiqueta-resena">Reseña</span>
          <p className="texto-resena">Me encanta leer en esta página... Bookify es cómodo y tiene un montón de historias.</p>
          <p className="autor-resena">— Andrés, lector habitual</p>
        </div>

        <div className="tarjeta-resena" data-aos="fade-up">
          <div className="avatar-resena avatar-luisa"></div>
          <span className="etiqueta-resena">Reseña</span>
          <p className="texto-resena">Publicar capítulos es muy fácil y me motiva a seguir escribiendo.</p>
          <p className="autor-resena">— Luisa, autora de ciencia ficción</p>
        </div>

        <div className="tarjeta-resena" data-aos="fade-left">
          <div className="avatar-resena avatar-valeria"></div>
          <span className="etiqueta-resena">Reseña</span>
          <p className="texto-resena">Puedo guardar mis lecturas y leer sin interrupciones. Es perfecto.</p>
          <p className="autor-resena">— Valeria, estudiante y lectora nocturna</p>
        </div>
      </div>
    </>
  );
};

export default WelcomeComponent;
