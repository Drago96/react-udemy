import React from 'react';
import PropTypes from "prop-types";

import './CounterControl.css';

const counterControl = (props) => (
    <div className="CounterControl" onClick={props.clicked}>
        {props.label}
    </div>
);

counterControl.propTypes = {
    clicked: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default counterControl;
