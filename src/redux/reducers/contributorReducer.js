const contributorReducer = (state = {}, action) => {
    if(action.type === 'SET_CONTRIBUTOR') {
        return action.payload;
    }
    return state;
}

export default contributorReducer;