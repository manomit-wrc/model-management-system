import { SIGN_UP_SUCCESS, SIGN_UP_FAIL } from '../actions/types';

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
        default:
            return state
    }
}

export default authReducer;