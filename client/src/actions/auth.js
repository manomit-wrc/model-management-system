import axios from 'axios';
import { API_ROOT } from '../components/utils/ApiConfig';
import { 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAIL, 
    ACTIVATION_SUCCESS, 
    ACTIVATION_FAIL, 
    VERIFY_ACTIVATION,
    LOGIN_FAIL,
    LOGIN_SUCCESS
} from './types';

export function signup(data) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_ROOT}/signup`, data);
            if(response.data.success === true) {
                
                dispatch({
                    type: SIGN_UP_SUCCESS,
                    payload: response.data
                });
            }
            else {
                dispatch({
                    type: SIGN_UP_FAIL,
                    payload: response.data
                });
            }
        }
        catch(error) {
            dispatch({
                type: SIGN_UP_FAIL,
                payload: "Please try again"
            });
        }
    }
}

export function login(data) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_ROOT}/login`, data);
            if(response.data.success === true) {
                localStorage.setItem('token', response.data.token);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data
                });
            }
            else {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: response.data
                });
            }
        }
        catch(error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: "Please try again"
            });
        }
    }
}

export function checkActivation(data) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_ROOT}/check-activation`, data);
            if(response.data.success === true) {
                dispatch({
                    type: ACTIVATION_SUCCESS,
                    payload: response.data
                });
            }
            else {
                dispatch({
                    type: ACTIVATION_FAIL,
                    payload: response.data
                });
            }
        }
        catch(error) {
            dispatch({
                type: ACTIVATION_FAIL,
                payload: "Something is not right. Please try again"
            });
        }
    }
}

export function verifyActivation(data) {
    return async (dispatch) => {
        const response = await axios.post(`${API_ROOT}/verify-activation`, data);
        if(response.data.success) {
            dispatch({
                type: VERIFY_ACTIVATION,
                payload: response.data
            });
        }
    }
}
