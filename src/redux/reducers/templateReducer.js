import { combineReducers } from 'redux';

const templateReducer = ( state = [], action ) => {
    console.log(`in templateReducer: ${action.type}`);
    if(action.type === 'SET_TEMPLATE') {
        return action.payload;
    } else if(action.type === 'SET_TEMPLATE_STORY_DROPDOWN') {
        return action.payload;
    }
    return state;
}


const newTemplateStoryReducer = (state = {}, action) => {
    if(action.type === 'SET_TEMPLATE_NEW_STORY') {
        return action.payload;
    }
    return state;
}

const newTemplateChapterReducer = (state = [], action) => {
    if(action.type === 'SET_TEMPLATE_NEW_CHAPTER') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    templateReducer, // used to set the dropdown
    newTemplateStoryReducer, // sets story details from a template
    newTemplateChapterReducer, // sets chapter details from a template
});