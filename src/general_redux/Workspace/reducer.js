//Data of selected workspace
import { DEFAULT_EXPENSE_NUMBERING } from "../../constants/constants"

const checkWorkspace = () => {
    let token = sessionStorage.getItem("access_token");
    let selectedWorkspace = sessionStorage.getItem("selectedWorkspace");
    let selectedWorkspaceGroups = sessionStorage.getItem("selectedWorkspaceGroups");
    let selectedWorkspaceSubgroups = sessionStorage.getItem("selectedWorkspaceSubgroups");
    let selectedWorkspaceAccounts = sessionStorage.getItem("selectedWorkspaceAccounts");
    let selectedWorkspaceTags = sessionStorage.getItem("selectedWorkspaceTags");
    let selectedWorkspaceExpenseCategories = sessionStorage.getItem("selectedWorkspaceExpenseCategories");
    let selectedWorkspaceExpenseNumberingFormat = sessionStorage.getItem("selectedWorkspaceExpenseNumberingFormat");

    if (selectedWorkspace) {
        selectedWorkspace = JSON.parse(selectedWorkspace);
    }
    if (selectedWorkspaceGroups) {
        selectedWorkspaceGroups = JSON.parse(selectedWorkspaceGroups);
    }
    if (selectedWorkspaceSubgroups) {
        selectedWorkspaceSubgroups = JSON.parse(selectedWorkspaceSubgroups);
    }
    if (selectedWorkspaceAccounts) {
        selectedWorkspaceAccounts = JSON.parse(selectedWorkspaceAccounts);
    }
    if (selectedWorkspaceTags) {
        selectedWorkspaceTags = JSON.parse(selectedWorkspaceTags);
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
            selectedWorkspaceSubgroups: selectedWorkspaceSubgroups,
            selectedWorkspaceAccounts: selectedWorkspaceAccounts,
            selectedWorkspaceTags: selectedWorkspaceTags,
            selectedWorkspaceExpenseCategories: selectedWorkspaceExpenseCategories,
            selectedWorkspaceExpenseNumberingFormat: selectedWorkspaceExpenseNumberingFormat,
        };
    } else {
        return {
            selectedWorkspace: undefined,
            selectedWorkspaceGroups: undefined,
            selectedWorkspaceSubgroups: undefined,
            selectedWorkspaceAccounts: undefined,
            selectedWorkspaceTags: undefined,
            selectedWorkspaceExpenseCategories: undefined,
            selectedWorkspaceExpenseNumberingFormat: DEFAULT_EXPENSE_NUMBERING,
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
                selectedWorkspaceSubgroups: action.selectedWorkspaceSubgroups,
                selectedWorkspaceAccounts: action.selectedWorkspaceAccounts,
                selectedWorkspaceTags: action.selectedWorkspaceTags,
                selectedWorkspaceExpenseCategories: action.selectedWorkspaceExpenseCategories,
                selectedWorkspaceExpenseNumberingFormat: action.selectedWorkspaceExpenseNumberingFormat,
            }
        case 'SET_SELECTED_WORKSPACE_UNDEFINED':
            return {
                selectedWorkspace: undefined,
                selectedWorkspaceGroups: undefined,
                selectedWorkspaceSubgroups: undefined,
                selectedWorkspaceAccounts: undefined,
                selectedWorkspaceTags: undefined,
                selectedWorkspaceExpenseCategories: undefined,
                selectedWorkspaceExpenseNumberingFormat: undefined,
            }
        case 'SET_SELECTED_WORKSPACE_ONLY':
            return {
                selectedWorkspace: action.selectedWorkspace,
                selectedWorkspaceGroups: state.selectedWorkspaceGroups,
                selectedWorkspaceSubgroups: state.selectedWorkspaceSubgroups,
                selectedWorkspaceAccounts: state.selectedWorkspaceAccounts,
                selectedWorkspaceTags: state.selectedWorkspaceTags,
                selectedWorkspaceExpenseCategories: state.selectedWorkspaceExpenseCategories,
                selectedWorkspaceExpenseNumberingFormat: state.selectedWorkspaceExpenseNumberingFormat,
            }
        case 'SET_SELECTED_WORKSPACE_GROUP':
            return {
                selectedWorkspace: state.selectedWorkspace,
                selectedWorkspaceGroups: action.selectedWorkspaceGroups,
                selectedWorkspaceSubgroups: action.selectedWorkspaceSubgroups,
                selectedWorkspaceAccounts: state.selectedWorkspaceAccounts,
                selectedWorkspaceTags: state.selectedWorkspaceTags,
                selectedWorkspaceExpenseCategories: state.selectedWorkspaceExpenseCategories,
                selectedWorkspaceExpenseNumberingFormat: state.selectedWorkspaceExpenseNumberingFormat,
            }
        // case 'SET_SELECTED_WORKSPACE_SUBGROUP':
        //     return {
        //         selectedWorkspace: state.selectedWorkspace,
        //         selectedWorkspaceGroups: state.selectedWorkspaceGroups,
        //         selectedWorkspaceSubgroups: action.selectedWorkspaceSubgroups,
        //         selectedWorkspaceAccounts: state.selectedWorkspaceAccounts,
        //         selectedWorkspaceTags: state.selectedWorkspaceTags,
        //         selectedWorkspaceExpenseCategories: state.selectedWorkspaceExpenseCategories,
        //         selectedWorkspaceExpenseNumberingFormat: state.selectedWorkspaceExpenseNumberingFormat,
        //     }
        case 'SET_SELECTED_WORKSPACE_ACCOUNT':
            return {
                selectedWorkspace: state.selectedWorkspace,
                selectedWorkspaceGroups: state.selectedWorkspaceGroups,
                selectedWorkspaceSubgroups: state.selectedWorkspaceSubgroups,
                selectedWorkspaceAccounts: action.selectedWorkspaceAccounts,
                selectedWorkspaceTags: state.selectedWorkspaceTags,
                selectedWorkspaceExpenseCategories: state.selectedWorkspaceExpenseCategories,
                selectedWorkspaceExpenseNumberingFormat: state.selectedWorkspaceExpenseNumberingFormat,
            }
        case 'SET_SELECTED_WORKSPACE_TAG':
            return {
                selectedWorkspace: state.selectedWorkspace,
                selectedWorkspaceGroups: state.selectedWorkspaceGroups,
                selectedWorkspaceSubgroups: state.selectedWorkspaceSubgroups,
                selectedWorkspaceAccounts: state.selectedWorkspaceAccounts,
                selectedWorkspaceTags: action.selectedWorkspaceTags,
                selectedWorkspaceExpenseCategories: state.selectedWorkspaceExpenseCategories,
                selectedWorkspaceExpenseNumberingFormat: state.selectedWorkspaceExpenseNumberingFormat,
            }
        case 'SET_SELECTED_EXPENSE_CATEGORY':
            return {
                selectedWorkspace: state.selectedWorkspace,
                selectedWorkspaceGroups: state.selectedWorkspaceGroups,
                selectedWorkspaceSubgroups: state.selectedWorkspaceSubgroups,
                selectedWorkspaceAccounts: state.selectedWorkspaceAccounts,
                selectedWorkspaceTags: state.selectedWorkspaceTags,
                selectedWorkspaceExpenseCategories: action.selectedWorkspaceExpenseCategories,
                selectedWorkspaceExpenseNumberingFormat: state.selectedWorkspaceExpenseNumberingFormat,
            }
        case 'SET_SELECTED_EXPENSE_NUMBERING':
            return {
                selectedWorkspace: state.selectedWorkspace,
                selectedWorkspaceGroups: state.selectedWorkspaceGroups,
                selectedWorkspaceSubgroups: state.selectedWorkspaceSubgroups,
                selectedWorkspaceAccounts: state.selectedWorkspaceAccounts,
                selectedWorkspaceTags: state.selectedWorkspaceTags,
                selectedWorkspaceExpenseCategories: state.selectedWorkspaceExpenseCategories,
                selectedWorkspaceExpenseNumberingFormat: action.selectedWorkspaceExpenseNumberingFormat,
            }
        default:
            return state;
    }
}