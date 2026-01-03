import React, { useState } from 'react';
import '../../css/editor/image.css';
import axios from 'axios';
import { Image, Up } from '../../icons/Icons';

const ImageUploader = ({ uploadUrl, title, onSuccess, defaultPreview }) => {
  const [previewImage, setPreviewImage] = useState(defaultPreview || null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("Imagen subida:", response.data);
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Ocurrió un error al subir la imagen");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-preview">
        {previewImage ? (
          <img src={previewImage} alt="Imagen" className="upload-image" />
        ) : (
          <span role="img" aria-label="Placeholder"></span>
        )}
      </div>

      <div className="upload-content">
        <h2 className="upload-title">{title}</h2>
        <label className="upload-button">
          <Up /> Elegir portada
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>
      </div>
    </div>
  );
};
export default ImageUploader;
