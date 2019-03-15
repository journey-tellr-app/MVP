import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// get stories searching by author
function* getStoriesAuthor(action) {
    try {
        // call to the database for getting stories
        const serverResponse = yield axios.get(`/search-story/${action.payload}`);
        yield put({ type: 'SET_STORY_SEARCH_RESULTS', payload: serverResponse.data });
    } catch (error) {
        // error message when trying to add a story
        console.log(`getStoriesAuthor failed: ${error}`);
    }
}
function* getStoriesTitle(action) {
    try {
        // call to the database for getting stories
        const serverResponse = yield axios.get(`/search-story/${action.payload}`);
        yield put({ type: 'SET_STORY_SEARCH_RESULTS', payload: serverResponse.data });
    } catch (error) {
        // error message when trying to add a story
        console.log(`getStoriesAuthor failed: ${error}`);
    }
}
function* getStoriesDescription(action) {
    try {
        // call to the database for getting stories
        const serverResponse = yield axios.get(`/search-story/${action.payload}`);
        yield put({ type: 'SET_STORY_SEARCH_RESULTS', payload: serverResponse.data });
    } catch (error) {
        // error message when trying to add a story
        console.log(`getStoriesAuthor failed: ${error}`);
    }
}

function* searchStorySaga() {
    yield takeLatest('GET_SEARCH_STORIES_AUTHOR', getStoriesAuthor);
    yield takeLatest('GET_SEARCH_STORIES_TITLE', getStoriesTitle);
    yield takeLatest('GET_SEARCH_STORIES_DESCRIPTION', getStoriesDescription);
}

export default searchStorySaga;