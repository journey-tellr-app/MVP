import { combineReducers } from 'redux';

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

const registrationState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_email: '',
  confirm_password: '',
  profile_pic: './images/headshot-placeholder.jpg', 
}
const registration = (state = registrationState, action) => {
  switch (action.type) {
    case 'UPDATE_REGISTRATION':
      return { ...state, ...action.payload };
    case 'ADD_IMAGE_REGISTER':
      const photoObj = { profile_pic: action.payload.data.Location}
      return {...state, ...photoObj}
    case 'CLEAR_REGISTRATION':
      return registrationState;
    default:
      return state;
  }

}

// user will be on the redux state at:
// state.user
export default combineReducers({
  userInfo,
  registration,
});
