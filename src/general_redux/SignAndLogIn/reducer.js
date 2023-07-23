const checkAccessToken = () => {
    let token = sessionStorage.getItem("access_token");
    let user = sessionStorage.getItem("user");
    let hasInvites = sessionStorage.getItem("hasInvites");
    let invitesData = sessionStorage.getItem("invites");
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

const checkWorkspaces = () => {
    let token = sessionStorage.getItem("access_token");
    let hasWorkspaces = sessionStorage.getItem("hasWorkspaces");
    let favoriteWorkspaceData = sessionStorage.getItem("favoriteWorkspaces");
    let workspacesData = sessionStorage.getItem("workspaces");
    if (token && token !== undefined && token !== "") {
        return {
            hasWorkspaces: hasWorkspaces,
            favoriteWorkspace: favoriteWorkspaceData,
            workspaces: workspacesData
        };
    } else {
        return {
            hasWorkspaces: undefined,
            favoriteWorkspace: undefined,
            workspaces: undefined
        };
    }
};
const workspacesInitialState = checkWorkspaces();
export const workspacesReducer = (state = workspacesInitialState, action) => {
    switch (action.type) {
        case 'GET_WORKSPACE_INFO':
            return {
                hasWorkspaces: action.hasWorkspaces,
                favoriteWorkspace: action.favoriteWorkspace,
                workspaces: action.workspaces
            }
        default:
            return state;
    }
}

