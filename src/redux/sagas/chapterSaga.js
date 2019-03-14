import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addExistingStoryChapter(action) {
    try {
        // call to the chapter route and POST the added chapter
        yield axios.post(`chapter/${action.payload.storyId}`, action.payload.chapter);
        // refresh the story chapter detail with the added chapter
        yield put({type: 'GET_STORY_CHAPTER_DETAIL', payload: action.payload.storyId});   
    } catch(error) {
        console.log(`Error in addExistingStoryChapter: ${error}`);
    }
}

function* chapterSaga() {
    yield takeLatest('ADD_EXISTING_STORY_CHAPTER', addExistingStoryChapter);
    
}

export default chapterSaga;