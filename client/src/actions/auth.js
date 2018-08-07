import axios from '../axios-order';
import jwt_decode from 'jwt-decode';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { API_ROOT } from '../components/utils/ApiConfig';
import { 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAIL, 
    ACTIVATION_SUCCESS, 
    ACTIVATION_FAIL, 
    VERIFY_ACTIVATION,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    SET_CURRENT_USER
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
                const decoded = jwt_decode(response.data.token);
                decoded.info = response.data.info;
               
                // Set current user
                dispatch(setCurrentUser(decoded));
                
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
                payload: error.response.data
            });
        }
    }
}

export function loginWithGoogle(data) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_ROOT}/login-with-google`, data);
            if(response.data.success === true) {
                localStorage.setItem('token', response.data.token);
                const decoded = jwt_decode(response.data.token);
                // Set current user
                dispatch(setCurrentUser(decoded));
                
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
                payload: error.response.data
            });
        }
    }
}

export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
};

export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };

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

export function uploadProfileImage(data) {
    let formdata = new FormData();
    formdata.append('avatar', data);
    return async (dispatch) => {
        try {
            dispatch(showLoading())
            const response = await axios.post(`${API_ROOT}/upload-profile-image`, formdata);
            localStorage.setItem('token', response.data.token);
            const decoded = jwt_decode(response.data.token);
            decoded.info = response.data.info;
            
            // Set current user
            dispatch(setCurrentUser(decoded));
        }
        finally {
            
            //dispatch(hideLoading());
        }
        
    }
}
