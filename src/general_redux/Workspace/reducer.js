//Data of selected workspace

const checkWorkspace = () => {
    let token = sessionStorage.getItem("access_token");
    let selectedWorkspace = sessionStorage.getItem("selectedWorkspace");
    let selectedWorkspaceGroups = sessionStorage.getItem("selectedWorkspaceGroups");
    let selectedWorkspaceAccounts = sessionStorage.getItem("selectedWorkspaceAccounts");
    let selectedWorkspaceExpenseCategories = sessionStorage.getItem("selectedWorkspaceExpenseCategories");
    let selectedWorkspaceExpenseNumberingFormat = sessionStorage.getItem("selectedWorkspaceExpenseNumberingFormat");

    if (selectedWorkspace){
        selectedWorkspace = JSON.parse(selectedWorkspace);
    } 
    if (selectedWorkspaceGroups) {
        selectedWorkspaceGroups = JSON.parse(selectedWorkspaceGroups);
    } 
    if (selectedWorkspaceAccounts) {
        selectedWorkspaceAccounts = JSON.parse(selectedWorkspaceAccounts);
    }
    if (selectedWorkspaceExpenseCategories) {
        selectedWorkspaceExpenseCategories = JSON.parse(selectedWorkspaceExpenseCategories);
    }
    if (selectedWorkspaceExpenseNumberingFormat) {
        selectedWorkspaceExpenseNumberingFormat = JSON.parse(selectedWorkspaceExpenseNumberingFormat);
    }  
    if (token) {
        return {
            selectedWorkspace: selectedWorkspace,
            selectedWorkspaceGroups: selectedWorkspaceGroups,
            selectedWorkspaceAccounts: selectedWorkspaceAccounts,
            selectedWorkspaceExpenseCategories: selectedWorkspaceExpenseCategories,
            selectedWorkspaceExpenseNumberingFormat: selectedWorkspaceExpenseNumberingFormat,
        };
    } else {
        return {
            selectedWorkspace: undefined,
            selectedWorkspaceGroups: undefined,
            selectedWorkspaceAccounts: undefined,
            selectedWorkspaceExpenseCategories: undefined,
            selectedWorkspaceExpenseNumberingFormat: undefined,
        };
    }
};
const workspaceInitialState = checkWorkspace();
export const workspaceReducer = (state = workspaceInitialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_WORKSPACE':
            return {
                selectedWorkspace: action.selectedWorkspace,
                selectedWorkspaceGroups: action.selectedWorkspaceGroups,
                selectedWorkspaceAccounts: action.selectedWorkspaceAccounts,
                selectedWorkspaceExpenseCategories: action.selectedWorkspaceExpenseCategories,
                selectedWorkspaceExpenseNumberingFormat: action.selectedWorkspaceExpenseNumberingFormat,
            }
        case 'SET_SELECTED_WORKSPACE_UNDEFINED':
            return {
                selectedWorkspace: undefined,
                selectedWorkspaceGroups: undefined,
                selectedWorkspaceAccounts: undefined,
                selectedWorkspaceExpenseCategories: undefined,
                selectedWorkspaceExpenseNumberingFormat: undefined,
            }
        case 'SET_SELECTED_WORKSPACE_GROUP':
            return {
                selectedWorkspace: state.selectedWorkspace,
                selectedWorkspaceGroups: action.selectedWorkspaceGroups,
                selectedWorkspaceAccounts: state.selectedWorkspaceAccounts,
                selectedWorkspaceExpenseCategories: state.selectedWorkspaceExpenseCategories,
                selectedWorkspaceExpenseNumberingFormat: state.selectedWorkspaceExpenseNumberingFormat,
            }
        case 'SET_SELECTED_WORKSPACE_ACCOUNT':
            return {
                selectedWorkspace: state.selectedWorkspace,
                selectedWorkspaceGroups: state.selectedWorkspaceGroups,
                selectedWorkspaceAccounts: action.selectedWorkspaceAccounts,
                selectedWorkspaceExpenseCategories: state.selectedWorkspaceExpenseCategories,
                selectedWorkspaceExpenseNumberingFormat: state.selectedWorkspaceExpenseNumberingFormat,
            }
        case 'SET_SELECTED_EXPENSE_CATEGORY':
            return {
                selectedWorkspace: state.selectedWorkspace,
                selectedWorkspaceGroups: state.selectedWorkspaceGroups,
                selectedWorkspaceAccounts: action.selectedWorkspaceAccounts,
                selectedWorkspaceExpenseCategories: state.selectedWorkspaceExpenseCategories,
                selectedWorkspaceExpenseNumberingFormat: state.selectedWorkspaceExpenseNumberingFormat,
            }
        case 'SET_SELECTED_EXPENSE_NUMBERING':
            return {
                selectedWorkspace: state.selectedWorkspace,
                selectedWorkspaceGroups: state.selectedWorkspaceGroups,
                selectedWorkspaceAccounts: action.selectedWorkspaceAccounts,
                selectedWorkspaceExpenseCategories: state.selectedWorkspaceExpenseCategories,
                selectedWorkspaceExpenseNumberingFormat: state.selectedWorkspaceExpenseNumberingFormat,
            }
        default:
            return state;
    }
}