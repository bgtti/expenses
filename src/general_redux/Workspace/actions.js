import store from "../store";
import { ActionTypes } from "../types";
import api from '../../config/axios';
import APIURL from "../../config/api-url";
import { getAuthHeader } from "../../config/authHeader"
import { loaderOn, loaderOff } from "../Loader/actions";
import { toast } from 'react-toastify';

// Actions for updating the state of a selected workspace
// Objects such as groups and accounts are used in Workspace Settings
export const selectedWorkspaceSetAsUndefined = () => {
    return (dispatch) => {
        sessionStorage.setItem("selectedWorkspace", undefined);
        sessionStorage.setItem("selectedWorkspaceGroups", undefined);
        sessionStorage.setItem("selectedWorkspaceAccounts", undefined);
        sessionStorage.getItem("selectedWorkspaceTags", undefined);
        sessionStorage.setItem("selectedWorkspaceExpenseCategories", undefined);
        sessionStorage.setItem("selectedWorkspaceExpenseNumberingFormat", undefined);
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE_UNDEFINED,
            // selectedWorkspace: undefined,
            // selectedWorkspaceGroups: undefined,
            // selectedWorkspaceAccounts: undefined,
        })
    }
};

export const removeSelectedWorkspaceFromStorage = () => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE_UNDEFINED,
            // selectedWorkspace: undefined,
            // selectedWorkspaceGroups: undefined,
            // selectedWorkspaceAccounts: undefined,
        })
        sessionStorage.removeItem("selectedWorkspace");
        sessionStorage.removeItem("selectedWorkspaceGroups");
        sessionStorage.removeItem("selectedWorkspaceAccounts");
        sessionStorage.removeItem("selectedWorkspaceTags");
        sessionStorage.removeItem("selectedWorkspaceExpenseCategories");
        sessionStorage.removeItem("selectedWorkspaceExpenseNumberingFormat");
    }
}

//This action is used when settings is given by another function (such as the logIn action, or when adding a new workspace)
//Requires two objects: one with basic selectedWorkspace info (uuid, name, currency, and abbreviation) and it's settings (which includes groups, categories, etc)
export const setSelectedWorkspace = (selectedWorkspace, selectedWorkspaceSettings) => {
    if (!selectedWorkspace || !selectedWorkspaceSettings) {
        toast.error("Error: could not select workspace.")
        return (dispatch) => {
            dispatch(selectedWorkspaceSetAsUndefined())
        }
    };
    sessionStorage.setItem("selectedWorkspace", JSON.stringify(selectedWorkspace));
    sessionStorage.setItem("selectedWorkspaceGroups", JSON.stringify(selectedWorkspaceSettings.groups));
    sessionStorage.setItem("selectedWorkspaceAccounts", JSON.stringify(selectedWorkspaceSettings.accounts));
    sessionStorage.getItem("selectedWorkspaceTags", JSON.stringify(selectedWorkspaceSettings.tags));
    sessionStorage.setItem("selectedWorkspaceExpenseCategories", JSON.stringify(selectedWorkspaceSettings.expense_categories));
    sessionStorage.setItem("selectedWorkspaceExpenseNumberingFormat", JSON.stringify(selectedWorkspaceSettings.expense_numbering_settings));
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE,
            selectedWorkspace: selectedWorkspace,
            selectedWorkspaceGroups: selectedWorkspaceSettings.groups,
            selectedWorkspaceAccounts: selectedWorkspaceSettings.accounts,
            selectedWorkspaceTags: selectedWorkspaceSettings.tags,
            selectedWorkspaceExpenseCategories: selectedWorkspaceSettings.expense_categories,
            selectedWorkspaceExpenseNumberingFormat: selectedWorkspaceSettings.expense_numbering_settings,
        })
    }
}

