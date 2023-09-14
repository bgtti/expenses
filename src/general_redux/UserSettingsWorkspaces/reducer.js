const checkWorkspaces = () => {
    let token = sessionStorage.getItem("access_token");
    let hasWorkspaces = sessionStorage.getItem("hasWorkspaces");
    let favoriteWorkspaceData = sessionStorage.getItem("favoriteWorkspaces");
    let workspacesData = sessionStorage.getItem("workspaces");
    if (workspacesData === "undefined") {
        workspacesData = undefined;
    }
    if (workspacesData && workspacesData.length > 0) {
        workspacesData = JSON.parse(workspacesData);
    }

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
        case 'SET_ALL_WORKSPACE_INFO':
            return {
                hasWorkspaces: action.hasWorkspaces,
                favoriteWorkspace: action.favoriteWorkspace,
                workspaces: action.workspaces
            }
        case 'SET_WORKSPACE_INFO_UNDEFINED':
            return{
                hasWorkspaces: undefined,
                favoriteWorkspace: undefined,
                workspaces: undefined
            }
        default:
            return state;
    }
}