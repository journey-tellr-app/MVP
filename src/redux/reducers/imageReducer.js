const imageReducer = (state = { visible: true }, action) => {
    if (action.type === 'UPDATE_PICTURE') {
        return action.payload;
    }
    return state;
}

export default imageReducer;