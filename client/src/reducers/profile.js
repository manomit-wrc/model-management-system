import { USER_AUTH_TOKEN, CLEAR_CURRENT_PROFILE } from '../actions/types';

const initialState = {
    profile: null
  };


const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_AUTH_TOKEN:
            return {
                ...state,
                isAuthenticated: action.payload?action.payload.success:null,
                user: action.payload
            }
        case CLEAR_CURRENT_PROFILE:
            return {
              ...state,
              profile: null
            };
        default:
            return state;
    }
}

export default profileReducer;