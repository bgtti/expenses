import { ActionTypes } from "../types";
import store from "../store";
import { loaderOn, loaderOff } from "../Loader/actions";

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
    store.dispatch(loaderOn())
    if (!selectedWorkspace){
        return (dispatch) => {
            dispatch(selectedWorkspaceSetAsUndefined())
            dispatch(loaderOff())
        }
    }; 
    sessionStorage.setItem("selectedWorkspace", JSON.stringify(selectedWorkspace));
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE,
            selectedWorkspace: selectedWorkspace
        })
        dispatch(loaderOff())
    }
}

//This action is used within saveWorkspaceInfo when no sessionStorage object for selectedWorkspace is found (without loader)
export const setSelectedWorkspaceOnLogIn = (selectedWorkspace) => {
    if (!selectedWorkspace) {
        return (dispatch) => {
            dispatch(selectedWorkspaceSetAsUndefined())
        }
    }; 
    sessionStorage.setItem("selectedWorkspace", JSON.stringify(selectedWorkspace));
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE,
            selectedWorkspace: selectedWorkspace
        })
    }
}