import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import { types } from "../../types/types";
import Swal from "sweetalert2";
import * as FetchModule from "../../helpers/fetch";

jest.mock("sweetalert2", () => ({
    fire: jest.fn(),
}));

const middlewares = [thunk];

const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

describe("Testing auth actions", () => {
    beforeEach(() => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });
    test("correct login", async () => {
        await store.dispatch(
            startLogin("fausto.zaruma@enroutesystems.com", "123456")
        );
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String),
            },
        });
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "token",
            expect.any(String)
        );
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "token-init-date",
            expect.any(Number)
        );
        // const token = localStorage.setItem.mock.calls[0][1];
    });
    test("should login incorrectly", async () => {
        await store.dispatch(
            startLogin("fausto.zaruma@enroutesystemssss.com", "123452")
        );
        let actions = store.getActions();
        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith(
            "Error",
            "There are no users with this email",
            "error"
        );
        await store.dispatch(
            startLogin("fausto.zaruma@enroutesystems.com", "1234567")
        );
        actions = store.getActions();
        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith(
            "Error",
            "Invalid password",
            "error"
        );
    });
    test("should register correctly", async () => {
        FetchModule.tokenlessFetch = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: "123",
                    name: "Fausto",
                    token: "ABSADASD",
                };
            },
        }));
        await store.dispatch(startRegister("test@test.com", "123456", "test"));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: { uid: "123", name: "Fausto" },
        });
        expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABSADASD");
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "token-init-date",
            expect.any(Number)
        );
    });
    test("should carry out startChecking correctly", async () => {
        FetchModule.tokenFetch = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: "123",
                    name: "Fausto",
                    token: "ABSADASD",
                };
            },
        }));

        await store.dispatch(startChecking());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: { uid: "123", name: "Fausto" },
        });
        expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABSADASD");
    });
});
