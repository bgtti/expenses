import APIURL from "../../config/api-url";
import { ActionTypes } from "../types";
import api from '../../config/axios';
import { loaderOn, loaderOff } from "../Loader/actions";
import {workspaceInfoSetAsUndefined} from "../UserSettingsWorkspaces/actions"
import store from "../store";

//Actions for Sign Up, Log In, Add Workspace, Edit Workspace

export const signUp = (name, email, password) =>{ //missing loader
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            name,
            email,
            password
        };
        try {
            const response = await api.post(APIURL.SIGNUP, requestData);

            if (response.status !== 200) {
                console.error(`Signup error: response status ${response.status}.`);
                dispatch(logOut())
                dispatch(workspaceInfoSetAsUndefined())
                // dispatch({
                //     type: ActionTypes.LOG_OUT,
                //     token: undefined,
                //     user: undefined, 
                //     hasInvites: undefined,
                //     invites: undefined,
                //     // hasWorkspaces: undefined,
                //     // favoriteWorkspace: undefined,
                //     // workspaces: undefined
                // });
            } else {
                const data = response.data;
                let user = { name: data.user.name, email: data.user.email };
                let hasInvites = data.has_invites;
                let invites = undefined;
                let invitesString = undefined;
                const hasWorkspacesData = undefined;
                const favoriteWorkspaceData = undefined;
                const workspacesData = undefined;
                if (data.hasOwnProperty("invites") && data.invites.length > 0){
                    invites = data.invites; 
                    JSON.stringify(invites); // stringify to add to session storage
                } 
                if (hasInvites === true && invites === undefined){
                    console.error("Sign up error: Has invites, but invites not received.")
                    return
                }
                sessionStorage.setItem("access_token", data.access_token);
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("hasInvites", hasInvites);
                sessionStorage.setItem("invites", invitesString);
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
                dispatch(workspaceInfoSetAsUndefined())
            }
        } catch (error) {
            console.error("Signup error: there was a problem signing up.");
        }
        dispatch(loaderOff())
    };
};
export const logIn = (email, password) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            email,
            password
        };
        try {
            const response = await api.post(APIURL.LOGIN, requestData);

            if (response.status !== 200) {
                console.error(`Log in error: response status ${response.status}.`);
                // dispatch({
                //     type: ActionTypes.LOG_OUT,
                //     token: undefined,
                //     user: undefined, 
                //     hasInvites: undefined,
                //     invites: undefined,
                //     // hasWorkspaces: undefined,
                //     // favoriteWorkspace: undefined,
                //     // workspaces: undefined
                // });
                // dispatch(workspaceInfoSetAsUndefined())
                dispatch(logOut())
                dispatch(workspaceInfoSetAsUndefined())
            } else {
                const data = response.data;
                let user = { name: data.user.name, email: data.user.email };
                let hasInvites = data.has_invites;
                let invites = undefined;
                let hasWorkspacesData = data.has_workspaces;
                let favoriteWorkspaceData = undefined;
                let workspacesData = undefined;
                data.hasOwnProperty("invites") ? invites = data.invites : invites = undefined;
                data.favorite_workspace === null ? favoriteWorkspaceData = false : favoriteWorkspaceData = data.favorite_workspace;
                
                // Create a collator object for sorting the workspaces
                const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
                let sortedWorkspaces = undefined;

                // if there are workspaces, add and sort them
                if (data.workspaces && data.workspaces.length > 0) {
                    workspacesData = data.workspaces;
                    // Sort the workspaces before dispatching the action using the collator
                    sortedWorkspaces = workspacesData.slice().sort((a, b) =>
                        collator.compare(a.abbreviation, b.abbreviation)
                    );
                } 
                if (hasInvites === true && invites === undefined) {
                    console.error("Sign in error: Has invites, but invites not received.")
                    return
                }
                if (hasWorkspacesData === true && workspacesData === undefined) {
                    console.error("Sign in error: Has workspaces, but workspaces not received.")
                    return
                }
                
                // Stringify objects for session storage
                let invitesString;
                invites === undefined ? invitesString = invites : invitesString = JSON.stringify(invites)
                let workspacesDataString;
                sortedWorkspaces === undefined ? workspacesDataString = sortedWorkspaces : workspacesDataString = JSON.stringify(sortedWorkspaces) 
                
                sessionStorage.setItem("access_token", data.access_token);
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("hasInvites", hasInvites);
                sessionStorage.setItem("invites", invitesString);
                sessionStorage.setItem("hasWorkspaces", hasWorkspacesData);
                sessionStorage.setItem("favoriteWorkspaces", favoriteWorkspaceData);
                sessionStorage.setItem("workspaces", workspacesDataString);

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
                    type: ActionTypes.SET_ALL_WORKSPACE_INFO,
                    hasWorkspaces: hasWorkspacesData,
                    favoriteWorkspace: favoriteWorkspaceData,
                    workspaces: sortedWorkspaces
                });
            }
        } catch (error) {
            console.error("Login error: there was a problem logging in.");
        }
        dispatch(loaderOff())
    };
};

export const logOut = () => {
    store.dispatch(loaderOn())
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("hasInvites");
    sessionStorage.removeItem("invites");
    sessionStorage.removeItem("hasWorkspaces");
    sessionStorage.removeItem("favoriteWorkspaces");
    sessionStorage.removeItem("workspaces");
    return (dispatch) => {
        dispatch({
        type: ActionTypes.LOG_OUT,
        token: undefined,
        user: undefined, 
        hasInvites: undefined,
        invites: undefined,
        // hasWorkspaces: undefined,
        // favoriteWorkspace: undefined,
        // workspaces: undefined
        })
        dispatch(loaderOff())
    };
};