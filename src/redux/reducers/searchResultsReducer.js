const searchResults = (state = [], action) => {
    switch (action.type) {
        case ('SET_STORY_SEARCH_RESULTS'):
            return action.payload;
        default:
            return state;
    }
}

export default searchResults;
