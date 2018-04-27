import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const auth = (email, password, isSignup) => {
    return async dispatch => {
        dispatch(authStart());
        const authData = {
            email, password, returnSecureToken: true
        };

        try {
            let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDOP4ikjOtXcBVeyATwVPabzaxYt6ivYBQ";

            if (!isSignup) {
                url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDOP4ikjOtXcBVeyATwVPabzaxYt6ivYBQ"
            }

            const response =
                await axios.post(url, authData);

            dispatch(authSuccess(response.data.idToken, response.data.localId));
        } catch (e) {

            dispatch(authFail(e));
        }
    }
}
