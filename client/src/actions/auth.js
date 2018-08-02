import axios from '../axios-order';
import { SIGN_UP_SUCCESS, SIGN_UP_FAIL } from './types';

export function signup(data) {
    return async (dispatch) => {
        try {
            const response = await axios.post('/signup', data);
            if(response.data.success === true) {
                localStorage.setItem('token', response.data.token);
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