import { ActionTypes } from "../types";
import store from "../store";

export const invitesInfoSetAsUndefined = () => {
    return (dispatch) => {
        sessionStorage.setItem("hasInvites", undefined);
        sessionStorage.setItem("invites", undefined);
        dispatch({
            type: ActionTypes.SET_INVITES_INFO_UNDEFINED,
            hasInvites: undefined,
            invites: undefined,
        })
    }
};

export const removeInvitesInfoFromStorage = () => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_INVITES_INFO_UNDEFINED,
            hasInvites: undefined,
            invites: undefined,
        })
        sessionStorage.removeItem("hasInvites");
        sessionStorage.removeItem("invites");
    }
}

export const saveInvitesInfo = (hasInvites, invites) => {

    if (!hasInvites && invites.length > 0) {
        return store.dispatch(invitesInfoSetAsUndefined())
    }
    if (!hasInvites && invites.length > 0) {
        console.warn("Has invites set to false, but invites were found.");
        hasInvites = true;
    }
    if (hasInvites && !invites) {
        console.error("Has invites set to true, but invites not received.")
        return
    }
    // Stringify objects for session storage
    !invites ? invites = undefined : invites = JSON.stringify(invites)

    sessionStorage.setItem("hasInvites", hasInvites);
    sessionStorage.setItem("invites", invites);

    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_INVITES_INFO,
            hasInvites: hasInvites,
            invites: invites,
        })
    }
}