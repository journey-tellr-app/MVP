import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMyContributions(action) {
    try {
        console.log('in getMyContributions', action);
        const serverResponse = yield axios.get('story/story-contributions', action.payload);
    
        yield put({type: 'SET_STORY', payload: serverResponse.data});
        
    } catch(error) {
        console.log(`Error in getMyContributions: ${error}`);
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
    yield takeLatest('GET_TEMPLATE_STORY', storyTemplate);
    yield takeLatest('GET_TEMPLATE_DETAILS', storyTemplateDetails);
}

export default storySaga;