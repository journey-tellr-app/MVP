const templateReducer = ( state = [], action ) => {
    console.log(`in templateReducer: ${action.type}`);
    if(action.type === 'SET_TEMPLATE') {
        return action.payload;
    } else if(action.type === 'SET_TEMPLATE_STORY_DROPDOWN') {
        return action.payload;
    }
    return state;
}

export default templateReducer;