import { 
    USER_AUTH_TOKEN, 
    CLEAR_CURRENT_PROFILE, 
    ADDITIONAL_MASTERS,
    ADDITIONAL_DETAILS,
    ADDITIONAL_DETAILS_SUCCESS
} from '../actions/types';

const initialState = {
    profile: null,
    additional_masters: {}
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
        case ADDITIONAL_MASTERS:
            return {
                ...state,
                additional_masters: action.payload
            }
        case ADDITIONAL_DETAILS:
            
            return {
                ...state,
                additional_details: action.payload
            }
        case ADDITIONAL_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}

export default profileReducer;