import React from "react";
import PropTypes from "prop-types";

import classes from "./BuildControl.css";

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.ingredientRemoved} className={classes.Less} disabled={props.disabled}>Less</button>
        <button onClick={props.ingredientAdded} className={classes.More}>More</button>
    </div>
);

buildControl.propTypes = {
    label: PropTypes.string.isRequired,
    ingredientAdded: PropTypes.func.isRequired,
    ingredientRemoved: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}

export default buildControl;
