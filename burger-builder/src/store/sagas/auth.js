import { delay } from "redux-saga";
import { put, call } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/index";

export function* logoutSaga(action) {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "userId");
    yield call([localStorage, "removeItem"], "expirationDate");

    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield call(delay, action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    try {
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDOP4ikjOtXcBVeyATwVPabzaxYt6ivYBQ";

        if (!action.isSignup) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDOP4ikjOtXcBVeyATwVPabzaxYt6ivYBQ"
        }

        const response = yield call([axios, "post"], url, authData);

        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);


        yield call([localStorage, "setItem"], "token", response.data.idToken);
        yield call([localStorage, "setItem"], "userId", response.data.localId);
        yield call([localStorage, "setItem"], "expirationDate", expirationDate);

        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (e) {
        yield put(actions.authFail(e.response.data.error));
    }

}

export function* authGetStateSaga(action) {
    const token = localStorage.getItem("token");
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = localStorage.getItem("userId");
            yield put(actions.authSuccess(token, userId));
        }
    }
}
