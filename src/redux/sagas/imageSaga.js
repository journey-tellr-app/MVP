import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addImage(action) {
    try {
        yield axios.post(`/awsS3`, action.payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            // handle your response;
        }).catch(error => {
            // handle your error
        });
    } catch (error) {
        console.log('Error with addImage:', error);
    }
}





function* imageSaga() {
    yield takeLatest('ADD_IMAGE', addImage);

}

export default imageSaga;