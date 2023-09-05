export const loaderReducer = (state = {loaderDisplayed: false}, action) => {
    switch(action.type){
        case 'LOADER_ON':
            return {
                loaderDisplayed: true
            };
        case 'LOADER_OFF':
            return {
                loaderDisplayed: false
            };
        default:
            return state;
    }
}