import React from "react";
import "./TextInput.scss";

function TextInput({ name, defaultValue, placeholder, onChange }) {
  return (
    <div className="text-input">
      {name && <label htmlFor={name}>{name}</label>}
      <input
        id={name}
        name={name}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        className="text-input"
      />
    </div>
  );
}

export default TextInput;
