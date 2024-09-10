import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const Alert = ({ msg, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (msg) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return show ? <div className={`alert alert-${type}`}>{msg}</div> : null;
};

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "danger"]).isRequired,
  msg: PropTypes.string.isRequired,
};
