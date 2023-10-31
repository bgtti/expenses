import store from "../store"; 
import { ActionTypes } from "../types";
import api from '../../config/axios';
import APIURL from "../../config/api-url";
import { getAuthHeader } from "../../config/authHeader"
import { loaderOn, loaderOff } from "../Loader/actions";
import { ExpenseNumberingFormat, ExpenseNumberSeparators } from "../../constants/enums";
import { toast } from 'react-toastify';

// Actions for updating the state of a selected workspace
// Objects such as groups and accounts are used in Workspace Settings
export const selectedWorkspaceSetAsUndefined = () => {
    return (dispatch) => {
        sessionStorage.setItem("selectedWorkspace", undefined);
        sessionStorage.setItem("selectedWorkspaceGroups", undefined);
        sessionStorage.setItem("selectedWorkspaceAccounts", undefined);
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
        sessionStorage.removeItem("selectedWorkspaceExpenseCategories");
        sessionStorage.removeItem("selectedWorkspaceExpenseNumberingFormat");
    }
}

// When user changes into a new workspace
export const saveSelectedWorkspace = (selectedWorkspace) => {
    store.dispatch(loaderOn())
    if (!selectedWorkspace){
        return (dispatch) => {
            dispatch(selectedWorkspaceSetAsUndefined())
            dispatch(loaderOff())
        }
    }; 
    sessionStorage.setItem("selectedWorkspace", JSON.stringify(selectedWorkspace));
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE,
            selectedWorkspace: selectedWorkspace,
            selectedWorkspaceGroups: undefined, //might want to change this later
            selectedWorkspaceAccounts: undefined,//might want to change this later
            selectedWorkspaceExpenseCategories: undefined, //might want to change this later
            selectedWorkspaceExpenseNumberingFormat: undefined, //might want to change this later
        })
        dispatch(loaderOff())
    }
}

//This action is used within saveWorkspaceInfo when no sessionStorage object for selectedWorkspace is found
export const setSelectedWorkspaceOnLogIn = (selectedWorkspace) => {
    if (!selectedWorkspace) {
        return (dispatch) => {
            dispatch(selectedWorkspaceSetAsUndefined())
        }
    }; 
    sessionStorage.setItem("selectedWorkspace", JSON.stringify(selectedWorkspace));
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_WORKSPACE,
            selectedWorkspace: selectedWorkspace,
            selectedWorkspaceGroups: undefined,
            selectedWorkspaceAccounts: undefined,
            selectedWorkspaceExpenseCategories: undefined,
            selectedWorkspaceExpenseNumberingFormat: undefined,
        })
    }
}
//*********** GET ALL WORKSPACE SETTINGS ***********
export const getAllWorkspaceSettings = (selectedWorkspace) => {
    store.dispatch(loaderOn())
    return async (dispatch) =>{
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
                dispatch({
                        type: ActionTypes.SET_SELECTED_WORKSPACE,
                        selectedWorkspace: selectedWorkspace, 
                        selectedWorkspaceGroups: data.groups,
                        selectedWorkspaceAccounts:  data.accounts,
                        selectedWorkspaceExpenseCategories: data.expense_categories,
                        selectedWorkspaceExpenseNumberingFormat: data.expense_numbering_settings,
                    })
                toast.success(`Group added successfully!`);
            }
        } catch (error) {
            toast.error(`Error: not able to retrieve workspace settings. No server response.`);
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
    return async (dispatch) =>{
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
                dispatch(setSelectedWorkspaceGroup(data));
                toast.success(`Group added successfully!`);
            }
        } catch (error) {
            toast.error(`Error: group could not be added. No server response.`);
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
                dispatch(setSelectedWorkspaceGroup(data));
                toast.success(`Group edited successfully!`);
            }
        } catch (error) {
            toast.error(`Error: group could not be edited. No server response.`);
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
                dispatch(setSelectedWorkspaceGroup(data));
                toast.success(`Group deleted successfully!`);
            }
        } catch (error) {
            toast.error(`Error: group could not be deleted. No server response.`);
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
                dispatch(setSelectedWorkspaceAccount(data));
                toast.success(`Workspace account added successfully!`);
            }
        } catch (error) {
            toast.error(`Error: workspace account could not be added. No server response.`);
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
                dispatch(setSelectedWorkspaceAccount(data));
                toast.success(`Workspace account edited successfully!`)
            }
        } catch (error) {
            toast.error(`Error: workspace account could not be edited. No server response.`);
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
                dispatch(setSelectedWorkspaceAccount(data));
                toast.success(`Workspace account deleted successfully!`);
            }
        } catch (error) {
            toast.error(`Error: workspace account could not be deleted. No server response.`);
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
                dispatch(setSelectedWorkspaceExpenseCategories(data));
                toast.success(`Expense category added successfully!`);
            }
        } catch (error) {
            toast.error(`Error: expense category could not be added. No server response.`);
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
                dispatch(setSelectedWorkspaceExpenseCategories(data));
                toast.success(`Expense category edited successfully!`);
            }
        } catch (error) {
            toast.error(`Error: expense category could not be edited. No server response.`);
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
                dispatch(setSelectedWorkspaceExpenseCategories(data));
                toast.success(`Expense category deleted successfully!`);
            }
        } catch (error) {
            toast.error(`Error: expense category could not be deleted. No server response.`);
        }
        dispatch(loaderOff());
    }
}

//*********** EXPENSE  NUMBERING ***********
//Setting expense numbering information
export const addSelectedExpenseNumberingPreference = (workspaceUuid, expenseNumberDigits, expenseNumberFormat, expenseNumberStart, expenseNumberYearDigits, expenseNumberSeparator, expenseNumberCustomPrefix) => {
    store.dispatch(loaderOn())
    if(!expenseNumberFormat || !Object.values(ExpenseNumberingFormat).includes(expenseNumberFormat)){
        toast.error(`Error: expense numbering format not supported.`);
        return
    }
    if(!expenseNumberSeparator || !Object.values(ExpenseNumberSeparators).includes(expenseNumberSeparator)){
        toast.error(`Error: expense numbering separator not supported.`);
        return
    }
    return async (dispatch) => {
        const requestData = {
            workspace_uuid: workspaceUuid,
            expense_number_digits: expenseNumberDigits,
            expense_number_format: expenseNumberFormat,
            expense_number_start: expenseNumberStart,
            expense_number_year_digits:expenseNumberYearDigits,
            expense_number_separator:expenseNumberSeparator,
            expense_number_custom_prefix:expenseNumberCustomPrefix,
        };
        const config = getAuthHeader()
        try {
            const response = await api.post(APIURL.SET_EXPENSE_NUMBERING_FORMAT, requestData, config);

            if (response.status !== 200) {
                console.error(`Error setting expense numbering: response status ${response.status}.`);
                toast.error(`Error: expense numbering could not be changed. Server response ${response.status}.`);
            } else {
                const data = response.data;
                sessionStorage.setItem("selectedWorkspaceExpenseNumbering", JSON.stringify(data));
                toast.success(`Expense numbering changed successfully!`);
                return (dispatch) => {
                    dispatch({
                        type: ActionTypes.SET_SELECTED_EXPENSE_NUMBERING,
                        selectedWorkspaceExpenseNumbering: data
                    })
                }
            }
        } catch (error) {
            console.error("Selected Workspace error: there was a problem setting expense numbering.");
            toast.error(`Error: expense numbering could not be changed. No server response.`);
        }
        dispatch(loaderOff());
    }
}