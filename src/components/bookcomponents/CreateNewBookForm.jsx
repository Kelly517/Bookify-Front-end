import React, { useEffect, useState } from "react";
import SelectField from "./SelectField";
import { categoryOptions, statusOptions } from "./bookOptions";
import "../../css/bookcomponents/createnewform.css";

function CreateNewBookForm({ formData, setFormData, onSubmit, handleCancel }) {
  const [errors, setErrors] = useState({});
  const MAX_PRICE = 500000;
  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formData.priceType === "FREE" && formData.price !== null) {
      setField("price", null);
    }
  }, [formData.priceType]);

  const validate = (data) => {
    const newErrors = {};

    if (!data.title?.trim()) newErrors.title = "El título es obligatorio.";
    if (!data.description?.trim())
      newErrors.description = "La sinopsis es obligatoria.";
    if (!data.shortDescription?.trim())
      newErrors.shortDescription = "La presentación breve es obligatoria.";
    if (!data.status) newErrors.status = "Debes seleccionar un estado.";
    if (!data.category) newErrors.category = "Debes seleccionar una categoría.";

    if (!data.priceType) {
      newErrors.priceType = "Debes seleccionar Gratis o Pago.";
    } else if (data.priceType === "PAID") {
      const numeric = Number(data.price);

      if (
        data.price === null ||
        data.price === "" ||
        Number.isNaN(numeric) ||
        numeric <= 0
      ) {
        newErrors.price = "Debes ingresar un precio válido mayor a 0.";
      } else if (numeric > MAX_PRICE) {
        newErrors.price = "El precio no puede superar los $200.000.";
      }
    }

    return newErrors;
  };

  const handleValidationAndSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(e);
    }
  };

  const isPaid = formData.priceType === "PAID";

  return (
    <form onSubmit={handleValidationAndSubmit} className="create-book-form">
      <h3>Crear libro</h3>
      <hr className="form-divider" />

      <div className="form-columns">
        {/* COLUMNA IZQUIERDA */}
        <div className="left-column">
          <div>
            <label>Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => setField("title", e.target.value)}
              className="title"
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div>
            <label>Sinopsis</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => setField("description", e.target.value)}
              className="description"
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>

          <div>
            <label>Presentación breve</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => setField("shortDescription", e.target.value)}
              className="shortDescription"
              maxLength={100}
            />
            {errors.shortDescription && (
              <span className="form-error">{errors.shortDescription}</span>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="right-column">
          <div className="status-field">
            <label>Estado</label>
            <SelectField
              name="status"
              value={formData.status}
              onChange={(e) => setField("status", e.target.value)}
              placeholder="Status"
              options={statusOptions}
            />
            {errors.status && (
              <span className="form-error">{errors.status}</span>
            )}
          </div>

          <div className="price-field">
            <label>Precio</label>

            <div className="price-toggle">
              <label className="price-option">
                <input
                  type="radio"
                  name="priceType"
                  value="FREE"
                  checked={formData.priceType === "FREE"}
                  onChange={() => setField("priceType", "FREE")}
                />
                <span>Gratis</span>
              </label>

              <label className="price-option">
                <input
                  type="radio"
                  name="priceType"
                  value="PAID"
                  checked={formData.priceType === "PAID"}
                  onChange={() => setField("priceType", "PAID")}
                />
                <span>Pago</span>
              </label>
            </div>

            {errors.priceType && (
              <span className="form-error">{errors.priceType}</span>
            )}

            <input
              type="number"
              name="price"
              value={formData.price ?? ""}
              disabled={!isPaid}
              onChange={(e) => {
                const value = e.target.value;
                setField("price", value === "" ? null : value);
              }}
              className={!isPaid ? "price-input-disabled" : ""}
              placeholder={isPaid ? "Ej: 20000" : ""}
            />

            {errors.price && <span className="form-error">{errors.price}</span>}
          </div>

          <div>
            <label>Categoría</label>
            <SelectField
              name="category"
              value={formData.category}
              onChange={(e) => setField("category", e.target.value)}
              placeholder="Categoría"
              options={categoryOptions}
            />
            {errors.category && (
              <span className="form-error">{errors.category}</span>
            )}
          </div>
        </div>
      </div>

      <div>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
        <button type="submit">Crear</button>
      </div>
    </form>
  );
}

export default CreateNewBookForm;
