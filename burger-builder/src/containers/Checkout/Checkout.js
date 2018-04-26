import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        ingredients: PropTypes.object.isRequired
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={this.props.match.path + "/contact-data"} exact 
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);
