const notificationReducer = (state = {}, action) => {
    if(action.type === 'SET_NOTIFICATION') {
        return action.payload;
    }
    return state;
}

export default notificationReducer;