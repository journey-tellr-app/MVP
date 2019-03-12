import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {connect} from 'react-redux';

function* addImageAWS(action) {
    let awsResponse;
    try {
            yield axios.post(`/awsS3`, action.payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                awsResponse = response; 
                console.log(awsResponse);

            }).catch(error => {
                console.log(error);
            });
        } catch (error) {
            console.log('Error with addImageAWS:', error);
        }
    let nextAction = {
        type: action.nextType,
        payload: awsResponse,
        id: action.id,
    }
    this.props.dispatch(nextAction);
}

function* addImagePerson(action) {
    try {
        
        yield axios.put(`/api/user/${action.id}`, action.payload, {
        }).then(response => {
            console.log(response);

        }).catch(error => {
            console.log(error);
        });  //end put
    } catch (error) {
        console.log('Error with addImage:', error);
    }


}

function* imageSaga() {
    yield takeLatest('ADD_IMAGE_AWS', addImageAWS);
    yield takeLatest('ADD_IMAGE_PERSON', addImagePerson);

}

export default {connect} (imageSaga);

