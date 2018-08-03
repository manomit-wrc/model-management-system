import { USER_AUTH_TOKEN } from '../actions/types';

const initialState = {
    user: []
}

const profileReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_AUTH_TOKEN:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default profileReducer;