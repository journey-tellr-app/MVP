import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// ant design import
import { message } from 'antd';

// get stories searching by author
function* getStoriesAuthor(action) {
    try {
        // console.log('in gSA');
        // call to the database for getting stories
        const serverResponse = yield axios.get(`/search-story/author/${action.payload}`);
        yield put({ type: 'SET_STORY_SEARCH_RESULTS', payload: serverResponse.data });
    } catch (error) {
        // error message when trying to add a story
        console.log(`getStoriesAuthor failed: ${error}`);
        message.error('Error serching by author');
    }
}
function* getStoriesTitle(action) {
    try {
        // console.log('in gST');
        
        // call to the database for getting stories
        const serverResponse = yield axios.get(`/search-story/title/${action.payload}`);
        yield put({ type: 'SET_STORY_SEARCH_RESULTS', payload: serverResponse.data });
    } catch (error) {
        // error message when trying to add a story
        console.log(`getStoriesAuthor failed: ${error}`);
        message.error('Error serching by title');
    }
}
function* getStoriesDescription(action) {
    try {
        // console.log('in gSD');
        // call to the database for getting stories
        const serverResponse = yield axios.get(`/search-story/description/${action.payload}`);
        yield put({ type: 'SET_STORY_SEARCH_RESULTS', payload: serverResponse.data });
    } catch (error) {
        // error message when trying to add a story
        console.log(`getStoriesAuthor failed: ${error}`);
        message.error('Error serching by description');
    }
}

function* searchStorySaga() {
    yield takeLatest('GET_SEARCH_STORIES_AUTHOR', getStoriesAuthor);
    yield takeLatest('GET_SEARCH_STORIES_TITLE', getStoriesTitle);
    yield takeLatest('GET_SEARCH_STORIES_DESCRIPTION', getStoriesDescription);
}

export default searchStorySaga;