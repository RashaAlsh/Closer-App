import React from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(
  ({ type, value, onChange, placeholder, ...rest }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target)}
        ref={ref}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
