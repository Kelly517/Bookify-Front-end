import React, { useState, useRef } from 'react';
import "../../css/bookcomponents/createnewform.css";

const NameChapterModal = ({ onSubmit, onCancel }) => {
  const [chapterTitle, setChapterTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const lockRef = useRef(false);

  const handleAccept = async (e) => {
    e?.preventDefault?.();
    if (lockRef.current) return;
    lockRef.current = true;
    setSubmitting(true);
    try {
      const title = chapterTitle.trim() || "Capítulo 1";
      await onSubmit(title);
    } finally {
      setSubmitting(false);
      lockRef.current = false;   
    }
  };

  return (
    <div className="chapter-modal-overlay">
      <form className="chapter-modal-content" onSubmit={handleAccept}>
        <h3 className="chapter-modal-title">Nombre del capítulo</h3>

        <input
          type="text"
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
          placeholder="Escribe el nombre del capítulo"
          className="chapter-modal-input"
          autoFocus
        />

        <div className="chapter-modal-buttons">
          <button type="button" className="chapter-modal-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" disabled={submitting}>
            {submitting ? "Creando..." : "Aceptar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NameChapterModal;
