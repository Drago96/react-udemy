import {STORE_RESULT, DELETE_RESULT} from "./actionTypes";

export const storeResult = (result) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(saveResult(result));
        }, 2000);
    };
};

export const saveResult = (result) => {
    return {
        type: STORE_RESULT,
        result
    };
};

export const deleteResult = (id) => {
    return {
        type: DELETE_RESULT,
        id
    };
};
