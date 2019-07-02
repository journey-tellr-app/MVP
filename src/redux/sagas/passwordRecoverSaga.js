import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// ant design import
import { message } from 'antd';

function* recoverPassword(action) {
    try {
        yield axios.put(`/recover-password`, action.payload)
            .then(response => {
                console.log(response.data);

            }).catch(error => {
                console.log(error);
            });
        // yield put({ type: "FETCH_USER", });
        console.log('in saga');
        
    } catch (error) {
        console.log('Error with recoverPassword:', error);
        message.error('Error recovering the password');
    }
}

function* passwordRecoverSaga() {
    // yield takeLatest('GET_TEMPLATE_STORY', getStats);
    yield takeLatest('RECOVER_PASSWORD', recoverPassword);
}

export default passwordRecoverSaga;