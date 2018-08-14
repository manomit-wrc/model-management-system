import { CMS } from '../actions/types';

const cmsReducer = (state = {}, action) => {
    switch(action.type) {
        case CMS:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

export default cmsReducer;