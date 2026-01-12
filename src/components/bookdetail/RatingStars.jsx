import React, { useState } from "react";
import { scoreService } from "../../services/scoreService";

const RatingStars = ({ book, user }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  const submitRating = async (score) => {
    try {
      setLoading(true);
      await scoreService.submitScore({ book, user, score });
      alert("¡Gracias por tu calificación!");
    } catch (error) {
      console.error("Error al enviar calificación:", error);
      alert("Hubo un problema al enviar la calificación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
      {[...Array(5)].map((_, index) => {
        const score = index + 1;
        return (
          <span
            key={score}
            onClick={() => {
              setRating(score);
              submitRating(score);
            }}
            onMouseEnter={() => setHover(score)}
            onMouseLeave={() => setHover(0)}
            style={{
              fontSize: "26px",
              color: score <= (hover || rating) ? " rgba(119, 100, 195, 1)" : "gray",
            }}
          >
            ★
          </span>
        );
      })}
      {loading && <span style={{ marginLeft: "8px" }}>Enviando...</span>}
    </div>
  );
};

export default RatingStars;
