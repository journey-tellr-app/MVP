import { combineReducers } from 'redux';

const invite = (state = [], action) => {
    switch (action.type) {
        case ('SET_INVITES'):
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    invite,
});