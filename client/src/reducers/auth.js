import { 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAIL, 
    ACTIVATION_SUCCESS, 
    ACTIVATION_FAIL, 
    VERIFY_ACTIVATION,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    SET_CURRENT_USER,
    USER_DETAILS,
    INDUSTRIES,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    COUNTRIES,
    STATES,
    UPDATE_USER_DETAILS,
    LOGOUT,
    LOGIN_START
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
        case CHANGE_PASSWORD_SUCCESS:
            return{
                ...state,
                data: action.payload
            }
        case CHANGE_PASSWORD_FAIL:
            return{
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
        case LOGIN_START: 
            return {
                isAuthenticated: null,
                user: null
            }
        case LOGIN_FAIL:
            return {
              isAuthenticated: false,
              user: action.payload
            }
        case SET_CURRENT_USER:
            return {
              isAuthenticated: !isEmpty(action.payload),
              user: action.payload
            };
        case USER_DETAILS:
            return {
                ...state,
                user_details: action.payload
            }
        case UPDATE_USER_DETAILS:
            return {
                ...state,
                data: action.payload
            }
        case INDUSTRIES:
            return {
                ...state,
                industries: action.payload
            }
        case COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }
        case STATES:
            return {
                ...state,
                states: action.payload
            }
        case LOGOUT:
            return {
                isAuthenticated: false,
                user: {}
            }
        default:
            return state
    }
}

export default authReducer;