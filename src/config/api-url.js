const LOGIN = '/api/account/login';
const SIGNUP = '/api/account/register';
const DELETE_USER_ACCOUNT = '/api/account/delete';
const ADD_WORKSPACE = '/api/workspace/add_workspace';
const EDIT_WORKSPACE = '/api/workspace/edit_workspace';
const DELETE_WORKSPACE = '/api/workspace/delete_workspace';
const GET_WORKSPACE_SETTINGS = '/api/workspace_settings/all_settings'
const ADD_GROUP = '/api/workspace_settings/add_group';
const EDIT_GROUP = '/api/workspace_settings/edit_group';
const DELETE_GROUP = '/api/workspace_settings/delete_group';
const ADD_SUBGROUP = '/api/workspace_settings/add_subgroup';
const EDIT_SUBGROUP = '/api/workspace_settings/edit_subgroup';
const DELETE_SUBGROUP = '/api/workspace_settings/delete_subgroup';
const ADD_ACCOUNT = '/api/workspace_settings/add_account';
const ADD_TAG = '/api/workspace_settings/add_tag';
const EDIT_TAG = '/api/workspace_settings/edit_tag';
const DELETE_TAG = '/api/workspace_settings/delete_tag';
const EDIT_ACCOUNT = '/api/workspace_settings/edit_account';
const DELETE_ACCOUNT = '/api/workspace_settings/delete_account'; //Accounts from WS, not user's account
const ADD_EXPENSE_CATEGORY = '/api/workspace_settings/add_expense_category';
const EDIT_EXPENSE_CATEGORY = '/api/workspace_settings/edit_expense_category';
const DELETE_EXPENSE_CATEGORY = '/api/workspace_settings/delete_expense_category';
const SET_EXPENSE_NUMBERING_FORMAT = '/api/workspace_settings/set_expense_numbering_format';

const APIURL = {
    LOGIN,
    SIGNUP,
    DELETE_USER_ACCOUNT, //User's account deletion
    ADD_WORKSPACE,
    EDIT_WORKSPACE,
    DELETE_WORKSPACE,
    GET_WORKSPACE_SETTINGS,
    ADD_GROUP,
    EDIT_GROUP,
    DELETE_GROUP,
    ADD_SUBGROUP,
    EDIT_SUBGROUP,
    DELETE_SUBGROUP,
    ADD_ACCOUNT, //Accounts from WS, not user's account
    EDIT_ACCOUNT, //Accounts from WS, not user's account
    DELETE_ACCOUNT, //Accounts from WS, not user's account
    ADD_TAG,
    EDIT_TAG,
    DELETE_TAG,
    ADD_EXPENSE_CATEGORY,
    EDIT_EXPENSE_CATEGORY,
    DELETE_EXPENSE_CATEGORY,
    SET_EXPENSE_NUMBERING_FORMAT
}

export default APIURL