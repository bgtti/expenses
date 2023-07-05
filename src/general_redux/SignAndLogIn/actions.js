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
                    hasInvites: undefined,
                    invites: undefined,
                    hasWorkspaces: undefined,
                    favoriteWorkspace: undefined,
                    workspaces: undefined
                });
            } else {
                const data = response.data;
                let hasInvitesData = undefined;
                let invitesData = undefined;
                const hasWorkspacesData = undefined;
                const favoriteWorkspaceData = undefined;
                const workspacesData = undefined;
                data.has_invites === false ? hasInvitesData = undefined : hasInvitesData = data.has_invites;
                if (data.hasOwnProperty("invites")){
                    data.invites === false ? invitesData = undefined : invitesData = data.invites
                } else {
                    invitesData = undefined
                }
                sessionStorage.setItem("access_token", data.access_token);
                sessionStorage.setItem("hasInvites", hasInvitesData);
                sessionStorage.setItem("invites", invitesData);
                sessionStorage.setItem("hasWorkspaces", hasWorkspacesData);
                sessionStorage.setItem("favoriteWorkspaces", favoriteWorkspaceData);
                sessionStorage.setItem("workspaces", workspacesData);
                dispatch({
                    type: ActionTypes.LOG_IN,
                    token: data.access_token,
                    hasInvites: hasInvitesData,
                    invites: invitesData,
                    hasWorkspaces: undefined,
                    favoriteWorkspace: undefined,
                    workspaces: undefined
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
                    hasInvites: undefined,
                    invites: undefined,
                    hasWorkspaces: undefined,
                    favoriteWorkspace: undefined,
                    workspaces: undefined
                });
            } else {
                const data = response.data;
                let hasInvitesData = data.has_invites;
                let invitesData = undefined;
                let hasWorkspacesData = data.has_workspaces;
                let favoriteWorkspaceData = undefined;
                let workspacesData = data.workspaces;
                data.hasOwnProperty("invites") ? invitesData = data.invites : invitesData = undefined;
                data.favorite_workspace === null ? favoriteWorkspaceData = false : favoriteWorkspaceData = data.favorite_workspace;
                
                sessionStorage.setItem("access_token", data.access_token);
                sessionStorage.setItem("hasInvites", hasInvitesData);
                sessionStorage.setItem("invites", invitesData);
                sessionStorage.setItem("hasWorkspaces", hasWorkspacesData);
                sessionStorage.setItem("favoriteWorkspaces", favoriteWorkspaceData);
                sessionStorage.setItem("workspaces", workspacesData);

                dispatch({
                    type: ActionTypes.LOG_IN,
                    token: data.access_token,
                    hasInvites: hasInvitesData,
                    invites: invitesData,
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
    sessionStorage.removeItem("hasInvites");
    sessionStorage.removeItem("invites");
    sessionStorage.removeItem("hasWorkspaces");
    sessionStorage.removeItem("favoriteWorkspaces");
    sessionStorage.removeItem("workspaces");
    return {
        type: ActionTypes.LOG_OUT,
        token: undefined,
        hasInvites: undefined,
        invites: undefined,
        hasWorkspaces: undefined,
        favoriteWorkspace: undefined,
        workspaces: undefined
    };
};