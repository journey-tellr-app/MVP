import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* storyTemplate(action) {
  try {
    //gets template story id and name for dropdown
    const response = yield axios.get('/template');
    const action = {type: 'SET_TEMPLATE_STORY_DROPDOWN', payload: response.data};
    yield put(action);
  } catch (error) {
    console.log('Error with storyTemplate:', error);
  }
}

function* templateSaga() {
  yield takeLatest('GET_TEMPLATE_STORY', storyTemplate);
}

export default templateSaga;