// This action is used to edit the selectedWorkspace's basic info only
// It is used in editWorkspace() from UserSettingsWorkspaces
export const setEditedSelectedWorkspaceInfo = (selectedWorkspace) => {
    if (!selectedWorkspace) {
        toast.error("Error: could not edit selected workspace.")
        return (dispatch) => {
            dispatch(selectedWorkspaceSetAsUndefined())
        }
    };
    sessionStorage.setItem("selectedWorkspace", JSON.stringify(selectedWorkspace));
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE_ONLY,
            selectedWorkspace: selectedWorkspace
        })
    }
}
//*********** GET ALL WORKSPACE SETTINGS ***********
export const getAllWorkspaceSettings = (selectedWorkspace) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            workspace_uuid: selectedWorkspace.uuid,
        };
        const config = getAuthHeader()
        try {
            const response = await api.post(APIURL.GET_WORKSPACE_SETTINGS, requestData, config);

            if (response.status !== 200) {
                toast.error(`Error: not able to retrieve workspace settings. Server response status ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspace", JSON.stringify(selectedWorkspace));
                sessionStorage.setItem("selectedWorkspaceGroups", JSON.stringify(data.groups));
                sessionStorage.setItem("selectedWorkspaceAccounts", JSON.stringify(data.accounts));
                sessionStorage.getItem("selectedWorkspaceTags", JSON.stringify(data.tags));
                sessionStorage.setItem("selectedWorkspaceExpenseCategories", JSON.stringify(data.expense_categories));
                sessionStorage.setItem("selectedWorkspaceExpenseNumberingFormat", JSON.stringify(data.expense_numbering_settings));
                dispatch({
                    type: ActionTypes.SET_SELECTED_WORKSPACE,
                    selectedWorkspace: selectedWorkspace,
                    selectedWorkspaceGroups: data.groups,
                    selectedWorkspaceAccounts: data.accounts,
                    selectedWorkspaceTags: data.tags,
                    selectedWorkspaceExpenseCategories: data.expense_categories,
                    selectedWorkspaceExpenseNumberingFormat: data.expense_numbering_settings,
                })
            }
        } catch (error) {
            toast.error(`Error: not able to retrieve workspace settings. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

//*********** GROUPS ***********
//Getting group information
export const setSelectedWorkspaceGroup = (selectedWorkspaceGroups) => {
    if (!selectedWorkspaceGroups) {
        sessionStorage.setItem("selectedWorkspaceGroups", undefined);
        return (dispatch) => {
            dispatch({
                type: ActionTypes.SET_SELECTED_WORKSPACE_GROUP,
                selectedWorkspaceGroups: undefined,
            })
        }
    };
    sessionStorage.setItem("selectedWorkspaceGroups", JSON.stringify(selectedWorkspaceGroups));
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE_GROUP,
            selectedWorkspaceGroups: selectedWorkspaceGroups
        })
    }
}

