// BookPageForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditorArea from "./EditorArea";

const BookPageForm = ({ mode = "create", pageData = {}, bookIdentifierCode, bookId }) => {
  const [pageContent, setPageContent] = useState(pageData.pageContent || "");
  const [pageTitle, setPageTitle] = useState(pageData.pageTitle || "");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    setPageContent(pageData.pageContent || "");
    setPageTitle(pageData.pageTitle || "");
  }, [pageData]);

  console.log("Book: ", bookIdentifierCode);
  console.log("Mode: ", mode);

  const handleSave = async () => {
    try {
      if (mode === "create") {
        await axios.post(
          `http://localhost:8080/api/bookify/page/${bookIdentifierCode}`,
          { pageTitle, pageContent, /* bookId */ },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.put(
          `http://localhost:8080/api/bookify/page/${pageData.bookPageId}`,
          { pageTitle, pageContent },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.log("Error con la página: ", error?.response?.data || error.message);
    }
  };

  return (
    <div>
      <EditorArea content={pageContent} setContent={setPageContent} onSave={handleSave} />
    </div>
  );
};

export default BookPageForm;
