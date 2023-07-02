const isLoggedInReducer = (state = false, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return true;
        case 'SIGN_OUT':
            return false;
        case 'LOG_IN':
            return true;
        case 'LOG_OUT':
            return false;
        default:
            return false;
    }
};

export default isLoggedInReducer;