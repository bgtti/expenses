import APIURL from "../../config/api-url";
import { ActionTypes } from "../types";
import api from '../../config/axios';
import { loaderOn, loaderOff } from "../Loader/actions";
import store from "../store";

export const workspaceInfoSetAsUndefined = () => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_WORKSPACE_INFO_UNDEFINED,
            hasWorkspaces: undefined,
            favoriteWorkspace: undefined,
            workspaces: undefined
        })
    }
};

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
                console.error(`Error adding workspace: response status ${response.status}.`);
            } else {
                const data = response.data;
                let hasWorkspacesData = data.has_workspaces;
                let favoriteWorkspaceData = undefined;
                let workspacesData = undefined;
                data.favorite_workspace === null ? favoriteWorkspaceData = false : favoriteWorkspaceData = data.favorite_workspace;

                // Create a collator object for sorting the workspaces
                const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
                let sortedWorkspaces = undefined;

                // if there are workspaces, add and sort them
                if (workspacesData !== undefined && workspacesData.length > 0) {
                    workspacesData = data.workspaces;
                    // Sort the workspaces before dispatching the action using the collator
                    sortedWorkspaces = workspacesData.slice().sort((a, b) =>
                        collator.compare(a.abbreviation, b.abbreviation)
                    );
                }
                // Stringify objects for session storage
                let workspacesDataString;
                sortedWorkspaces === undefined ? workspacesDataString = undefined : workspacesDataString = JSON.stringify(sortedWorkspaces)

                sessionStorage.setItem("hasWorkspaces", hasWorkspacesData);
                sessionStorage.setItem("favoriteWorkspaces", favoriteWorkspaceData);
                sessionStorage.setItem("workspaces", workspacesDataString);

                console.log(workspacesDataString)
                console.log("+++")
                console.log(sortedWorkspaces)

                dispatch({
                    type: ActionTypes.SET_ALL_WORKSPACE_INFO,
                    hasWorkspaces: hasWorkspacesData,
                    favoriteWorkspace: favoriteWorkspaceData,
                    workspaces: sortedWorkspaces
                });
                console.log("Workspace info retrieved successfully")
            }
        } catch (error) {
            console.error("Workspace error: there was a problem adding workspace.");
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
                let hasWorkspacesData = data.has_workspaces;
                let favoriteWorkspaceData = undefined;
                let workspacesData = undefined;
                data.favorite_workspace === null ? favoriteWorkspaceData = false : favoriteWorkspaceData = data.favorite_workspace;

                // Create a collator object for sorting the workspaces
                const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
                let sortedWorkspaces = undefined;

                // if there are workspaces, add and sort them
                if (workspacesData !== undefined && workspacesData.length > 0) {
                    workspacesData = data.workspaces;
                    // Sort the workspaces before dispatching the action using the collator
                    sortedWorkspaces = workspacesData.slice().sort((a, b) =>
                        collator.compare(a.abbreviation, b.abbreviation)
                    );
                }
                // Stringify objects for session storage
                let workspacesDataString;
                sortedWorkspaces === undefined ? workspacesDataString = undefined : workspacesDataString = JSON.stringify(sortedWorkspaces)

                sessionStorage.setItem("hasWorkspaces", hasWorkspacesData);
                sessionStorage.setItem("favoriteWorkspaces", favoriteWorkspaceData);
                sessionStorage.setItem("workspaces", workspacesDataString);

                dispatch({
                    type: ActionTypes.SET_ALL_WORKSPACE_INFO,
                    hasWorkspaces: hasWorkspacesData,
                    favoriteWorkspace: favoriteWorkspaceData,
                    workspaces: sortedWorkspaces
                });
                console.log("Workspace edited successfully.")
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
                let hasWorkspacesData = data.has_workspaces;
                let favoriteWorkspaceData = undefined;
                let workspacesData = undefined;
                data.favorite_workspace === null ? favoriteWorkspaceData = false : favoriteWorkspaceData = data.favorite_workspace;

                // Create a collator object for sorting the workspaces
                const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
                let sortedWorkspaces = undefined;

                // if there are workspaces, add and sort them
                if (workspacesData !== undefined && workspacesData.length > 0) {
                    workspacesData = data.workspaces;
                    // Sort the workspaces before dispatching the action using the collator
                    sortedWorkspaces = workspacesData.slice().sort((a, b) =>
                        collator.compare(a.abbreviation, b.abbreviation)
                    );
                }
                // Stringify objects for session storage
                let workspacesDataString;
                sortedWorkspaces === undefined ? workspacesDataString = undefined : workspacesDataString = JSON.stringify(sortedWorkspaces)

                sessionStorage.setItem("hasWorkspaces", hasWorkspacesData);
                sessionStorage.setItem("favoriteWorkspaces", favoriteWorkspaceData);
                sessionStorage.setItem("workspaces", workspacesDataString);

                dispatch({
                    type: ActionTypes.SET_ALL_WORKSPACE_INFO,
                    hasWorkspaces: hasWorkspacesData,
                    favoriteWorkspace: favoriteWorkspaceData,
                    workspaces: sortedWorkspaces
                });
            }
        } catch (error) {
            console.error("Workspace error: there was a problem deleting workspace.");
        }
        dispatch(loaderOff());
    };
}