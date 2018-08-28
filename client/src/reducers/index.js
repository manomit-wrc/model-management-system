import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import cmsReducer from './cms';
import authReducer from './auth';
import profileReducer from './profile';

const rootReducer = combineReducers({
    cms: cmsReducer,
    form: formReducer,
    auth: authReducer,
    profile: profileReducer
});

export default rootReducer;