// Add group
export const addSelectedWorkspaceGroup = (workspaceUuid, groupName, groupDescription, groupCode) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            workspace_uuid: workspaceUuid,
            name: groupName,
            description: groupDescription,
            code: groupCode
        };
        const config = getAuthHeader()
        try {
            const response = await api.post(APIURL.ADD_GROUP, requestData, config);

            if (response.status !== 200) {
                toast.error(`Error: group could not be added. Server response status ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceGroups", JSON.stringify(data));
                dispatch(setSelectedWorkspaceGroup(data));
                toast.success(`Group added successfully!`);
            }
        } catch (error) {
            toast.error(`Error: group could not be added. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

// Edit group
export const editSelectedWorkspaceGroup = (groupUuid, groupName, groupDescription, groupCode) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            group_uuid: groupUuid,
            name: groupName,
            description: groupDescription,
            code: groupCode
        };
        const config = getAuthHeader()
        try {
            const response = await api.post(APIURL.EDIT_GROUP, requestData, config);

            if (response.status !== 200) {
                toast.error(`Error: group could not be edited. Server response status ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceGroups", JSON.stringify(data));
                dispatch(setSelectedWorkspaceGroup(data));
                toast.success(`Group edited successfully!`);
            }
        } catch (error) {
            toast.error(`Error: group could not be edited. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

// Delete group
export const deleteSelectedWorkspaceGroup = (groupUuid) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            group_uuid: groupUuid,
        };
        let token = sessionStorage.getItem("access_token");
        try {
            const response = await api.delete(APIURL.DELETE_GROUP, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, }, data: JSON.stringify(requestData) });

            if (response.status !== 200) {
                toast.error(`Error: group could not be deleted. Server response status ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceGroups", JSON.stringify(data));
                dispatch(setSelectedWorkspaceGroup(data));
                toast.success(`Group deleted successfully!`);
            }
        } catch (error) {
            toast.error(`Error: group could not be deleted. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

//*********** ACCOUNTS ***********
//Getting account information
export const setSelectedWorkspaceAccount = (selectedWorkspaceAccounts) => {
    if (!selectedWorkspaceAccounts) {
        sessionStorage.setItem("selectedWorkspaceAccounts", undefined);
        return (dispatch) => {
            dispatch({
                type: ActionTypes.SET_SELECTED_WORKSPACE_ACCOUNT,
                selectedWorkspaceAccounts: undefined,
            })
        }
    };
    sessionStorage.setItem("selectedWorkspaceAccounts", JSON.stringify(selectedWorkspaceAccounts));
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE_ACCOUNT,
            selectedWorkspaceAccounts: selectedWorkspaceAccounts
        })
    }
}

// Add account
export const addSelectedWorkspaceAccount = (workspaceUuid, accountName, accountDescription, accountCode) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            workspace_uuid: workspaceUuid,
            name: accountName,
            description: accountDescription,
            code: accountCode
        };
        const config = getAuthHeader()
        try {
            const response = await api.post(APIURL.ADD_ACCOUNT, requestData, config);

            if (response.status !== 200) {
                toast.error(`Error: workspace account could not be added. Server response ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceAccounts", JSON.stringify(data));
                dispatch(setSelectedWorkspaceAccount(data));
                toast.success(`Workspace account added successfully!`);
            }
        } catch (error) {
            toast.error(`Error: workspace account could not be added. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

// Edit account
export const editSelectedWorkspaceAccount = (accountUuid, accountName, accountDescription, accountCode) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            account_uuid: accountUuid,
            name: accountName,
            description: accountDescription,
            code: accountCode
        };
        const config = getAuthHeader()
        try {
            const response = await api.post(APIURL.EDIT_ACCOUNT, requestData, config);

            if (response.status !== 200) {
                toast.error(`Error: workspace account could not be edited. Server response ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceAccounts", JSON.stringify(data));
                dispatch(setSelectedWorkspaceAccount(data));
                toast.success(`Workspace account edited successfully!`)
            }
        } catch (error) {
            toast.error(`Error: workspace account could not be edited. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

// Delete account
export const deleteSelectedWorkspaceAccount = (accountUuid) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            account_uuid: accountUuid,
        };
        let token = sessionStorage.getItem("access_token");
        try {
            const response = await api.delete(APIURL.DELETE_ACCOUNT, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, }, data: JSON.stringify(requestData) });

            if (response.status !== 200) {
                toast.error(`Error: workspace account could not be deleted. Server response ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceAccounts", JSON.stringify(data));
                dispatch(setSelectedWorkspaceAccount(data));
                toast.success(`Workspace account deleted successfully!`);
            }
        } catch (error) {
            toast.error(`Error: workspace account could not be deleted. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

//*********** TAGS ***********
//Getting tag information
export const setSelectedWorkspaceTag = (selectedWorkspaceTags) => {
    if (!selectedWorkspaceTags) {
        sessionStorage.setItem("selectedWorkspaceTags", undefined);
        return (dispatch) => {
            dispatch({
                type: ActionTypes.SET_SELECTED_WORKSPACE_TAG,
                selectedWorkspaceTags: undefined,
            })
        }
    };
    sessionStorage.setItem("selectedWorkspaceTags", JSON.stringify(selectedWorkspaceTags));
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE_TAG,
            selectedWorkspaceTags: selectedWorkspaceTags
        })
    }
}

// Add tag
export const addSelectedWorkspaceTag = (workspaceUuid, tagName, tagColour) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            workspace_uuid: workspaceUuid,
            name: tagName,
            colour: tagColour
        };
        const config = getAuthHeader()
        try {
            const response = await api.post(APIURL.ADD_TAG, requestData, config);

            if (response.status !== 200) {
                toast.error(`Error: workspace tag could not be added. Server response ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceTags", JSON.stringify(data));
                dispatch(setSelectedWorkspaceTag(data));
                toast.success(`Workspace tag added successfully!`);
            }
        } catch (error) {
            toast.error(`Error: workspace tag could not be added. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

// Edit tag
export const editSelectedWorkspaceTag = (tagUuid, tagName, tagColour) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            tag_uuid: tagUuid,
            name: tagName,
            colour: tagColour,
        };
        const config = getAuthHeader()
        try {
            const response = await api.post(APIURL.EDIT_TAG, requestData, config);

            if (response.status !== 200) {
                toast.error(`Error: workspace tag could not be edited. Server response ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceTags", JSON.stringify(data));
                dispatch(setSelectedWorkspaceTag(data));
                toast.success(`Workspace tag edited successfully!`)
            }
        } catch (error) {
            toast.error(`Error: workspace tag could not be edited. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

// Delete tag
export const deleteSelectedWorkspaceTag = (tagUuid) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            tag_uuid: tagUuid,
        };
        let token = sessionStorage.getItem("access_token");
        try {
            const response = await api.delete(APIURL.DELETE_TAG, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, }, data: JSON.stringify(requestData) });

            if (response.status !== 200) {
                toast.error(`Error: workspace tag could not be deleted. Server response ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceTags", JSON.stringify(data));
                dispatch(setSelectedWorkspaceTag(data));
                toast.success(`Workspace tag deleted successfully!`);
            }
        } catch (error) {
            toast.error(`Error: workspace tag could not be deleted. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

//*********** EXPENSE CATEGORY ***********
//Getting expense category information
export const setSelectedWorkspaceExpenseCategories = (selectedWorkspaceExpenseCategories) => {
    if (!selectedWorkspaceExpenseCategories) {
        sessionStorage.setItem("selectedWorkspaceExpenseCategories", undefined);
        return (dispatch) => {
            dispatch({
                type: ActionTypes.SET_SELECTED_EXPENSE_CATEGORY,
                selectedWorkspaceExpenseCategories: undefined,
            })
        }
    };
    sessionStorage.setItem("selectedWorkspaceExpenseCategories", JSON.stringify(selectedWorkspaceExpenseCategories));
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_EXPENSE_CATEGORY,
            selectedWorkspaceExpenseCategories: selectedWorkspaceExpenseCategories
        })
    }
}

// Add expense category
export const addSelectedExpenseCategory = (workspaceUuid, expenseCategoryName, expenseCategoryDescription, expenseCategoryCode) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            workspace_uuid: workspaceUuid,
            name: expenseCategoryName,
            description: expenseCategoryDescription,
            code: expenseCategoryCode
        };
        const config = getAuthHeader()
        try {
            const response = await api.post(APIURL.ADD_EXPENSE_CATEGORY, requestData, config);

            if (response.status !== 200) {
                toast.error(`Error: expense category could not be added. Server response ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceExpenseCategories", JSON.stringify(data));
                dispatch(setSelectedWorkspaceExpenseCategories(data));
                toast.success(`Expense category added successfully!`);
            }
        } catch (error) {
            toast.error(`Error: expense category could not be added. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

// Edit expense category
export const editSelectedExpenseCategory = (expenseCategoryUuid, expenseCategoryName, expenseCategoryDescription, expenseCategoryCode) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            expense_category_uuid: expenseCategoryUuid,
            name: expenseCategoryName,
            description: expenseCategoryDescription,
            code: expenseCategoryCode
        };
        const config = getAuthHeader()
        try {
            const response = await api.post(APIURL.EDIT_EXPENSE_CATEGORY, requestData, config);

            if (response.status !== 200) {
                toast.error(`Error: expense category could not be edited. Server response ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceExpenseCategories", JSON.stringify(data));
                dispatch(setSelectedWorkspaceExpenseCategories(data));
                toast.success(`Expense category edited successfully!`);
            }
        } catch (error) {
            toast.error(`Error: expense category could not be edited. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

// Delete expense category
export const deleteSelectedWorkspaceExpenseCategories = (expenseCategoryUuid) => {
    store.dispatch(loaderOn())
    return async (dispatch) => {
        const requestData = {
            expense_category_uuid: expenseCategoryUuid,
        };
        let token = sessionStorage.getItem("access_token");
        try {
            const response = await api.delete(APIURL.DELETE_EXPENSE_CATEGORY, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, }, data: JSON.stringify(requestData) });

            if (response.status !== 200) {
                toast.error(`Error: expense category could not be deleted. Server response ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceExpenseCategories", JSON.stringify(data));
                dispatch(setSelectedWorkspaceExpenseCategories(data));
                toast.success(`Expense category deleted successfully!`);
            }
        } catch (error) {
            toast.error(`Error: expense category could not be deleted. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}

//*********** EXPENSE  NUMBERING ***********
//Setting expense numbering information
export const addSelectedExpenseNumberingPreference = (workspaceUuid, expenseNumberDigits, expenseNumberFormat, expenseNumberStart, expenseNumberYearDigits, expenseNumberSeparator, expenseNumberCustomPrefix) => {
    store.dispatch(loaderOn())
    if (!expenseNumberFormat) {
        store.dispatch(loaderOff());
        toast.error(`Error: missing numbering format.`);
        return;
    }
    return async (dispatch) => {
        const requestData = {
            workspace_uuid: workspaceUuid,
            expense_number_digits: expenseNumberDigits,
            expense_number_format: expenseNumberFormat,
            expense_number_start: expenseNumberStart,
            expense_number_year_digits: expenseNumberYearDigits,
            expense_number_separator: expenseNumberSeparator,
            expense_number_custom_prefix: expenseNumberCustomPrefix,
        };
        const config = getAuthHeader()
        try {
            const response = await api.post(APIURL.SET_EXPENSE_NUMBERING_FORMAT, requestData, config);

            if (response.status !== 200) {
                toast.error(`Error: expense numbering could not be changed. Server response ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceExpenseNumbering", JSON.stringify(data));
                toast.success(`Expense numbering changed successfully!`);
                dispatch({
                    type: ActionTypes.SET_SELECTED_EXPENSE_NUMBERING,
                    selectedWorkspaceExpenseNumberingFormat: data
                })
            }
        } catch (error) {
            toast.error(`Error: expense numbering could not be changed. No server response or request rejected.`);
        }
        dispatch(loaderOff());
    }
}