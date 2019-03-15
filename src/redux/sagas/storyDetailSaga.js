import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getIndividualStory(action) {
    try {
        console.log('in getIndividualStory saga, action.payload: ', action.payload);
        const serverResponse = yield axios.get(`story/detail/${action.payload}`);

        yield put({ type: 'SET_STORY_DETAIL', payload: serverResponse.data });

    } catch (error) {
        console.log(`Error in getting individual story: ${error}`);
    }
}
//chapers

//contributors
function* getStoryContributors(action) {
    try {
        console.log('getStoryContributors action: ', action);
        const serverResponse = yield axios.get(`/story/detail/contributor/${action.payload}`);

        yield put({ type: 'SET_STORY_DETAIL_CONTRIBUTOR', payload: serverResponse.data });
    } catch (e) {
        console.log(`Error getting story contributors: ${e}`);
    }
}
//likes
function* getStoryLikes(action) {
    try {
        console.log('getStoryLikes action: ', action);
        const serverResponse = yield axios.get(`/story/detail/likes${action.payload}`);

        yield put({ type: 'SET_STORY_DETAIL_LIKES', payload: serverResponse.data });
    } catch (e) {
        console.log(`Error getting story contributors: ${e}`);
    }
    let nextAction = {
        type: action.nextType
    }
    yield put(nextAction);
}

//post story?

function* storyDetailSaga() {
    yield takeLatest('GET_INDIVIDUAL_STORY', getIndividualStory);
    yield takeLatest('GET_STORY_CONTRIBUTORS', getStoryContributors);
    yield takeLatest('GET_STORY_LIKES', getStoryLikes);

}

export default storyDetailSaga;