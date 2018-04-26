import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
    static propTypes = {
        ingredients: PropTypes.object.isRequired,
        totalPrice: PropTypes.number.isRequired,
        onIngredientAdded: PropTypes.func.isRequired,
        onIngredientRemoved: PropTypes.func.isRequired,
        error: PropTypes.bool.isRequired,
        onInitPurchase: PropTypes.func.isRequired,
        onInitIngredients: PropTypes.func.isRequired
    }

    state = {
        purchasing: false
    }

    getPurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            })
            .reduce((sum, next) => sum + next, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = async () => {
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        if (this.props.ingredients && Object.keys(this.props.ingredients).length > 0) {
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
        }

        let burger = this.props.error ?
            <p>Ingredients can't be loaded</p> :
            <Spinner />;
        if (this.props.ingredients && Object.keys(this.props.ingredients).length > 0) {
            burger = <Fragment>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    purchaseable={this.getPurchaseState(this.props.ingredients)}
                    price={this.props.totalPrice}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    order={this.purchaseHandler} />
            </Fragment>
        }

        return (
            <Fragment>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
