import React, { useState } from "react";

const ImageUploader = ({ label = "Seleccionar imagen", uploadUrl, onUploadComplete }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error subiendo la imagen");
      }

      const imagePath = await response.text();
      console.log("Imagen subida, path:", imagePath);

      if (onUploadComplete) {
        onUploadComplete(imagePath);
      }
    } catch (err) {
      console.error("Error subiendo imagen:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-uploader">
      <label className="image-uploader-label">
        {label}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image-uploader-input"
        />
      </label>

      {uploading && <p>Subiendo imagen...</p>}

      {imagePreview && (
        <div className="image-uploader-preview">
          <img src={imagePreview} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
