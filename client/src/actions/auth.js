import axios from '../axios-order';
import jwt_decode from 'jwt-decode';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { API_ROOT } from '../components/utils/ApiConfig';
import { 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL, 
    ACTIVATION_SUCCESS, 
    ACTIVATION_FAIL, 
    VERIFY_ACTIVATION,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    SET_CURRENT_USER,
    USER_DETAILS,
    INDUSTRIES,
    COUNTRIES,
    STATES,
    UPDATE_USER_DETAILS
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

export function changePassword(data){
    return async (dispatch) => {
        try{
            const response = await axios.post(`${API_ROOT}/change-password`, data);
            if(response.data.success === true){
                dispatch({
                    type: CHANGE_PASSWORD_SUCCESS,
                    payload: response.data
                });
            }else{
                dispatch({
                    type: CHANGE_PASSWORD_FAIL,
                    payload: response.data
                });
            }
        }catch(error){
            dispatch({
                type: CHANGE_PASSWORD_FAIL,
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
            localStorage.setItem('token', response.data.token);
            const decoded = jwt_decode(response.data.token);
            decoded.info = response.data.info;
            
            // Set current user
            dispatch(setCurrentUser(decoded));
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

export function uploadPortfolioImage(data) {
    
    let formdata = new FormData();
    for(var i=0;i<data.length;i++) {
        formdata.append('images', data[i]);
    }
    return async (dispatch) => {
        const response = await axios.post(`${API_ROOT}/upload-portfolio-images`, formdata);
        dispatch({
            type: USER_DETAILS,
            payload: response.data.user_details
        });
        
    }
}

export function userDetails() {
    try {
        return async (dispatch) => {
            const response = await axios.get(`${API_ROOT}/user-details`);
            dispatch({
                type: USER_DETAILS,
                payload: response.data.user_details
            });
        }
    }
    catch(error) {
        window.location.href = "/login"
    }
    
}

export function removePortfolioImage(data) {
    return async (dispatch) => {
        const response = await axios.post(`${API_ROOT}/remove-portfolio-image`, data);
        dispatch({
            type: USER_DETAILS,
            payload: response.data.user_details
        });
    }
}

export function getIndustries() {
    return async (dispatch) => {
        const response = await axios.get(`${API_ROOT}/industries`);
        dispatch({
            type: INDUSTRIES,
            payload: response.data.industries
        })
    }
}

export function getCountries() {
    return async (dispatch) => {
        const response = await axios.get(`${API_ROOT}/countries`);
        dispatch({
            type: COUNTRIES,
            payload: response.data.countries
        })
    }
}

export function getStates(data) {
    return async (dispatch) => {
        const response = await axios.post(`${API_ROOT}/states`, data);
        dispatch({
            type: STATES,
            payload: response.data.states
        })
    }
}

export function updateUserDetails(data) {
    return async (dispatch) => {
        const response = await axios.post(`${API_ROOT}/update-user-details`, data);
        dispatch({
            type: USER_DETAILS,
            payload: response.data.user_details
        });
    }
}
