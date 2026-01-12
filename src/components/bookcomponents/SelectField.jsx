import React from "react";

function SelectField({ name, value, onChange, placeholder, options }) {
  return (
    <select name={name} value={value} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default SelectField;
