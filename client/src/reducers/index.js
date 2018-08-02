import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import cmsReducer from './cms';
import authReducer from './auth';

const rootReducer = combineReducers({
    cms: cmsReducer,
    form: formReducer,
    auth: authReducer
});

export default rootReducer;