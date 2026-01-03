import React, { useState } from "react";
import categoryOptions from "./categoryOptions";
import statusOption from './statusOptions';
import "../../css/bookcomponents/createnewform.css";

function CreateNewBookForm({
  formData,
  setFormData,
  onSubmit,
  handleCancel,
}) {
  const [errors, setErrors] = useState({});

  const CategorySelect = ({ value, onChange, options }) => (
    <select name="category" value={value} onChange={onChange}>
      <option value="">Categoría</option>
      {options.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );

  const StatusSelect = ({ value, onChange, options }) => (
    <select name="status" value={value} onChange={onChange}>
      <option value="">Status</option>
      {options.map((cat) => (
        <option key={cat.value} value={cat.value}>
          {cat.label}
        </option>
      ))}
    </select>
  );

  const handleValidationAndSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title?.trim()) newErrors.title = "El título es obligatorio.";
    if (!formData.description?.trim()) newErrors.description = "La sinopsis es obligatoria.";
    if (!formData.shortDescription?.trim()) newErrors.shortDescription = "La presentación breve es obligatoria.";
    if (!formData.status) newErrors.status = "Debes seleccionar un estado.";
    if (!formData.category) newErrors.category = "Debes seleccionar una categoría.";
    if (formData.price && (isNaN(formData.price) || Number(formData.price) < 0)) {
      newErrors.price = "El precio debe ser un número válido mayor o igual a 0.";
    }
    if (formData.price !== null && (isNaN(formData.price) || formData.price < 0)) {
      newErrors.price = "El precio debe ser un número válido mayor o igual a 0.";
    }
    

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(e);
    }
  };

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
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="title"
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div>
            <label>Sinopsis</label>
            <textarea
              name="sinopsis"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="description"
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          <div>
            <label>Presentación breve</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={(e) =>
                setFormData({ ...formData, shortDescription: e.target.value })
              }
              className="shortDescription"  maxLength={100}
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
            <StatusSelect
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={statusOption}
            />
            {errors.status && <span className="form-error">{errors.status}</span>}
          </div>

          <div className="selecionar-precio">
            <label>Precio</label>
            <p>si su libro es gratis, por favor dejarlo en blanco</p>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({
                  ...formData,
                  price: value === "" ? null : parseFloat(value),
                });
              }}
              
            />
            {errors.price && <span className="form-error">{errors.price}</span>}
          </div>

          <div>
            <label>Categoría</label>
            <CategorySelect
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={categoryOptions}
            />
            {errors.category && <span className="form-error">{errors.category}</span>}
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
