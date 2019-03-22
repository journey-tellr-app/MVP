import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addExistingStoryChapter(action) {
    try {
        // tell the chapter route that the story exists so order is not assigned
        const newStory = false;
        // call to the chapter route and POST the added chapter
        console.log(action);
        yield axios.post(`chapter/${action.payload.storyId}/${newStory}`, action.payload.chapter);
        // refresh the story chapter detail with the added chapter
        yield put({type: 'GET_STORY_CHAPTER_DETAIL', payload: action.payload.storyId});   
    } catch(error) {
        console.log(`Error in addExistingStoryChapter: ${error}`);
    }
}

function* changeChapterImage(action) {
    try {

    } catch(error) {
        // error message when editing the chapter image
        console.log(`Error in changeChapterImage: ${error}`);
    }
}

function* chapterSaga() {
    yield takeLatest('ADD_EXISTING_STORY_CHAPTER', addExistingStoryChapter);
    yield takeLatest('ADD_IMAGE_CHAPTER', changeChapterImage);
}

export default chapterSaga;