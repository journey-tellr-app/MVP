import { combineReducers } from 'redux';

const templateReducer = ( state = [], action ) => {
    // console.log(`in templateReducer: ${action.type}`);
    if(action.type === 'SET_TEMPLATE') {
        return action.payload;
    } else if(action.type === 'SET_TEMPLATE_STORY_DROPDOWN') {
        return action.payload;
    }
    return state;
}

// initial value for newStoryReducer used to clear the reducer
const initialTemplateNewStory = {name: '', title: '', caption: '', placeholder_image: '', intro: ''};
const templateNewStoryReducer = (state = initialTemplateNewStory, action) => {
    if(action.type === 'SET_TEMPLATE_NEW_STORY') {
        return action.payload;
    } else if(action.type === 'SET_TEMPLATE_NEW_CREATE') {
        return {name: 'initial'};
    } else if(action.type === 'RESET_TEMPLATE_NEW_STORY') {
        return initialTemplateNewStory;
    }
    return state;
}

// initial value for initialTemplateChapter used to clear the reducer
const initialTemplateNewChapter = [];
const templateNewChapterReducer = (state = initialTemplateNewChapter, action) => {
    if(action.type === 'SET_TEMPLATE_NEW_CHAPTER') {
        return action.payload;
    } else if(action.type === 'RESET_TEMPLATE_NEW_CHAPTER') {
        return initialTemplateNewChapter;
    }
    return state;
}

export default combineReducers({
    templateReducer, // used to set the dropdown
    templateNewStoryReducer, // sets story details from a template
    templateNewChapterReducer, // sets chapter details from a template
});