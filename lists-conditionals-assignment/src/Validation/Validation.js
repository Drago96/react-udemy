import React from "react";
import PropTypes from "prop-types";
import "./Validation.css";

const validation = (props) => {
    let message = null;

    if (props.length < 5) {
        message = <p className="error">Text too short</p>;
    } else {
        message = <p className="success">Text long enough</p>;
    }

    return <div className="Validation">{message}</div>;
};

validation.propTypes = {
    length: PropTypes.number.isRequired
};

export default validation;
