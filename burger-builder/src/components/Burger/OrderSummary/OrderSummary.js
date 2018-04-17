import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return (
                <li key={ingredientKey}>
                    <span style={{ textTransform: "capitalize" }}>
                        {ingredientKey}
                    </span>: {props.ingredients[ingredientKey]}
                </li>
            )
        });

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    );
};

orderSummary.propTypes = {
    ingredients: PropTypes.object.isRequired
};

export default orderSummary;
