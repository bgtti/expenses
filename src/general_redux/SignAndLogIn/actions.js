import APIURL from "../../config/api-url";
import { ActionTypes } from "../types";
import api from '../../config/axios';

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
                    token: undefined,
                    user: undefined, 
                    hasInvites: undefined,
                    invites: undefined,
                    // hasWorkspaces: undefined,
                    // favoriteWorkspace: undefined,
                    // workspaces: undefined
                });
            } else {
                const data = response.data;
                let user = { name: data.user.name, email: data.user.email };
                let hasInvites = data.has_invites;
                let invites = undefined;
                const hasWorkspacesData = undefined;
                const favoriteWorkspaceData = undefined;
                const workspacesData = undefined;
                if (data.hasOwnProperty("invites")){
                    invites = data.invites 
                } 
                sessionStorage.setItem("access_token", data.access_token);
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("hasInvites", hasInvites);
                sessionStorage.setItem("invites", invites);
                sessionStorage.setItem("hasWorkspaces", hasWorkspacesData);
                sessionStorage.setItem("favoriteWorkspaces", favoriteWorkspaceData);
                sessionStorage.setItem("workspaces", workspacesData);
                dispatch({
                    type: ActionTypes.LOG_IN,
                    token: data.access_token,
                    user: user,
                    hasInvites: hasInvites,
                    invites: invites,
                    // hasWorkspaces: undefined,
                    // favoriteWorkspace: undefined,
                    // workspaces: undefined
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
                    token: undefined,
                    user: undefined, 
                    hasInvites: undefined,
                    invites: undefined,
                    // hasWorkspaces: undefined,
                    // favoriteWorkspace: undefined,
                    // workspaces: undefined
                });
            } else {
                const data = response.data;
                let user = { name: data.user.name, email: data.user.email };
                let hasInvites = data.has_invites;
                let invites = undefined;
                let hasWorkspacesData = data.has_workspaces;
                let favoriteWorkspaceData = undefined;
                let workspacesData = data.workspaces;
                data.hasOwnProperty("invites") ? invites = data.invites : invites = undefined;
                data.favorite_workspace === null ? favoriteWorkspaceData = false : favoriteWorkspaceData = data.favorite_workspace;
                
                sessionStorage.setItem("access_token", data.access_token);
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("hasInvites", hasInvites);
                sessionStorage.setItem("invites", invites);
                sessionStorage.setItem("hasWorkspaces", hasWorkspacesData);
                sessionStorage.setItem("favoriteWorkspaces", favoriteWorkspaceData);
                sessionStorage.setItem("workspaces", workspacesData);

                dispatch({
                    type: ActionTypes.LOG_IN,
                    token: data.access_token,
                    user: user, 
                    hasInvites: hasInvites,
                    invites: invites,
                    // hasWorkspaces: hasWorkspacesData,
                    // favoriteWorkspace: favoriteWorkspaceData,
                    // workspaces: workspacesData 
                });
                dispatch({
                    type: ActionTypes.GET_WORKSPACE_INFO,
                    hasWorkspaces: hasWorkspacesData,
                    favoriteWorkspace: favoriteWorkspaceData,
                    workspaces: workspacesData
                });
            }
        } catch (error) {
            console.error("Login error: there was a problem logging in.");
        }
    };
};

export const logOut = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("hasInvites");
    sessionStorage.removeItem("invites");
    sessionStorage.removeItem("hasWorkspaces");
    sessionStorage.removeItem("favoriteWorkspaces");
    sessionStorage.removeItem("workspaces");
    return {
        type: ActionTypes.LOG_OUT,
        token: undefined,
        user: undefined, 
        hasInvites: undefined,
        invites: undefined,
        // hasWorkspaces: undefined,
        // favoriteWorkspace: undefined,
        // workspaces: undefined
    };
};

export const addWorkspace = (name, abbreviation, currency) =>{
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
                console.error("Error adding worspace: response status not 200.");
            } else {
                const data = response.data;
                let hasWorkspacesData = data.has_workspaces;
                let favoriteWorkspaceData = undefined;
                let workspacesData = data.workspaces;
                data.favorite_workspace === null ? favoriteWorkspaceData = false : favoriteWorkspaceData = data.favorite_workspace;

                sessionStorage.setItem("hasWorkspaces", hasWorkspacesData);
                sessionStorage.setItem("favoriteWorkspaces", favoriteWorkspaceData);
                sessionStorage.setItem("workspaces", workspacesData);

                dispatch({
                    type: ActionTypes.GET_WORKSPACE_INFO,
                    hasWorkspaces: hasWorkspacesData,
                    favoriteWorkspace: favoriteWorkspaceData,
                    workspaces: workspacesData 
                });
                console.log("success")
            }
        } catch (error) {
            console.error("Login error: there was a problem adding workspace.");
        }
    };
}