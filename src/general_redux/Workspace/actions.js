import { ActionTypes } from "../types";
import store from "../store";

export const selectedWorkspaceSetAsUndefined = () => {
    return (dispatch) => {
        sessionStorage.setItem("selectedWorkspace", undefined);
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE_UNDEFINED,
            selectedWorkspace: undefined,
        })
    }
};

export const removeSelectedWorkspaceFromStorage = () => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE_UNDEFINED,
            selectedWorkspace: undefined,
        })
        sessionStorage.removeItem("selectedWorkspace");
    }
}

export const saveSelectedWorkspace = (selectedWorkspace) => {
    sessionStorage.setItem("hasWorkspaces", selectedWorkspace);
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE,
            selectedWorkspace: undefined,
        })
    }
}