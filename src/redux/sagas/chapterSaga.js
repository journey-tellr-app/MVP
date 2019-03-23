import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// ant design import
import { message } from 'antd';

function* addExistingStoryChapter(action) {
    try {
        // tell the chapter route that the story exists so order is not assigned
        const newStory = false;
        // call to the chapter route and POST the added chapter
        yield axios.post(`chapter/${action.payload.storyId}/${newStory}`, action.payload.chapter);
        // refresh the story chapter detail with the added chapter
        yield put({type: 'GET_STORY_CHAPTER_DETAIL', payload: action.payload.storyId});
    } catch(error) {
        // console log and error message for addExistingStoryChapter
        console.log(`Error in addExistingStoryChapter: ${error}`);
        message.error('Error updating the chapter');
    }
}

function* changeChapterImage(action) {
    try {
        // package the image data
        let dataToSend = { image: action.payload.data.Location };
        // replace the old picture with the new picture
        const response = yield axios.put(`/chapter/image/${action.chapterId}`, dataToSend);
        // refresh the chapter detail with the added photo
        yield put({type: 'GET_STORY_CHAPTER_DETAIL', payload: response.data});
    } catch(error) {
        // error message when editing the chapter image
        console.log(`Error in changeChapterImage: ${error}`);
        message.error('Error when updating chapter image');
    }
}

function* chapterSaga() {
    yield takeLatest('ADD_EXISTING_STORY_CHAPTER', addExistingStoryChapter);
    yield takeLatest('ADD_IMAGE_CHAPTER', changeChapterImage);
}

export default chapterSaga;