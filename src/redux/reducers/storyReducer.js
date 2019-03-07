import { combineReducers } from 'redux';

const storyReducer = (state = [], action) => {
    if(action.type === 'SET_STORY') {
        return action.payload;
    }
    return state;
}

const completeStoryReducer = (state = [], action) => {
    if(action.type === 'SET_COMPLETE_STORY') {
        return action.payload;
    }
    return state;
}

const searchStoryReducer = (state = [], action) => {
    if(action.type === 'SET_SEARCH_STORY') {
        return action.payload;
    }
    return state;
}

const userStoryReducer = (state = [], action) => {
    if(action.type === 'SET_USER_STORY') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    storyReducer, // used on the home page
    completeStoryReducer, // used for the main story view page
    searchStoryReducer, // for use with the search page
    userStoryReducer, // for an user profile story page
});