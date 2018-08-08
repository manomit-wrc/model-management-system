import { 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAIL, 
    ACTIVATION_SUCCESS, 
    ACTIVATION_FAIL, 
    VERIFY_ACTIVATION,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    SET_CURRENT_USER,
    USER_DETAILS
} from '../actions/types';
import isEmpty from '../components/utils/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {}
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                data: action.payload
            }
        case SIGN_UP_FAIL:
            return {
                ...state,
                data: action.payload
            }
        case ACTIVATION_SUCCESS:
            return {
                ...state,
                data: action.payload
            }
        case ACTIVATION_FAIL:
            return {
                ...state,
                data: action.payload
            }
        case VERIFY_ACTIVATION:
            return {
                ...state,
                data:action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                data: action.payload
            }
        case LOGIN_FAIL:
            return {
                ...state,
              isAuthenticated: false,
              user: action.payload
            }
        case SET_CURRENT_USER:
            return {
              ...state,
              isAuthenticated: !isEmpty(action.payload),
              user: action.payload
            };
        case USER_DETAILS:
            return {
                ...state,
                user_details: action.payload
            }
        default:
            return state
    }
}

export default authReducer;