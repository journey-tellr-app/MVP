import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// ant design import
import { message } from 'antd';

function* storyTemplate(action) {
  try {
    //gets template story id and name for dropdown
    const response = yield axios.get('/template');
    const action = {type: 'SET_TEMPLATE_STORY_DROPDOWN', payload: response.data};
    yield put(action);
  } catch (error) {
    console.log('Error with storyTemplate:', error);
    message.error('There was a problem when setting the templates');
  }
}

// get the story and chapter details from a template then set the reducers
function* storyTemplateDetails(action) {
  try {
      // get template story details 
      const response = yield axios.get(`/template/story/${action.payload}`);
      // set the template story
      const nextAction = { type: 'SET_TEMPLATE_NEW_STORY', payload: response.data };
      yield put(nextAction);
      // get chapter details for a story
      const chapterResponse = yield axios.get(`/template/chapter/${action.payload}`);
      // set the chapter details
      const chapterAction = { type: 'SET_TEMPLATE_NEW_CHAPTER', payload: chapterResponse.data };
      yield put(chapterAction);
  } catch (error) {
      console.log('Error with storyTemplateDetails:', error);
      message.error('There was a problem using the story template');
  }
}

function* templateSaga() {
  yield takeLatest('GET_TEMPLATE_STORY', storyTemplate);
  yield takeLatest('GET_TEMPLATE_DETAILS', storyTemplateDetails);
}

export default templateSaga;
