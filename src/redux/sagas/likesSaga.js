import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* likeContributedStory(action) {
    try {
        // console.log('in likeContributedStory saga, action.payload: ', action.payload);
        yield axios.post('/like', action.payload);
    } catch(error) {
        console.log(`Error in likeContributedStory saga: ${error}`);
    }
}

function* likeTopStory(action) {
    try {
        // console.log('in likeTopStory saga, action.payload: ', action.payload);
        yield axios.post('/like', action.payload);
    } catch(error) {
        console.log(`Error in likeTopStory saga: ${error}`);
    }
}

function* likesSaga() {
    yield takeLatest('LIKE_CONTRIBUTED_STORY', likeContributedStory);
    yield takeLatest('LIKE_TOP_STORY', likeTopStory);
}

export default likesSaga;