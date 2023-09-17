//Data of selected workspace

const checkWorkspace = () => {
    let token = sessionStorage.getItem("access_token");
    let selectedWorkspace = sessionStorage.getItem("selectedWorkspace");

    if (selectedWorkspace === "undefined" || selectedWorkspace === null || !selectedWorkspace){
        selectedWorkspace = undefined;
    } else {
        selectedWorkspace = JSON.parse(selectedWorkspace);
    }
    if (token && token !== undefined && token !== "") {
        return {
            selectedWorkspace: selectedWorkspace,
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