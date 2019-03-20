import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import story from './storyReducer.js';
import template from './templateReducer.js';
import notification from './notificationReducer.js';
import chapter from './chapterReducer.js';
import contributor from './contributorReducer.js';
import storyDetail from './storyDetailReducer';
import searchResults from './searchResultsReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  story, // contains reducers for all the story pages
  template, // templates for assistance in creating a story
  notification, // list of user notifications
  chapter, // loads chapters for a story
  contributor, // list of app users to be contributors
  storyDetail,
  searchResults, //results back from server after search all stories
});

export default rootReducer;
