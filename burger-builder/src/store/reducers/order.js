import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseBurgerInit(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state, action);
        default:
            return state;
    }
};

const purchaseBurgerInit = (state, action) => {
    return {
        ...state,
        purchased: false
    };
};

const purchaseBurgerStart = (state, action) => {
    return {
        ...state,
        loading: true
    };
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    };
    return {
        ...state,
        loading: false,
        orders: [...state.orders, newOrder],
        purchased: true
    };
};

const purchaseBurgerFail = (state, action) => {
    return {
        ...state,
        loading: false
    };
};


export default reducer;
