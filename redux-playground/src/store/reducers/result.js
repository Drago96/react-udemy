import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    results: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return storeResult(state, action);

        case actionTypes.DELETE_RESULT:
            return deleteResult(state, action);

        default:
            return state;
    }
};

const storeResult = (state, action) => {
    return updateObject(state, {
        results: [...state.results, {
            id: new Date(),
            value: action.result
        }]
    });
};

const deleteResult = (state, action) => {
    return updateObject(state, {
        results: [...state.results.filter(el => {
            return el.id !== action.id;
        })]
    });
};

export default reducer;
