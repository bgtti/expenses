import APIURL from "../config/api-url";
import { ActionTypes } from "./types";
import api from '../config/axios';

export const signUp = (name, email, password) =>{
    return async (dispatch) => {
        const requestData = {
            name,
            email,
            password
        };
        try {
            const response = await api.post(APIURL.SIGNUP, requestData);

            if (response.status !== 200) {
                console.error("Signup error: response status not 200.");
                dispatch({
                    type: ActionTypes.LOG_OUT,
                    token: undefined
                });
            } else {
                const data = response.data;
                sessionStorage.setItem("access_token", data.access_token);
                dispatch({
                    type: ActionTypes.LOG_IN,
                    token: data.access_token
                });
            }
        } catch (error) {
            console.error("Signup error: there was a problem signing up.");
        }
    };
};
export const logIn = (email, password) => {
    return async (dispatch) => {
        const requestData = {
            email,
            password
        };

        try {
            const response = await api.post(APIURL.LOGIN, requestData);

            if (response.status !== 200) {
                console.error("Login error: response status not 200.");
                dispatch({
                    type: ActionTypes.LOG_OUT,
                    token: undefined
                });
            } else {
                const data = response.data;
                sessionStorage.setItem("access_token", data.access_token);
                dispatch({
                    type: ActionTypes.LOG_IN,
                    token: data.access_token
                });
            }
        } catch (error) {
            console.error("Login error: there was a problem logging in.");
        }
    };
};

export const logOut = () => {
    sessionStorage.removeItem("access_token");
    return {
        type: ActionTypes.LOG_OUT,
        token: undefined
    };
};