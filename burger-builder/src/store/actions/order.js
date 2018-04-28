import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurger = (order, token) => {
    return async dispatch => {
        dispatch(purchaseBurgerStart());
        try {
            const response = await axios.post("/orders.json?auth=" + token, order);
            dispatch(purchaseBurgerSuccess(response.data.name, order));
        } catch (e) {
            dispatch(purchaseBurgerFail(e));
        }
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const purchaseBurgerSuccess = (id, order) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: order
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    };
};

export const fetchOrders = (token, userId) => {
    return async dispatch => {
        try {
            dispatch(fetchOrdersStart());
            const queryParams = "auth=" + token + `&orderBy="userId"&equalTo="` + userId + `"`;
            const response = await axios.get("/orders.json?" + queryParams);
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        } catch (e) {
            dispatch(fetchOrdersFail(e));
        }
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};
