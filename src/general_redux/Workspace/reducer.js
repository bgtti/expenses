//Data of selected workspace

const checkWorkspace = () => {
    let token = sessionStorage.getItem("access_token");
    let selectedWorkspace = sessionStorage.getItem("selectedWorkspace");
    let selectedWorkspaceGroups = sessionStorage.getItem("selectedWorkspaceGroups");

    if (selectedWorkspace === "undefined" || selectedWorkspace === null || !selectedWorkspace){
        selectedWorkspace = undefined;
    } else {
        selectedWorkspace = JSON.parse(selectedWorkspace);
    }
    if (selectedWorkspaceGroups === "undefined" || selectedWorkspaceGroups === null || !selectedWorkspaceGroups) {
        selectedWorkspaceGroups = undefined;
    } else {
        selectedWorkspaceGroups = JSON.parse(selectedWorkspaceGroups);
    }
    if (token && token !== undefined && token !== "") {
        return {
            selectedWorkspace: selectedWorkspace,
            selectedWorkspaceGroups: undefined,
        };
    } else {
        return {
            selectedWorkspace: undefined,
            selectedWorkspaceGroups: undefined,
        };
    }
};
const workspaceInitialState = checkWorkspace();
export const workspaceReducer = (state = workspaceInitialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_WORKSPACE':
            return {
                selectedWorkspace: action.selectedWorkspace,
                selectedWorkspaceGroups: action.groups,
            }
        case 'SET_SELECTED_WORKSPACE_UNDEFINED':
            return {
                selectedWorkspace: undefined,
                selectedWorkspaceGroups: undefined,
            }
        case 'SET_SELECTED_WORKSPACE_GROUP':
            return {
                selectedWorkspace: state.selectedWorkspace,
                selectedWorkspaceGroups: action.groups,
            }
        default:
            return state;
    }
}