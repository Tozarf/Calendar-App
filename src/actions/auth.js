import Swal from "sweetalert2";
import { tokenFetch, tokenlessFetch } from "../helpers/fetch";
import { types } from "../types/types";
import { eventCleanUp } from "./events";

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await tokenlessFetch("auth", { email, password }, "POST");
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            );
        } else {
            Swal.fire("Error", body.msg, "error");
        }
    };
};

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const resp = await tokenlessFetch(
            "auth/new",
            { email, password, name },
            "POST"
        );
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            );
        } else {
            Swal.fire("Error", body.msg, "error");
        }
    };
};

export const startChecking = () => {
    return async (dispatch) => {
        const resp = await tokenFetch("auth/refresh");
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(
                login({
                    uid: body.uid,
                    name: body.name,
                })
            );
        } else {
            dispatch(checkingFinish());
        }
    };
};

const checkingFinish = () => ({
    type: types.authCheckingFinish,
});

export const login = (user) => ({
    type: types.authLogin,
    payload: user,
});

export const startLogout = () => {
    return async (dispatch) => {
        localStorage.clear();
        dispatch(eventCleanUp());
        dispatch(logout());
    };
};

const logout = () => ({
    type: types.authLogout,
});
