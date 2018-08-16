import axios from '../axios-order';
import { API_ROOT } from '../components/utils/ApiConfig';

import { USER_AUTH_TOKEN, CLEAR_CURRENT_PROFILE, ADDITIONAL_MASTERS, ADDITIONAL_DETAILS, ADDITIONAL_DETAILS_SUCCESS } from './types';


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

export function getAdditionalDetails() {
    return async (dispatch) => {
        const response = await axios.get(`${API_ROOT}/get-additional-details`);
        dispatch({
            type: ADDITIONAL_DETAILS,
            payload: response.data.additional_details
        })
    }
}

export function updateAdditionalDetails(data) {
    return async (dispatch) => {
        const response = await axios.post(`${API_ROOT}/update-additional-details`, data);
        dispatch({
            type: ADDITIONAL_DETAILS_SUCCESS,
            payload: response.data
        })
    }
}