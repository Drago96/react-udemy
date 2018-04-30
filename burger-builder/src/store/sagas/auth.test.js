import { call, put } from "redux-saga/effects";

import * as actions from "../actions/index";
import { logoutSaga } from "./auth";
import setUpLocalStorageMock from "../../test/mocks/localStorageMock";

describe("auth saga", () => {
    describe("logout saga", () => {
        let gen;
        beforeEach(() => {
            setUpLocalStorageMock();
            gen = logoutSaga();
        });

        it("should make correct calls to storage", () => {
            const removeTokenCall = gen.next().value;
            expect(removeTokenCall).toEqual(call([localStorage, "removeItem"], "token"));

            const removeUserIdCall = gen.next().value;
            expect(removeUserIdCall).toEqual(call([localStorage, "removeItem"], "userId"));

            const removeExpirationDateCall = gen.next().value;
            expect(removeExpirationDateCall).toEqual(call([localStorage, "removeItem"], "expirationDate"));

        });

        it("should return correct action", () => {
            for (let i = 0; i < 3; i++) {
                gen.next();
            }

            const action = gen.next().value;

            expect(action).toEqual(put(actions.logoutSucceed()))
        });

        it("should finish correctly", () => {
            for (let i = 0; i < 4; i++) {
                gen.next();
            }

            const done = gen.next().done;

            expect(done).toEqual(true);
        });
    });
});