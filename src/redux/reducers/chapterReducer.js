import { combineReducers } from 'redux';
import { Z_FILTERED } from 'zlib';

const chapterReducer = (state = {}, action) => {
    if(action.type === 'SET_CHAPTER') {
        return action.payload;
    }
    return state;
}

const initialNewStoryChapter = [ ];
const newStoryChapterReducer = (state = initialNewStoryChapter, action) => {
    if(action.type === 'ADD_NEW_STORY_CHAPTER') {
        return [...state, action.payload];
    } else if(action.type === 'REMOVE_NEW_STORY_CHAPTER') {
        let nextState = state.filter(newState => newState != action.payload);
        return nextState;
    } else if(action.type === 'RESET_NEW_STORY_CHAPTER') {
        return initialNewStoryChapter;
    }
    return state;
}

export default combineReducers({
    chapterReducer, // set the story chapters for viewing
    newStoryChapterReducer, // saves chapters added when creating a new story
});