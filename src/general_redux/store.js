import isLoggedInReducer from './reducer';
import { createStore, combineReducers } from 'redux'
// import { signIn, signOut } from './actions';
// import { useSelector, useDispatch } from "react-redux"

//redux: https://www.youtube.com/watch?v=CVpUuw9XSjY
const allReducers = combineReducers({
    isLoggedIn: isLoggedInReducer,
})
const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// store.subscribe(()=>console.log(store.getState()))
// store.dispatch(signIn())
// store.dispatch(signOut())
// store.dispatch(signIn())


export default store;
// store is imported in App.js --------------min 32