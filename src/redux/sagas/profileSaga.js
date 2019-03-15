import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getStats(action) {
    try {
        //gets story and contribution stats by counting tables
        yield console.log('in getStats with action:', action)
    } catch (error) {
        console.log('Error with getStats:', error);
    }
}

function* editProfile(action) {
    try {
        yield axios.put(`/api/user/update-profile`, action.payload);
        yield put({ type: "FETCH_USER", });
    } catch (error) {
        console.log('Error with editProfile:', error);
    }
}

function* profileSaga() {
    yield takeLatest('GET_TEMPLATE_STORY', getStats);
    yield takeLatest('EDIT_PROFILE', editProfile);
}

export default profileSaga;
