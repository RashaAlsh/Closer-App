import React from "react";
import PropTypes from "prop-types";
import "./MenuItem.css";

export const MenuItem = ({ value, name, checked, handleChange }) => {
  return (
    <div className="menu-item">
      <input
        onChange={handleChange}
        type="checkbox"
        id={value}
        name={value}
        value={value}
        checked={checked}
      />
      <label htmlFor={value}>{name}</label>
    </div>
  );
};

MenuItem.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};
