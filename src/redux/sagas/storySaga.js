import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// ant design import
import { message } from 'antd';

function* getMyContributions(action) {
    try {
        const serverResponse = yield axios.get('story/story-contributions');

        yield put({ type: 'SET_STORY_CONTRIBUTIONS', payload: serverResponse.data });

    } catch (error) {
        console.log(`Error in getMyContributions: ${error}`);
        message.error('There was a problem when setting story contributions');
    }
}

function* getTopStories(action) {
    try {
        // console.log('in getTopStories' );
        const serverResponse = yield axios.get('story/recent');

        yield put({ type: 'SET_TOP_STORIES', payload: serverResponse.data });

    } catch (error) {
        console.log(`Error in getStories: ${error}`);
        message.error('There was a problem getting your top stories');
    }
}

// function* storyTemplate(action) {
//     try {
//         yield console.log('in storyTemplate saga:')
//     } catch (error) {
//         console.log('Error with storyTemplate:', error);
//         message.error('There was a problem with the template');
//     }
// }

// send a new story to the server
function* addAStory(action) {
    try {
        // POST a new story and get back the story id from the server
        const response = yield axios.post('/story', action.payload.story);

        // only send chapter data if it exists
        if(action.payload.chapter.length !== 0) {
            // tell the chapter route that the story is new so order is assigned
            const newStory = true;
            // send a POST request for all chapter data associated with the new story
            yield axios.post(`/chapter/${response.data}/${newStory}`, action.payload.chapter);
        } // end if

        // only send contributor data if it exists
        if(action.payload.contributor.length !== 0) {
            // add all contributors associated with a story to the server
            yield axios.post(`/invite/contributor/${response.data}`, action.payload.contributor);
        } // end if
        
        // clear the new story reducers
        message.success('You successfully created a story!');
        const nextAction = { type: 'CLEAR_NEW_STORY' };
        yield put(nextAction);
    } catch (error) {
        // error message and alert when trying to add a story fails
        console.log(`Add story failed: ${error}`);
        message.error('There was a problem when creating your story');
    }
}

// reset story, image, chapter and contributor to initial values
function* clearNewStory() {
    try {
        const storyAction = { type: 'RESET_NEW_STORY' };
        yield put(storyAction);
        const chapterAction = { type: 'RESET_NEW_STORY_CHAPTER' };
        yield put(chapterAction);
        const contributorAction = { type: 'RESET_PENDING_CONTRIBUTOR' };
        yield put(contributorAction);
        const imageAction = { type: 'RESET_IMAGE_STORY' };
        yield put(imageAction);
    } catch (error) {
        // error message when clearing new story inputs
        console.log(`Error in clearNewStory saga: ${error}`);
        message.error('Error with clearing stories');
    }
}

function* getContributors(action) {
    try {
        // console.log(action.payload);
        const serverResponse = yield axios.get(`story/contributors/${action.payload}`);
        yield put({type: 'SET_CONTRIBUTORS', payload: serverResponse.data});

    } catch(e) {
        console.log(`Error in getContributors saga: ${e}`);
        message.error('Error getting contributors');
    }
}


function* storySaga() {
    yield takeLatest('GET_MY_CONTRIBUTIONS', getMyContributions);
    yield takeLatest('GET_TOP_STORIES', getTopStories);
    // yield takeLatest('GET_TEMPLATE_STORY', storyTemplate);
    yield takeLatest('POST_NEW_STORY', addAStory);
    yield takeLatest('CLEAR_NEW_STORY', clearNewStory);
    yield takeLatest('GET_CONTRIBUTORS', getContributors);
}

export default storySaga;