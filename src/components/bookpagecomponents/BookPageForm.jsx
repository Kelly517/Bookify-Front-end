import React, { useEffect, useState } from "react";
import EditorArea from "./EditorArea";
import { pageChapterService } from "../../services/pageChapterService";

const BookPageForm = ({ mode = "create", pageData = {}, bookIdentifierCode }) => {
  const [pageContent, setPageContent] = useState(pageData.pageContent || "");
  const [pageTitle, setPageTitle] = useState(pageData.pageTitle || "");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    setPageContent(pageData.pageContent || "");
    setPageTitle(pageData.pageTitle || "");
  }, [pageData]);

  const handleSave = async () => {
    try {
      if (mode === "create") {
        await pageChapterService.createPage(
          bookIdentifierCode,
          { pageTitle, pageContent },
          token
        );
      } else {
        await pageChapterService.updatePage(
          pageData.bookPageId,
          { pageTitle, pageContent },
          token
        );
      }
    } catch (error) {
      console.log("Error con la página: ", error?.response?.data || error.message);
    }
  };

  return (
    <div>
      <EditorArea
        content={pageContent}
        setContent={setPageContent}
        onSave={handleSave}
      />
    </div>
  );
};

export default BookPageForm;
