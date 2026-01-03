import React, { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import "../../css/editor/editor-area.css";

const EditorArea = ({ content, setContent, onSave }) => {
  const hasInitialized = useRef(false);
  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, FontFamily],
    content: content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      console.log("📄 Contenido recibido:", content);
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="editor-container">
      {/* Barra de botones */}
      <div className="editor-toolbar">
        {/* Selector de "Título" */}
        <select
          className="toolbar-select"
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
          value={
            editor.isActive("heading", { level: 1 })
              ? "1"
              : editor.isActive("heading", { level: 2 })
                ? "2"
                : editor.isActive("heading", { level: 3 })
                  ? "3"
                  : "0"
          }
        >
          <option value="0">Párrafo</option>
          <option value="1">Título 1</option>
          <option value="2">Título 2</option>
          <option value="3">Título 3</option>
        </select>

        {/* Selector de fuente */}
        <select
          className="toolbar-select"
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
          defaultValue="Arial"
        >
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Book antiqua">Book antiqua</option>
        </select>

        {/* Bold */}
        <button
          type="button"
          className={`toolbar-button ${editor.isActive("bold") ? "is-active" : ""
            }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>

        {/* Italic */}
        <button
          type="button"
          className={`toolbar-button ${editor.isActive("italic") ? "is-active" : ""
            }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>

        {/* Underline */}
        <button
          type="button"
          className={`toolbar-button ${editor.isActive("underline") ? "is-active" : ""
            }`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          U
        </button>

        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
          <button className="boton-publicar">Publicar ✨</button>
          <button className="boton-guardar" onClick={onSave}>
            Guardar
          </button>
        </div>
      </div>

      {/* El editor */}
      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default EditorArea;
