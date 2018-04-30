import { takeEvery, all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authGetStateSaga } from "./auth";

export function* watchAuth() {
    yield all ([
        takeLatest(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeLatest(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_GET_STATE, authGetStateSaga)
    ]);
}
