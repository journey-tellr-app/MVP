import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// ant design import
import { message } from 'antd';

function* addImageAWS(action) {
    // console.log('in addImage AWS', action);
    let awsResponse;
    try {
            yield axios.post(`/awsS3`, action.payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                awsResponse = response; 
                // console.log(awsResponse);

            }).catch(error => {
                console.log(error);
            });
        } catch (error) {
            console.log('Error with addImageAWS:', error);
            message.error('Error sending the image to AWS');
        }
    let nextAction = {
        type: action.nextType,
        payload: awsResponse,
        chapterId: action.chapterId,
        storyId: action.storyId,
    }
    // console.log(`addImageAWS nextaction`, nextAction);
    
    yield put(nextAction);
}

function* addImagePerson(action) {

    try {
        yield axios.put(`/api/user/${action.id}`, action.payload);
        yield put({ type: 'FETCH_USER' });
    } catch (error) {
        console.log('Error with addImage:', error);
        message.error('Error adding a user profile image');
    }


}

function* updatePicture(action) {

    try {
        yield axios.put(`/api/user/${action.id}`, action.payload);
        yield put({ type: 'FETCH_USER' });
    } catch (error) {
        console.log('Error with addImage:', error);
        message.error('Error updating user profile image');
    }


}

function* imageSaga() {
    yield takeLatest('ADD_IMAGE_AWS', addImageAWS);
    yield takeLatest('ADD_IMAGE_PERSON', addImagePerson);
    yield takeLatest('UPDATE_PICTURE', updatePicture);


}

export default imageSaga;

