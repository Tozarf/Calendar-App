import { login } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
    checking: true,
    // uid:null,
    // name:null
};
describe("Testing auth reducer", () => {
    test("should return default state", () => {
        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState);
    });
    test("should authenticate the user", () => {
        const user = { uid: "123", name: "Fausto" };
        const action = login(user);
        const state = authReducer(initialState, action);
        expect(state).toEqual({ checking: false, uid: "123", name: "Fausto" });
    });
    test("should finish checking user", () => {
        const action = {
            type: types.authCheckingFinish,
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual({ checking: false });
    });

    test("should log out the user", () => {
        const action = {
            type: types.authLogout,
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual({ checking: false });
    });
});
