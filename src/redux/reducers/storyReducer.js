import { combineReducers } from 'redux';

//this reducer will return all the 
//stories a user is/has contributed to.
//To be used on the home page
const contributedStoryReducer = (state = [], action) => {
    if(action.type === 'SET_STORY_CONTRIBUTIONS') {
        return action.payload;
    }
    return state;
}

//This reducer will return the top 10 stories at the company.
//To be used on the home page.
const topStoriesReducer = (state = [], action) => {
    if(action.type === 'SET_TOP_STORIES') {
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

// initial value for newStoryReducer used to clear the reducer
const initialNewStory = {name: '', title: '', caption: '', placeholder_image: '', intro: ''};
const newStoryReducer = (state = initialNewStory, action) => {
    if(action.type === 'SET_NEW_STORY') {
        return action.payload;
    } else if(action.type === 'RESET_NEW_STORY') {
        return initialNewStory;
    }
    return state;
}

// initial value for newStoryReducer used to clear the reducer
const initialImage = {storyImage: "/images/placeholder.png"};
const imageReducer = (state = initialImage, action) => {
    if (action.type === 'ADD_IMAGE_STORY') {
        return {storyImage: action.payload.data.Location};
    } else if(action.type === 'RESET_IMAGE_STORY') {
        return initialImage;
    }
    return state;
}

const contributors = (state = [], action) => {
    // console.log(action);
    if (action.type === 'SET_CONTRIBUTORS') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    contributedStoryReducer, // used on the home page
    topStoriesReducer, //used the home page
    completeStoryReducer, // used for the main story view page
    searchStoryReducer, // for use with the search page
    userStoryReducer, // for an user profile story page
    newStoryReducer, // called when creating a new story
    imageReducer, //holds AWS image location
    contributors //this returns the names of all contributors to a story (for home page)
});