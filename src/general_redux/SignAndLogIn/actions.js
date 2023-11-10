import APIURL from "../../config/api-url";
import { ActionTypes } from "../types";
import api from '../../config/axios';
import { loaderOn, loaderOff } from "../Loader/actions";
import { workspaceInfoSetAsUndefined, saveWorkspaceInfo, removeWorkspaceInfoFromStorage } from "../UserSettingsWorkspaces/actions"
import { removeInvitesInfoFromStorage, invitesInfoSetAsUndefined, saveInvitesInfo } from "../Invites/actions"
import { removeSelectedWorkspaceFromStorage, setSelectedWorkspace } from "../Workspace/actions"
import { toast } from 'react-toastify';
import store from "../store";

//Actions for Sign Up, Log In, and Log out

export const signUp = (name, email, password) => {
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
                toast.error(`Error: not able to sign up. Server response status ${response.status}.`);
                dispatch(logOut())
            } else {
                const data = response.data;
                let user = { name: data.user.name, email: data.user.email };

                if (data.hasOwnProperty("invites")) {
                    dispatch(saveInvitesInfo(data.has_invites, data.invites))
                } else {
                    dispatch(invitesInfoSetAsUndefined())
                }

                sessionStorage.setItem("access_token", data.access_token);
                sessionStorage.setItem("user", JSON.stringify(user));

                dispatch({
                    type: ActionTypes.LOG_IN,
                    token: data.access_token,
                    user: user
                });
                dispatch(workspaceInfoSetAsUndefined())
            }
        } catch (error) {
            toast.error(`Error: not able to sign up. No server response.`);
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
                toast.error(`Error: not able to log in. Server response status ${response.status}.`);
                dispatch(logOut())
            } else {
                const data = response.data;
                let user = { name: data.user.name, email: data.user.email };

                if (data.hasOwnProperty("invites")) {
                    dispatch(saveInvitesInfo(data.has_invites, data.invites))
                } else {
                    dispatch(invitesInfoSetAsUndefined())
                }
                if (data.has_workspaces) {
                    dispatch(setSelectedWorkspace(data.favorite_workspace, data.favorite_workspace_settings))
                }
                dispatch(saveWorkspaceInfo(data.has_workspaces, data.favorite_workspace, data.workspaces))

                sessionStorage.setItem("access_token", data.access_token);
                sessionStorage.setItem("user", JSON.stringify(user));

                dispatch({
                    type: ActionTypes.LOG_IN,
                    token: data.access_token,
                    user: user
                });
            }
        } catch (error) {
            toast.error(`Error: not able to log in. Check your credentials and try again.`);
        }
        dispatch(loaderOff())
    };
};

export const logOut = () => {
    store.dispatch(loaderOn())
    return (dispatch) => {
        store.dispatch(removeWorkspaceInfoFromStorage())
        store.dispatch(removeSelectedWorkspaceFromStorage())
        store.dispatch(removeInvitesInfoFromStorage())
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("user");
        dispatch({
            type: ActionTypes.LOG_OUT,
            // token: undefined,
            // user: undefined
        })
        dispatch(loaderOff())
    };
};