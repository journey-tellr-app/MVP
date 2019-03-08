const templateReducer = ( state = {}, action ) => {
    if(action.payload === 'SET_TEMPLATE') {
        return action.payload;
    }
    return state;
}

export default templateReducer;