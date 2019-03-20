import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* likeContributedStory(action) {
    try {
        // console.log('in likeContributedStory saga, action.payload: ', action.payload);
<<<<<<< HEAD
        axios.post('/like', action.payload);
=======
        const serverResponse = yield axios.post('/like', action.payload);
>>>>>>> dbd0603ed888ec758519c8e4c2d3da844b576956
        yield put({ type: 'GET_MY_CONTRIBUTIONS'});
        
    } catch(error) {
        console.log(`Error in likeContributedStory saga: ${error}`);
    }
}

function* likeTopStory(action) {
    try {
        // console.log('in likeTopStory saga, action.payload: ', action.payload);
<<<<<<< HEAD
        axios.post('/like', action.payload);
=======
        const serverResponse = yield axios.post('/like', action.payload);
>>>>>>> dbd0603ed888ec758519c8e4c2d3da844b576956
        yield put({ type: 'GET_TOP_STORIES'});

    } catch(error) {
        console.log(`Error in likeTopStory saga: ${error}`);
    }
}

function* likesSaga() {
    yield takeLatest('LIKE_CONTRIBUTED_STORY', likeContributedStory);
    yield takeLatest('LIKE_TOP_STORY', likeTopStory);
}

export default likesSaga;