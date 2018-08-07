import { 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAIL, 
    ACTIVATION_SUCCESS, 
    ACTIVATION_FAIL, 
    VERIFY_ACTIVATION,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    SET_CURRENT_USER
} from '../actions/types';
import isEmpty from '../components/utils/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {}
};

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
              isAuthenticated: false,
              user: action.payload
            }
        case SET_CURRENT_USER:
            return {
              ...state,
              isAuthenticated: !isEmpty(action.payload),
              user: action.payload
            };
        default:
            return state
    }
}

export default authReducer;