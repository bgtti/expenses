import { createStore } from 'redux';

const whateverReducer = (state={theKey: 0}, action) =>{
    if (action.type === 'something'){
        //return something like:
        return {
            theKey: state.theKey + 1
        }
    } //else:
    return {
        theKey: state.theKey + action.amount,
    };
}

const store = createStore(whateverReducer);

export default store;

// now in index.js: import {Provider} from 'react-redux; import store from '.store/index';
// this: root.render(<Provider store={store}><App/></Provider>;)

//then in the component we want to use this, we can import either useStore or useSelector, like so:
// import {use Selector, useDispatch} from 'react-redux';

//inside the component:
// const dispatch = useDispatch();
// const theKeyWeWant = useSelector(state => state.theKey);
// const whatEvHandler = () => {
// dispatch({type: 'something'})
// }

// const whatev2Handler = (){
//  dispatch({type: 'whatev', amount:5})
//}


//....
// ... <div>{theKeyWeWant}

//<button onClick={whatEvHandler}>
//<button onClick={whatev2Handler}>


/// with multiple values:
//const initialState = {counter:0, showCounter: true};
//const whateverReducer = (state=initialState, action) = {...}

