import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getInvites(action) {
    try {
        const response = yield axios.get(`/invite/contributor`);
        yield put({ type: 'SET_INVITES', payload: response.data })
    } catch (error) {
        console.log('Error with getInvites saga', error);
    }
}

function* notificationsSaga() {
    yield takeLatest('GET_INVITES', getInvites);
}

export default notificationsSaga;