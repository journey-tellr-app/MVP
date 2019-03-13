import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMyContributions(action) {
    try {
        console.log('in getMyContributions', action);
        const serverResponse = yield axios.get('story/story-contributions');
    
        yield put({type: 'SET_STORY', payload: serverResponse.data});
        
    } catch(error) {
        console.log(`Error in getMyContributions: ${error}`);
    }
}

function* getStories(action) {
    try {
        console.log('in getStories' );
        const serverResponse = yield axios.get('story/recent');

        yield put({type: 'SET_TOP_STORIES', payload: serverResponse.data});

    } catch(error) {
        console.log(`Error in getStories: ${error}`);
    }
}

function* storyTemplate(action) {
    try {
        //gets template story id and name for dropdown
        //put 'SET_TEMPLATE_STORY_DROPDOWN' 
    } catch (error) {
        console.log('Error with storyTemplate:', error);
    }
}

// get the story and chapter details from a template then set the reducers
function* storyTemplateDetails(action) {
    try {
      // get template story details 
      const response = yield axios.get(`/template/story/${action.payload}`);
      // set the template story
      const nextAction = {type: 'SET_NEW_STORY', payload: response.data};
      yield put(nextAction);
      // get chapter details for a story
      const chapterResponse = yield axios.get(`/template/chapter/${action.payload}`);
      // set the chapter details
      const chapterAction = {type: 'SET_TEMPLATE_NEW_STORY_CHAPTER', payload: chapterResponse.data};
      yield put(chapterAction);
    } catch (error) {
      console.log('Error with storyTemplateDetails:', error);
    }
}

// send a new story to the server
function* addAStory(action) {
    try {
        // call to the database for adding a story
        yield axios.post('/story', action.payload);
    } catch (error) {
        // error message when trying to add a story
        console.log(`Add story failed: ${error}`);
    }
}

function* storySaga() {
    yield takeLatest('GET_MY_CONTRIBUTIONS', getMyContributions);
    yield takeLatest('GET_STORIES', getStories);
    yield takeLatest('GET_TEMPLATE_STORY', storyTemplate);
    yield takeLatest('GET_TEMPLATE_DETAILS', storyTemplateDetails);
    yield takeLatest('ADD_NEW_STORY', addAStory);
}

export default storySaga;