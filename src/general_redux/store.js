import isLoggedInReducer from './reducer';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

//advanced store setup: https://github.com/reduxjs/redux-devtools/tree/main/extension#installation
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allReducers = combineReducers({
    isLoggedIn: isLoggedInReducer,
})
const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;