import store from "../store"; 
import { ActionTypes } from "../types";
import api from '../../config/axios';
import APIURL from "../../config/api-url";
import { getAuthHeader } from "../../config/authHeader"
import { loaderOn, loaderOff } from "../Loader/actions";
import { ExpenseNumberingFormat } from "../../constants/enums";

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
                console.error(`Error adding group: response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(setSelectedWorkspaceGroup(data))
            }
        } catch (error) {
            console.error("Selected Workspace error: there was a problem adding groups.");
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
                console.error(`Error editing group: response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(setSelectedWorkspaceGroup(data))
            }
        } catch (error) {
            console.error("Selected Workspace error: there was a problem editing groups.");
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
                console.error(`Error deleting group: response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(setSelectedWorkspaceGroup(data))
            }
        } catch (error) {
            console.error("Selected Workspace error: there was a problem deleting a group.");
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
                console.error(`Error adding account: response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(setSelectedWorkspaceAccount(data))
            }
        } catch (error) {
            console.error("Selected Workspace error: there was a problem adding accounts.");
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
                console.error(`Error editing account: response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(setSelectedWorkspaceAccount(data))
            }
        } catch (error) {
            console.error("Selected Workspace error: there was a problem editing accounts.");
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
                console.error(`Error deleting account: response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(setSelectedWorkspaceAccount(data))
            }
        } catch (error) {
            console.error("Selected Workspace error: there was a problem deleting a account.");
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
                console.error(`Error adding expense category: response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(setSelectedWorkspaceExpenseCategories(data))
            }
        } catch (error) {
            console.error("Selected Workspace error: there was a problem adding expense category.");
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
                console.error(`Error editing expense category: response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(setSelectedWorkspaceExpenseCategories(data))
            }
        } catch (error) {
            console.error("Selected Workspace error: there was a problem editing expense category.");
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
                console.error(`Error deleting expense category: response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(setSelectedWorkspaceExpenseCategories(data))
            }
        } catch (error) {
            console.error("Selected Workspace error: there was a problem deleting a expense category.");
        }
        dispatch(loaderOff());
    }
}

//*********** EXPENSE  NUMBERING ***********
//Setting expense numbering information
//Default numbering = YY-MM-Number
export const setSelectedWorkspaceExpenseNumbering = (selectedWorkspaceExpenseNumbering) => {
    if (!selectedWorkspaceExpenseNumbering || !Object.values(ExpenseNumberingFormat).includes(selectedWorkspaceExpenseNumbering)) {
        sessionStorage.setItem("selectedWorkspaceExpenseNumbering", ExpenseNumberingFormat.YYMMNum);
        return (dispatch) => {
            dispatch({
                type: ActionTypes.SET_SELECTED_EXPENSE_NUMBERING,
                selectedWorkspaceExpenseNumbering: ExpenseNumberingFormat.YYMMNum,
            })
        }
    };
    sessionStorage.setItem("selectedWorkspaceExpenseNumbering", JSON.stringify(selectedWorkspaceExpenseNumbering));
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_SELECTED_EXPENSE_NUMBERING,
            selectedWorkspaceExpenseNumbering: selectedWorkspaceExpenseNumbering
        })
    }
}

// Add expense category
export const addSelectedExpenseNumberingPreference = (workspaceUuid, selectedWorkspaceExpenseNumbering) => {
    store.dispatch(loaderOn())
    if(!selectedWorkspaceExpenseNumbering || !Object.values(ExpenseNumberingFormat).includes(selectedWorkspaceExpenseNumbering)){
        return console.error("Numbering format not supported.")// replace with proper error message
    }
    return async (dispatch) => {
        const requestData = {
            workspace_uuid: workspaceUuid,
            expense_numbering: selectedWorkspaceExpenseNumbering,
        };
        const config = getAuthHeader()
        try {
            const response = await api.post(APIURL.SET_EXPENSE_NUMBERING_FORMAT, requestData, config);

            if (response.status !== 200) {
                console.error(`Error setting expense numbering: response status ${response.status}.`);
            } else {
                const data = response.data;
                dispatch(setSelectedWorkspaceExpenseNumbering(data))
            }
        } catch (error) {
            console.error("Selected Workspace error: there was a problem setting expense numbering.");
        }
        dispatch(loaderOff());
    }
}