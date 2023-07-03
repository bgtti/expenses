const checkAccessToken = () => {
    const token = sessionStorage.getItem("access_token");
    if (token && token !== undefined && token !== ""){
        return { loggedIn: true, token };
    } else {
        return { loggedIn: false, token: undefined };
    }
};

const isLoggedInInitialState = checkAccessToken();

const isLoggedInReducer = (state = isLoggedInInitialState, action) => {
    switch(action.type){
        case 'LOG_IN':
            return {
                loggedIn: true,
                token: action.token
            };
        case 'LOG_OUT':
            return {
                loggedIn: false,
                token: undefined
            };
        default:
            return state;
    }
};

export default isLoggedInReducer;