import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// ant design import
import { message } from 'antd';

function* likeContributedStory(action) {
    try {
        yield axios.post('/like', action.payload);
        yield put({ type: 'GET_MY_CONTRIBUTIONS'});
    } catch(error) {
        console.log(`Error in likeContributedStory saga: ${error}`);
        message.error('Error getting likes for my contributed stories');
    }
}

function* likeTopStory(action) {
    try {
        yield axios.post('/like', action.payload);
        yield put({ type: 'GET_TOP_STORIES'});
    } catch(error) {
        console.log(`Error in likeTopStory saga: ${error}`);
        message.error('Error liking the top stories');
    }
}

function* likesSaga() {
    yield takeLatest('LIKE_CONTRIBUTED_STORY', likeContributedStory);
    yield takeLatest('LIKE_TOP_STORY', likeTopStory);
}

export default likesSaga;