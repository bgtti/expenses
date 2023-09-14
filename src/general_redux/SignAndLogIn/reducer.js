const checkAccessToken = () => {
    let token = sessionStorage.getItem("access_token");
    let user = sessionStorage.getItem("user");
    let hasInvites = sessionStorage.getItem("hasInvites");
    let invitesData = sessionStorage.getItem("invites");
    user = JSON.parse(user)
    if (invitesData === "undefined") {
        invitesData = undefined
    }
    if (invitesData && invitesData.length > 0) {
        invitesData = JSON.parse(invitesData);
    } 
    // let hasWorkspaces = sessionStorage.getItem("hasWorkspaces");
    // let favoriteWorkspaceData = sessionStorage.getItem("favoriteWorkspaces");
    // let workspacesData = sessionStorage.getItem("workspaces");
    if (token && token !== undefined && token !== ""){
        return { 
            loggedIn: true,
            token,
            user,
            hasInvites: hasInvites,
            invites: invitesData,
            // hasWorkspaces: hasWorkspaces,
            // favoriteWorkspace: favoriteWorkspaceData,
            // workspaces: workspacesData
        };
    } else {
        return { 
            loggedIn: false, 
            token: undefined,
            user: undefined, 
            hasInvites: undefined,
            invites: undefined,
            // hasWorkspaces: undefined,
            // favoriteWorkspace: undefined,
            // workspaces: undefined
        };
    }
};

const isLoggedInInitialState = checkAccessToken(); 

export const isLoggedInReducer = (state = isLoggedInInitialState, action) => {
    switch(action.type){
        case 'LOG_IN':
            return {
                loggedIn: true,
                token: action.token,
                user: action.user,
                hasInvites: action.hasInvites,
                invites: action.invites,
                // hasWorkspaces: action.hasWorkspaces,
                // favoriteWorkspace: action.favoriteWorkspace,
                // workspaces: action.workspaces
            };
        case 'LOG_OUT':
            return {
                loggedIn: false,
                token: undefined,
                user: undefined, 
                hasInvites: undefined,
                invites: undefined,
                // hasWorkspaces: undefined,
                // favoriteWorkspace: undefined,
                // workspaces: undefined
            };
        default:
            return state;
    }
};



