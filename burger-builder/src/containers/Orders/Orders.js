import React, { Component } from "react";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    async componentDidMount() {
        try {
            const response = await axios.get("/orders.json");
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({ orders: fetchedOrders });
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        let orders = this.state.orders.map(o => (
            <Order key={o.id} ingredients={o.ingredients} price={+o.price}  />
        ));

        if(this.state.loading) {
            orders = <Spinner />;
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
