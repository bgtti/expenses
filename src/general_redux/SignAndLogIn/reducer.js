const checkAccessToken = () => {
    const token = sessionStorage.getItem("access_token");
    let hasInvitesData = sessionStorage.getItem("hasInvites");
    let invitesData = sessionStorage.Item("invites");
    let hasWorkspacesData = sessionStorage.Item("hasWorkspaces");
    let favoriteWorkspaceData = sessionStorage.Item("favoriteWorkspaces");
    let workspacesData = sessionStorage.Item("workspaces");
    if (token && token !== undefined && token !== ""){
        return { 
            loggedIn: true,
            token,
            hasInvites: hasInvitesData,
            invites: invitesData,
            hasWorkspaces: hasWorkspacesData,
            favoriteWorkspace: favoriteWorkspaceData,
            workspaces: workspacesData
        };
    } else {
        return { 
            loggedIn: false, 
            token: undefined, 
            hasInvites: undefined,
            invites: undefined,
            hasWorkspaces: undefined,
            favoriteWorkspace: undefined,
            workspaces: undefined
        };
    }
};

const isLoggedInInitialState = checkAccessToken();

const isLoggedInReducer = (state = isLoggedInInitialState, action) => {
    switch(action.type){
        case 'LOG_IN':
            return {
                loggedIn: true,
                token: action.token,
                hasInvites: action.hasInvites,
                invites: action.invites,
                hasWorkspaces: action.hasWorkspaces,
                favoriteWorkspace: action.favoriteWorkspace,
                workspaces: action.workspaces
            };
        case 'LOG_OUT':
            return {
                loggedIn: false,
                token: undefined,
                hasInvites: undefined,
                invites: undefined,
                hasWorkspaces: undefined,
                favoriteWorkspace: undefined,
                workspaces: undefined
            };
        default:
            return state;
    }
};

export default isLoggedInReducer;