import React from "react";
import PropTypes from "prop-types";

import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p> Current Price: <strong>{props.price.toFixed(2)}</strong> </p>
        {controls.map(c =>
            <BuildControl
                key={c.label}
                label={c.label}
                ingredientAdded={() => props.ingredientAdded(c.type)} 
                ingredientRemoved={() => props.ingredientRemoved(c.type)}
                disabled={props.disabledInfo[c.type]}
                />)}
        <button
            disabled={!props.purchaseable}
            className={classes.OrderButton}
            onClick={props.order}>{props.isAuthenticated
                 ? "ORDER NOW"
                 : "SIGN IN TO ORDER"}</button>
    </div>
);

buildControls.propTypes = {
    price: PropTypes.number.isRequired,
    ingredientAdded: PropTypes.func.isRequired,
    ingredientRemoved: PropTypes.func.isRequired,
    disabledInfo: PropTypes.object.isRequired,
    purchaseable: PropTypes.bool.isRequired,
    order: PropTypes.func.isRequired
};

export default buildControls;
