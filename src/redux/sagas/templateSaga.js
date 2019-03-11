import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* storyTemplate(action) {
  try {
    //gets template story id and name for dropdown
    //put 'SET_TEMPLATE_STORY_DROPDOWN'
    console.log('in storyTemplate');
    const response = yield axios.get('/template');
    console.log(response.data);
    const action = {type: 'SET_TEMPLATE_STORY_DROPDOWN', payload: response.data};
    yield put(action);
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

function* templateSaga() {
  yield takeLatest('GET_TEMPLATE_STORY', storyTemplate);
  yield takeLatest('GET_TEMPLATE_DETAILS', storyTemplateDetails);
}

export default templateSaga;
