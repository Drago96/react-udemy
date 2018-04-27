import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
    static propTypes = {
        ingredients: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        price: PropTypes.number.isRequired,
        onOrderBurger: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired
    }

    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Street"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Zip Code"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Country"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ]
                },
                value: "fastest",
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: false
    }

    orderHandler = async (event) => {
        event.preventDefault();

        const formData = {};

        for (const formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };

        this.props.onOrderBurger(order);
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.isEmail) {
            isValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const formData = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...formData[inputId]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        formData[inputId] = updatedFormElement;

        let formIsValid = true;
        for (const inputIdentifiers in formData) {
            formIsValid = formData[inputIdentifiers].valid && formIsValid;
        }

        this.setState({ orderForm: formData, formIsValid });
    }

    render() {
        const formElementsArray = [];

        for (const key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(e => {
                    return <Input
                        key={e.id}
                        elementType={e.config.elementType}
                        elementConfig={e.config.elementConfig}
                        value={e.config.value}
                        invalid={!e.config.valid}
                        shouldValidate={e.config.touched}
                        changed={(event) => this.inputChangedHandler(event, e.id)} />
                })}
                <Button
                    btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        </div>);

        if (this.props.loading) {
            form = <Spinner />;
        }

        return form;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (order) => dispatch(actions.purchaseBurger(order))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axios));
