import { combineReducers } from 'redux';

const chapterReducer = (state = {}, action) => {
    if(action.type === 'SET_CHAPTER') {
        return action.payload;
    }
    return state;
}

const initialNewStoryChapter = [];
const newStoryChapterReducer = (state = initialNewStoryChapter, action) => {
    if(action.type === 'SET_NEW_STORY_CHAPTER') {
        return action.payload;
    } else if(action.type === 'REMOVE_NEW_STORY_CHAPTER') {
        let nextState = state.filter(newState => newState !== action.payload);
        return nextState;
    } else if(action.type === 'RESET_NEW_STORY_CHAPTER') {
        return initialNewStoryChapter;
    } else if(action.type === 'UPDATE_NEW_STORY_CHAPTER') {
        let updatedChapter = updateChapterInStory(state, action.payload);
        return updatedChapter;
    }
    return state;
}

// function will only update a specific chapter in the reducer
function updateChapterInStory(array, action) {
    return array.map((item, index) => {
        if (index !== action.id) {
            // This isn't the item we care about - keep it as-is
            return item
        }
        // Otherwise, this is the one we want - return an updated value
        return {...item,...action.item}
    });
  }

export default combineReducers({
    chapterReducer, // set the story chapters for viewing
    newStoryChapterReducer, // saves chapters added when creating a new story
});