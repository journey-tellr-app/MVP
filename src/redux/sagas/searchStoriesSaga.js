import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// get stories searching by author
function* getStoriesAuthor(action) {
    try {
        // call to the database for getting a story
        const serverResponse = yield axios.get(`/story/detail/contributor/${action.payload}`);        // console.log(`Server response: ${response.data}`);
        // yield axios.post(`/chapter/${response.data}`, action.payload.chapter);
    } catch (error) {
        // error message when trying to add a story
        console.log(`getStoriesAuthor failed: ${error}`);
    }
}

function* searchStorySaga() {
    yield takeLatest('GET_SEARCH_STORIES_AUTHOR', getStoriesAuthor);

}

export default searchStorySaga;