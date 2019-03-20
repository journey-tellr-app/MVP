import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import templateSaga from './templateSaga';
import profileSaga from './profileSaga';
import contributorSaga from './contributorSaga';
import imageSaga from './imageSaga';
import storySaga from './storySaga';
import notificationsSaga from './notificationSaga';
import storyDetailSaga from './storyDetailSaga';
import searchStorySaga from './searchStoriesSaga';
import chapterSaga from './chapterSaga';
import likesSaga from './likesSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    likesSaga(),
    loginSaga(),
    registrationSaga(),
    userSaga(),
    templateSaga(),
    profileSaga(),
    contributorSaga(),
    imageSaga(),
    storySaga(),
    notificationsSaga(),
    storyDetailSaga(),
    searchStorySaga(),
    chapterSaga(),
  ]);
}
