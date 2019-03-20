import { combineReducers } from 'redux';

const employeeResults = (state = [], action) => {
    switch(action.type){
        case('SET_EMPLOYEE_RESULTS'):
            return action.payload;
        case('CLEAR_EMPLOYEE_RESULTS'):
            return [];
        default:
            return state;
    }
}

// initial value for pending contributor
const initialPending = []
const pending = (state = initialPending, action) => {
    switch (action.type) {
        case ('ADD_PENDING_CONTRIBUTORS'):
            return [...state,  action.payload];
        case ('REMOVE_PENDING_CONTRIBUTOR'):
            return state.filter( item => item !== action.payload );
        case ('RESET_PENDING_CONTRIBUTOR'):
            return initialPending;
        default:
            return state;
    }
}



export default combineReducers({
    employeeResults,
    pending,
});