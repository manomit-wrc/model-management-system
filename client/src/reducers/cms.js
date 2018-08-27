import { CMS, MODEL_LIST } from '../actions/types';

const cmsReducer = (state = {}, action) => {
    switch(action.type) {
        case CMS:
            return {
                ...state,
                data: action.payload
            }
        case MODEL_LIST:
            return {
                ...state,
                modelList: action.payload
            }
        default:
            return state
    }
}

export default cmsReducer;