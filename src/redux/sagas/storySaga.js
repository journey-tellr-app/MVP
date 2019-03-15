import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMyContributions(action) {
    try {
        // console.log('in getMyContributions', action);
        const serverResponse = yield axios.get('story/story-contributions');
    
        yield put({type: 'SET_STORY_CONTRIBUTIONS', payload: serverResponse.data});
        
    } catch(error) {
        console.log(`Error in getMyContributions: ${error}`);
    }
}

function* getTopStories(action) {
    try {
        // console.log('in getTopStories' );
        const serverResponse = yield axios.get('story/recent');

        yield put({type: 'SET_TOP_STORIES', payload: serverResponse.data});

    } catch(error) {
        console.log(`Error in getStories: ${error}`);
    }
}

function* storyTemplate(action) {
    try {
        yield console.log('in storyTemplate saga:') 
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
        // POST a new story and get back the story id from the server
        const response = yield axios.post('/story', action.payload.story);
        // tell the chapter route that the story is new so order is assigned
        const newStory = true;
        // send a POST request for all chapter data associated with the new story
        yield axios.post(`/chapter/${response.data}/${newStory}`, action.payload.chapter);
        // add all contributors associated with a story to the server
        yield axios.post(`/invite/contributor/${response.data}`, action.payload.contributor);
        // clear the new story reducers
        const nextAction = {type: 'CLEAR_NEW_STORY'};
        yield put(nextAction);
    } catch (error) {
        // error message when trying to add a story
        console.log(`Add story failed: ${error}`);
    }
}

// reset story, chapter and contributor to initial values
function* clearNewStory() {
    try {
        const storyAction = {type: 'RESET_NEW_STORY'};
        yield put(storyAction);
        const chapterAction = {type: 'RESET_NEW_STORY_CHAPTER'};
        yield put(chapterAction);
        const contributorAction = {type: 'RESET_PENDING_CONTRIBUTOR'};
        yield put(contributorAction);
    } catch (error) {
        // error message when clearing new story inputs
        console.log(`Error in clearNewStory saga: ${error}`);
    }
}

function* storySaga() {
    yield takeLatest('GET_MY_CONTRIBUTIONS', getMyContributions);
    yield takeLatest('GET_TOP_STORIES', getTopStories);
    yield takeLatest('GET_TEMPLATE_STORY', storyTemplate);
    yield takeLatest('GET_TEMPLATE_DETAILS', storyTemplateDetails);
    yield takeLatest('ADD_NEW_STORY', addAStory);
    yield takeLatest('CLEAR_NEW_STORY', clearNewStory);
}

export default storySaga;