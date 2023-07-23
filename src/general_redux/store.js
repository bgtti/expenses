import { isLoggedInReducer, workspacesReducer } from './SignAndLogIn/reducer';
// import workspacesReducer from './Workspace/reducer';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

//advanced store setup: https://github.com/reduxjs/redux-devtools/tree/main/extension#installation
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
    isLoggedIn: isLoggedInReducer,
    allWorkspaces: workspacesReducer,
})
const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;