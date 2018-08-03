import { 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAIL, 
    ACTIVATION_SUCCESS, 
    ACTIVATION_FAIL, 
    VERIFY_ACTIVATION,
    LOGIN_FAIL,
    LOGIN_SUCCESS 
} from '../actions/types';

const authReducer = (state = {}, action) => {
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
                data: action.payload
            }
        default:
            return state
    }
}

export default authReducer;