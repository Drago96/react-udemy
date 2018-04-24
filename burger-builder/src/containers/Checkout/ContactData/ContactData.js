import React, { Component } from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";

class ContactData extends Component {
    static propTypes = {
        ingredients: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        price: PropTypes.number.isRequired
    }

    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        }
    }

    orderHandler = async (event) => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Drago",
                address: {
                    street: "Test St.",
                    zipcode: "4000",
                    country: "Bulgaria"
                },
                email: "test@test.com"
            },
            deliveryMethod: "fast"
        };

        try {
            this.setState({ loading: true });
            await axios.post("/orders.json", order);
            this.props.history.push("/");
        } catch (e) {
            console.log(e);
            this.setState({ loading: false });
        }
    }

    render() {
        let form = (<div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            <form>
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Your email" />
                <input type="text" name="street" placeholder="Your street" />
                <input type="text" name="postal" placeholder="Your postal code" />
                <Button
                    clicked={this.orderHandler}
                    btnType="Success">ORDER</Button>
            </form>
        </div>);
        if (this.state.loading) {
            form = <Spinner />;
        }
        return form;
    }
}

export default withRouter(ContactData);
