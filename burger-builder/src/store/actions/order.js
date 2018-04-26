import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurger = (order) => {
    return async dispatch => {
        dispatch(purchaseBurgerStart());
        try {
            const response = await axios.post("/orders.json", order);
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
