import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getInvites(action) {
    try {
        const response = yield axios.get(`/invite/contributor`);
        yield put({ type: 'SET_INVITES', payload: response.data })
    } catch (error) {
        console.log('Error with getInvites saga', error);
    }
}

function* inviteResponse(action) {
    try {
        const {invite_id, status } = action.payload;
        yield axios.put(`/invite/contributor/${invite_id}/${status}`);
        yield put({type: 'GET_INVITES' });
    } catch(e){
        console.log('Error in inviteResponse saga', e);
        
    }
}

function* notificationsSaga() {
    yield takeLatest('GET_INVITES', getInvites);
    yield takeEvery('SEND_INVITE_RESPONSE', inviteResponse);
}

export default notificationsSaga;