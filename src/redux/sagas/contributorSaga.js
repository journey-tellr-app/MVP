import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getEmployees(action) {
    try {
        //autopopulates search results for adding contributors
    } catch (error) {
        console.log('Error with storyTemplate:', error);
    }
}

function* getContributor(action) {
    try {
        //gets contributors for a given story
    } catch (error) {
        console.log('Error with storyTemplateDetails:', error);
    }
}

function* deleteContributor(action) {
    try {
        //delete contributor from story
    } catch (error) {
        console.log('Error with storyTemplateDetails:', error);
    }
}

function* addContributor(action) {
    try {
        //add contributor to story
    } catch (error) {
        console.log('Error with storyTemplateDetails:', error);
    }
}



function* contributorSaga() {
    yield takeLatest('GET_EMPLOYEES', getEmployees);
    yield takeLatest('GET_CONTRIBUTOR', getContributor);
    yield takeLatest('DELETE_CONTRIBUTOR', deleteContributor);
    yield takeLatest('ADD_CONTRIBUTOR', addContributor);
}

export default contributorSaga;