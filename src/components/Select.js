import React from "react";
import PropTypes from "prop-types";
import "./Select.scss";

function Select({ name, options, selectedOption, onChange }) {
  return (
    <div className="select-input">
      <label htmlFor={name}>{name}</label>
      <select id={name} value={selectedOption} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
