import { ActionTypes } from "../types";

export const loaderOn = () => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.LOADER_ON
        })
    }
};

export const loaderOff = () => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.LOADER_OFF
        })
    }
};