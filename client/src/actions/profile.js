import axios from '../axios-order';
import { API_ROOT } from '../components/utils/ApiConfig';

import { USER_AUTH_TOKEN, CLEAR_CURRENT_PROFILE, ADDITIONAL_MASTERS } from './types';


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

export function getAdditionalMasters() {
    return async (dispatch) => {
        const response = await axios.get(`${API_ROOT}/additional-masters`);
        dispatch({
            type: ADDITIONAL_MASTERS,
            payload: response.data
        })
    }
}