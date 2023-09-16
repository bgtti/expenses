//Data of selected workspace

const checkWorkspace = () => {
    let token = sessionStorage.getItem("access_token");
    let hasWorkspaces = sessionStorage.getItem("hasWorkspaces");
    let favoriteWorkspaceData = sessionStorage.getItem("favoriteWorkspaces");
    let workspacesData = sessionStorage.getItem("workspaces");
    let selectedWorkspace = sessionStorage.getItem("workspaces");

    if (hasWorkspaces || favoriteWorkspaceData || workspacesData || selectedWorkspace){
        if (!hasWorkspaces){
            console.warn("Has workspaces is set to false but workspace information found.")
        }
        // if there is no saved selected workspace, then slect favorite. If there is no favorite workspace, select the first workspace in ordered list.
        if (!selectedWorkspace) {
            if (favoriteWorkspaceData) {
                selectedWorkspace = JSON.parse(favoriteWorkspaceData);
            } else if (workspacesData) {
                workspacesData = JSON.parse(workspacesData);
                selectedWorkspace = workspacesData.slice(1);
            }
        } else {
            selectedWorkspace = JSON.parse(selectedWorkspace);
        }
    }
    if (token && token !== undefined && token !== "") {
        return {
            selectedWorkspace: hasWorkspaces,
        };
    } else {
        return {
            selectedWorkspace: undefined,
        };
    }
};
const workspaceInitialState = checkWorkspace();
export const workspaceReducer = (state = workspaceInitialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_WORKSPACE':
            return {
                selectedWorkspace: action.selectedWorkspace,
            }
        case 'SET_SELECTED_WORKSPACE_UNDEFINED':
            return {
                selectedWorkspace: undefined,
            }
        default:
            return state;
    }
}