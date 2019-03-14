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
        return [...state, action.payload];
    } else if(action.type === 'REMOVE_NEW_STORY_CHAPTER') {
        let nextState = state.filter(newState => newState !== action.payload);
        return nextState;
    } else if(action.type === 'RESET_NEW_STORY_CHAPTER') {
        return initialNewStoryChapter;
    } else if(action.type === 'SET_TEMPLATE_NEW_STORY_CHAPTER') {
        return action.payload;
    } else if(action.type === 'UPDATE_NEW_STORY_CHAPTER') {
        let updatedChapter = updateObjectInArray(state, action.payload);
        return updatedChapter;
    }
    return state;
}

function updateObjectInArray(array, action) {
    return array.map((item, index) => {
      if (index !== action.id) {
        // This isn't the item we care about - keep it as-is
        return item
      }
  
      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...action.item
      }
    })
  }

export default combineReducers({
    chapterReducer, // set the story chapters for viewing
    newStoryChapterReducer, // saves chapters added when creating a new story
});