const userStoryReducer = (state = {}, action) => {
    if(action.type === 'SET_USER_STORY') {
        return action.payload;
    }
    return state;
}

export default userStoryReducer;