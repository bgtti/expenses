import APIURL from "../../config/api-url";
import { ActionTypes } from "../types";
import api from '../../config/axios';
import { loaderOn, loaderOff } from "../Loader/actions";
import { setSelectedWorkspace } from "../Workspace/actions"
import { toast } from 'react-toastify';
import store from "../store";

export const workspaceInfoSetAsUndefined = () => {
    return (dispatch) => {
        sessionStorage.setItem("hasWorkspaces", undefined);
        sessionStorage.setItem("favoriteWorkspaces", undefined);
        sessionStorage.setItem("workspaces", undefined);
        dispatch({
            type: ActionTypes.SET_WORKSPACE_INFO_UNDEFINED,
            hasWorkspaces: undefined,
            favoriteWorkspace: undefined,
            workspaces: undefined
        })
    }
};

export const removeWorkspaceInfoFromStorage = () => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_WORKSPACE_INFO_UNDEFINED,
            hasWorkspaces: undefined,
            favoriteWorkspace: undefined,
            workspaces: undefined
        })
        sessionStorage.removeItem("hasWorkspaces");
        sessionStorage.removeItem("favoriteWorkspaces");
        sessionStorage.removeItem("workspaces");
    }
}

export const saveWorkspaceInfo = (hasWorkspacesData, favoriteWorkspaceData, workspacesData) => {

    if (!hasWorkspacesData && workspacesData.length > 0) {
        return store.dispatch(workspaceInfoSetAsUndefined())
    }
    if (!hasWorkspacesData && workspacesData.length > 0) {
        console.warn("Has workspace set to false, but workspaces were found.");
        hasWorkspacesData = true;
    }
    if (hasWorkspacesData && !workspacesData) {
        console.error("Has workspaces set to true, but workspaces not received.")
        return
    }
    if (!favoriteWorkspaceData) {
        favoriteWorkspaceData = undefined;
    }

    // Create a collator object for sorting the workspaces
    const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
    let sortedWorkspaces = undefined;

    // Sort the workspaces before dispatching the action using the collator
    sortedWorkspaces = workspacesData.slice().sort((a, b) =>
        collator.compare(a.abbreviation, b.abbreviation)
    );

    // Stringify objects for session storage
    let workspacesDataString;
    sortedWorkspaces === undefined ? workspacesDataString = undefined : workspacesDataString = JSON.stringify(sortedWorkspaces)

    sessionStorage.setItem("hasWorkspaces", hasWorkspacesData);
    sessionStorage.setItem("favoriteWorkspaces", favoriteWorkspaceData);
    sessionStorage.setItem("workspaces", workspacesDataString);

    //SETTING SELECTED WORKSPACE ON LOG IN
    // Check if there is selected workspace - if not, set it
    // if (localStorage.getItem("selectedWorkspace") === null || JSON.parse(localStorage.getItem("selectedWorkspace")) === undefined) {
    //     if (favoriteWorkspaceData) {
    //         store.dispatch(setSelectedWorkspace(favoriteWorkspaceData));
    //     }
    //     else {
    //         store.dispatch(setSelectedWorkspace(sortedWorkspaces[0]));
    //     }
    // }

    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_ALL_WORKSPACE_INFO,
            hasWorkspaces: hasWorkspacesData,
            favoriteWorkspace: favoriteWorkspaceData,
            workspaces: sortedWorkspaces
        })
    }
}

export const addWorkspace = (name, abbreviation, currency) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            name: name,
            abbreviation: abbreviation,
            currency: currency
        };
        let token = sessionStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await api.post(APIURL.ADD_WORKSPACE, requestData, config);

            if (response.status !== 200) {
                toast.error(`Error: not able to add workspace. Server response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(saveWorkspaceInfo(data.has_workspaces, data.favorite_workspace, data.workspaces))
                dispatch(setSelectedWorkspace(data.favorite_workspace, data.favorite_workspace_settings))
                toast.success(`Workspace added successfully!`);
            }
        } catch (error) {
            toast.error(`Error: not able to add workspace. No server response.`);
        }
        dispatch(loaderOff());
    };
}

export const editWorkspace = (name, abbreviation, currency, uuid) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            name: name,
            abbreviation: abbreviation,
            currency: currency,
            workspace_uuid: uuid
        };
        let token = sessionStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await api.post(APIURL.EDIT_WORKSPACE, requestData, config);

            if (response.status !== 200) {
                console.error(`Error editing workspace: response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(saveWorkspaceInfo(data.has_workspaces, data.favorite_workspace, data.workspaces))
            }
        } catch (error) {
            console.error("Workspace error: there was a problem editting workspace.");
        }
        dispatch(loaderOff());
    };
}

export const deleteWorkspace = (uuid) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            workspace_uuid: uuid
        };
        let token = sessionStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await api.post(APIURL.DELETE_WORKSPACE, requestData, config);

            if (response.status !== 200) {
                console.error(`Error deleting workspace: response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(saveWorkspaceInfo(data.has_workspaces, data.favorite_workspace, data.workspaces))
            }
        } catch (error) {
            console.error("Workspace error: there was a problem deleting workspace.");
        }
        dispatch(loaderOff());
    };
}