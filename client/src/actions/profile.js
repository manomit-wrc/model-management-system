import axios from '../axios-order';

import { USER_AUTH_TOKEN, CLEAR_CURRENT_PROFILE } from './types';

export function userAuthToken(history) {
    return async (dispatch) => {
        try {
            
            const response = await axios.post(`/user-auth-token`);
            dispatch({
                type: USER_AUTH_TOKEN,
                payload: response.data
            });
        }
        catch(error) {
            localStorage.removeItem('token');
            history.push("/login");
        }
    }
}

export const clearCurrentProfile = () => {
    return {
      type: CLEAR_CURRENT_PROFILE
    };
};