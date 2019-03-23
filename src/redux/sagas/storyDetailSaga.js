import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// ant design import
import { message } from 'antd';

function* getIndividualStory(action) {
    try {
        console.log('in getIndividualStory saga, action.payload: ', action.payload);
        const serverResponse = yield axios.get(`story/detail/summary/${action.payload}`);
        yield put({ type: 'SET_STORY_DETAIL', payload: serverResponse.data });
    } catch (error) {
        console.log(`Error in getting individual story: ${error}`);
        message.error('Error loading a story');
    }
}

//chapers
function* getChapterDetail(action) {
    try {
        const response = yield axios.get(`story/detail/chapter/${action.payload}`);
        yield put({ type: 'SET_STORY_DETAIL_CHAPTER', payload: response.data });
    } catch (error) {
        console.log(`Error in getChapterDetail saga:`, error);
        message.error('Error loading the chapter detail');
    }
}

function* editChapter(action) {
    try {
        const response = yield axios.put(`/chapter`, action.payload);
        yield put({ type: 'GET_STORY_CHAPTER_DETAIL', payload: response.data[0].story_id });
    }catch(e){
        console.log('Error in editChapter saga:', e);
        message.error('Error in chapter edit');
    }
}

function* editStory(action) {
    try {
        yield axios.put('/story', action.payload);
        yield put({ type: 'GET_INDIVIDUAL_STORY', payload: action.payload.id })
    } catch (e) {
        console.log('Error in editStory saga:', e);
        message.error('Error in story edit');
    }
}

//contributors
function* getStoryContributors(action) {
    try {
        // console.log('getStoryContributors action: ', action);
        const serverResponse = yield axios.get(`/story/detail/contributor/${action.payload}`);

        yield put({ type: 'SET_STORY_DETAIL_CONTRIBUTOR', payload: serverResponse.data });
    } catch (e) {
        console.log(`Error getting story contributors: ${e}`);
        message.error('Error getting the story contributors');
    }
}

//likes for individual stories
function* getStoryLikes(action) {
    try {
        console.log('getStoryLikes action: ', action);
        const serverResponse = yield axios.get(`/story/detail/likes/${action.payload}`, action.payload);

        yield put({ type: 'SET_STORY_DETAIL_LIKES', payload: serverResponse.data });
    } catch (e) {
        console.log(`Error getting story likes: ${e}`);
        message.error('Error getting story likes');
    }
}

//completes story making it uneditable
function* completeStory(action) {
    try {
        const storyId = action.payload;
        yield axios.put(`/story/complete/${storyId}`);
        yield put({ type: 'GET_INDIVIDUAL_STORY', payload: storyId })
    } catch (e) {
        console.log('Error finalizing story:', e)
    }
}


function* storyDetailSaga() {
    yield takeLatest('GET_INDIVIDUAL_STORY', getIndividualStory);
    yield takeLatest('GET_STORY_CHAPTER_DETAIL', getChapterDetail);
    yield takeLatest('GET_STORY_CONTRIBUTORS', getStoryContributors);
    yield takeLatest('EDIT_CHAPTER', editChapter);
    yield takeLatest('EDIT_STORY', editStory);
    yield takeLatest('GET_STORY_LIKES', getStoryLikes);
    yield takeLatest('COMPLETE_STORY', completeStory);
}

export default storyDetailSaga;