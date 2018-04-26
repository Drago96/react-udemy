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
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
    static propTypes = {
        ingredients: PropTypes.object.isRequired,
        totalPrice: PropTypes.number.isRequired,
        onIngredientAdded: PropTypes.func.isRequired,
        onIngredientRemoved: PropTypes.func.isRequired
    }

    state = {
        purchasing: false,
        loading: false
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
        this.props.history.push("/checkout");
    }

    async componentDidMount() {
        try {
            const response = await axios.get("/ingredients.json");
            this.setState({ ingredients: response.data });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        if (this.props.ingredients) {
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        let burger = <Spinner />
        if (this.props.ingredients) {
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
        onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
