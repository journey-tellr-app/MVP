const chapterReducer = (state = {}, action) => {
    if(action.type === 'SET_CHAPTER') {
        return action.payload;
    }
    return state;
}

export default chapterReducer;