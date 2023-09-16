import { isLoggedInReducer } from './SignAndLogIn/reducer';
import { workspacesReducer } from './UserSettingsWorkspaces/reducer';
import { workspaceReducer } from './Workspace/reducer';
import { loaderReducer } from './Loader/reducer';
import { invitesReducer } from './Invites/reducer'
// import workspacesReducer from './Workspace/reducer';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

//advanced store setup: https://github.com/reduxjs/redux-devtools/tree/main/extension#installation
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
    isLoggedIn: isLoggedInReducer,
    allWorkspaces: workspacesReducer,
    selectedWorkspace: workspaceReducer,
    loaderDisplay: loaderReducer,
    allInvites: invitesReducer,
})
const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;