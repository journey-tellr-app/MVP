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

// moved to storyReducer
// // initial value for newTemplateStoryReducer used to clear the reducer
// const initialTemplateStory = {name:'', title:'',caption:'', placeholder_image:'',};
// const newTemplateStoryReducer = (state = initialTemplateStory, action) => {
//     if(action.type === 'SET_TEMPLATE_NEW_STORY') {
//         return action.payload;
//     } else if(action.type === 'RESET_TEMPLATE_NEW_STORY') {
//         return initialTemplateStory;
//     }
//     return state;
// }

// moved to chapterReducer
// // initial value for initialTemplateChapter used to clear the reducer
// const initialTemplateChapter = [];
// const newTemplateChapterReducer = (state = initialTemplateChapter, action) => {
//     if(action.type === 'SET_TEMPLATE_NEW_CHAPTER') {
//         return action.payload;
//     } else if(action.type === 'RESET_TEMPLATE_NEW_CHAPTER') {
//         return initialTemplateChapter;
//     }
//     return state;
// }

export default combineReducers({
    templateReducer, // used to set the dropdown
    // newTemplateStoryReducer, // sets story details from a template
    // newTemplateChapterReducer, // sets chapter details from a template
});