import React from "react";

export default function CategorySelect({ value, onChange, options }) {
  return (
    <select name="category" value={value} onChange={onChange}>
      <option value="">Filtrar</option>
      {options.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
}