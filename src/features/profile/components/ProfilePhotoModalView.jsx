import React from "react";
import "../../../css/profile/profilePhotoModal.css";

export default function ProfilePhotoModalView({ title, onClose, children }) {
  return (
    <div
      className="ppm-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ppm-card">
        <div className="ppm-header">
          <h3 className="ppm-title">{title}</h3>
          <button type="button" className="ppm-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="ppm-body">{children}</div>
      </div>
    </div>
  );
}
