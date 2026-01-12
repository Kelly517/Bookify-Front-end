import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import "../../css/editor/editor-area.css";

const HEADING_LEVELS = [
  { value: "0", label: "Párrafo" },
  { value: "1", label: "Título 1" },
  { value: "2", label: "Título 2" },
  { value: "3", label: "Título 3" },
];

const FONT_OPTIONS = [
  "Arial",
  "Georgia",
  "Times New Roman",
  "Verdana",
  "Tahoma",
  "Book antiqua",
];

const EditorArea = ({ content, setContent, onSave }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, FontFamily],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  // Sync externo -> editor
  useEffect(() => {
    if (!editor) return;
    if (content === editor.getHTML()) return;

    editor.commands.setContent(content);
  }, [content, editor]);

  const getHeadingValue = () => {
    if (!editor) return "0";
    if (editor.isActive("heading", { level: 1 })) return "1";
    if (editor.isActive("heading", { level: 2 })) return "2";
    if (editor.isActive("heading", { level: 3 })) return "3";
    return "0";
  };

  const handleHeadingChange = (e) => {
    if (!editor) return;
    const level = Number(e.target.value);

    const chain = editor.chain().focus();
    if (level === 0) chain.setParagraph().run();
    else chain.toggleHeading({ level }).run();
  };

  const handleFontChange = (e) => {
    if (!editor) return;
    editor.chain().focus().setFontFamily(e.target.value).run();
  };

  const toggle = (mark) => () => {
    if (!editor) return;
    editor.chain().focus()[mark]().run();
  };

  const isActive = (mark) => (editor ? editor.isActive(mark) : false);

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        {/* Heading */}
        <select
          className="toolbar-select"
          onChange={handleHeadingChange}
          value={getHeadingValue()}
          disabled={!editor}
        >
          {HEADING_LEVELS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Font */}
        <select
          className="toolbar-select"
          onChange={handleFontChange}
          defaultValue="Arial"
          disabled={!editor}
        >
          {FONT_OPTIONS.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>

        {/* Marks */}
        <button
          type="button"
          className={`toolbar-button ${isActive("bold") ? "is-active" : ""}`}
          onClick={toggle("toggleBold")}
          disabled={!editor}
        >
          B
        </button>

        <button
          type="button"
          className={`toolbar-button ${isActive("italic") ? "is-active" : ""}`}
          onClick={toggle("toggleItalic")}
          disabled={!editor}
        >
          I
        </button>

        <button
          type="button"
          className={`toolbar-button ${isActive("underline") ? "is-active" : ""}`}
          onClick={toggle("toggleUnderline")}
          disabled={!editor}
        >
          U
        </button>

        {/* Actions */}
        <div className="toolbar-actions">
          <button type="button" className="boton-publicar">
            Publicar ✨
          </button>
          <button type="button" className="boton-guardar" onClick={onSave}>
            Guardar
          </button>
        </div>
      </div>

      <div className="editor-content book-page">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default EditorArea;
