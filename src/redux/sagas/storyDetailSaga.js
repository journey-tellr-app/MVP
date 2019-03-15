import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getIndividualStory(action) {
    try {
        // console.log('in getIndividualStory saga, action.payload: ', action.payload);
        const serverResponse = yield axios.get(`story/detail/${action.payload}`);
        yield put({ type: 'SET_STORY_DETAIL', payload: serverResponse.data });
    } catch (error) {
        console.log(`Error in getting individual story: ${error}`);
    }
}

//chapers
function* getChapterDetail(action) {
    try {
        const response = yield axios.get(`story/detail/chapter/${action.payload}`);
        yield put({ type: 'SET_STORY_DETAIL_CHAPTER', payload: response.data });
    } catch (error) {
        console.log(`Error in getChapterDetail saga:`, error);
    }
}

function* editChapter(action) {
    try{ 
        const response = yield axios.put(`/chapter`, action.payload);
        yield put({ type: 'GET_STORY_CHAPTER_DETAIL', payload: response.data[0].story_id });
    }catch(e){
        console.log('Error in editChapter saga:', e)
    }
}
//contributors
function* getStoryContributors(action) {
    try {
        // console.log('getStoryContributors action: ', action);
        const serverResponse = yield axios.get(`/story/detail/contributor/${action.payload}`);

        yield put({type: 'SET_STORY_DETAIL_CONTRIBUTOR', payload: serverResponse.data});
    } catch(e) {
        console.log(`Error getting story contributors: ${e}`);
    }
}
//likes

//post story?

function* storyDetailSaga() {
    yield takeLatest('GET_INDIVIDUAL_STORY', getIndividualStory);
    yield takeLatest('GET_STORY_CHAPTER_DETAIL', getChapterDetail);
    yield takeLatest('GET_STORY_CONTRIBUTORS', getStoryContributors);
    yield takeLatest('EDIT_CHAPTER', editChapter);
}

export default storyDetailSaga;