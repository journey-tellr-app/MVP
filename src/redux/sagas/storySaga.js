import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMyContributions(action) {
    try {
        console.log('in getMyContributions', action);
        const serverResponse = yield axios.get('story/story-contributions');
    
        yield put({type: 'SET_STORY_CONTRIBUTIONS', payload: serverResponse.data});
        
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

function* getIndividualStory(action) {
    try {
        console.log('in getIndividualStory saga, action.payload: ', action.payload);
        const serverResponse = yield axios.get(`story/detail/${action.payload}`);
        
        yield put({type: 'SET_STORY_DETAIL', payload: serverResponse.data});

    } catch(error) {
        console.log(`Error in getting individual story: ${error}`);
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

function* storyTemplateDetails(action) {
    try {
        //get template story details 
        //put template details in reducer for use in autofilling out create story form
    } catch (error) {
        console.log('Error with storyTemplateDetails:', error);
    }
}

function* storySaga() {
    yield takeLatest('GET_MY_CONTRIBUTIONS', getMyContributions);
    yield takeLatest('GET_STORIES', getStories);
    yield takeLatest('GET_TEMPLATE_STORY', storyTemplate);
    yield takeLatest('GET_TEMPLATE_DETAILS', storyTemplateDetails);
    yield takeLatest('GET_INDIVIDUAL_STORY', getIndividualStory);
}

export default storySaga;