
const checkInvites = () => {
    let token = sessionStorage.getItem("access_token");

    if (token && token !== undefined && token !== "") {
        let hasInvites = sessionStorage.getItem("hasInvites");
        let invitesData = sessionStorage.getItem("invites");
        if (invitesData === "undefined") {
            invitesData = undefined
        }
        if (invitesData && invitesData.length > 0) {
            invitesData = JSON.parse(invitesData);
        }
        return {
            hasInvites: hasInvites,
            invites: invitesData,
        };
    } else {
        return {
            hasInvites: undefined,
            invites: undefined,
        };
    }
};
const invitesInitialState = checkInvites();
export const invitesReducer = (state = invitesInitialState, action) => {
    switch (action.type) {
        case 'SET_INVITES_INFO':
            return {
                hasInvites: action.hasInvites,
                invites: action.invites,
            }
        case 'SET_INVITES_INFO_UNDEFINED':
            return {
                hasInvites: undefined,
                invites: undefined,
            }
        default:
            return state;
    }
}