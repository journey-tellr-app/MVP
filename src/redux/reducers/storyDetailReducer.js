import { combineReducers } from 'redux';

const contributedStoryReducer = (state = [], action) => {
    if (action.type === 'SET_STORY_CONTRIBUTIONS') {
        return action.payload;
    }
    return state;
}

//this will return a single story detail on the
//existing-story/:id page
const summary = (state = [], action) => {
    if (action.type === 'SET_STORY_DETAIL') {
        return action.payload;
    }
    return state;
}

const likes = (state = [], action) => {
    if (action.type === 'SET_STORY_DETAIL_LIKES') {
        return action.payload;
    }
    return state;
}

//this will return all of the contributors to a particular story
const contributor = (state = [], action) => {
    if (action.type === 'SET_STORY_DETAIL_CONTRIBUTOR') {
        return action.payload;
    }
    return state;
}

const chapter = (state = [], action) => {
    if (action.type === 'SET_STORY_DETAIL_CHAPTER') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    contributedStoryReducer, 
    summary,
    likes,
    contributor,
    chapter,
});