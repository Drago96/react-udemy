import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
    it("should return the initial state if action type is invalid", () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        })
    });

    it("should store the user data upon login", () => {
        expect(reducer(undefined, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: "testIdToken",
            userId: "testUserId"
        })).toEqual({
            token: "testIdToken",
            userId: "testUserId",
            error: null,
            loading: false,
            authRedirectPath: "/"
        })
    });
});
