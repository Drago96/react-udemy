import axios from "axios";

import * as actionTypes from "./actionTypes";
import { clearUserStorage } from "../utilities";

export const logout = () => {
    clearUserStorage();

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

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

            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("userId", response.data.localId);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem("expirationDate", expirationDate);

            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        } catch (e) {
            dispatch(authFail(e.response.data.error));
        }
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
};

