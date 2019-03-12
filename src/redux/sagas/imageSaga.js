import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addImagePerson(action) {
    let awsResponse;
    try {
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
            });// End Inner Yield
        } catch (error) {
            console.log('Error with addImage:', error);
        } // End Inner Catch
        yield axios.put(`/api/user/${action.id}`, awsResponse, {
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
    yield takeLatest('ADD_IMAGE_PERSON', addImagePerson);

}

export default imageSaga;

