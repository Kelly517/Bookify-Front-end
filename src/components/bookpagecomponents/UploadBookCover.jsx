import React, { useState } from "react";
import "../../css/editor/image.css";
import ImageUploader from "../profilecomponents/ImageUploader";
import { Image } from "../../icons/Icons";

const UploadBookCover = ({ bookIdentifierCode }) => {

  return (
    <>
      <ImageUploader
        title="Portada"
        uploadUrl={`http://localhost:8080/api/bookify/upload-image/${bookIdentifierCode}`}
        onSuccess={(data) => window.location.reload()}
      />
    </>
  );
};

export default UploadBookCover;
