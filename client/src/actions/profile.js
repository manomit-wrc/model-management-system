import axios from '../axios-order';

import { USER_AUTH_TOKEN } from './types';

export function userAuthToken(history) {
    return async (dispatch) => {
        try {
            
            const response = await axios.post(`/user-auth-token`);
            if(response.data.success === true) {
                
                dispatch({
                    type: USER_AUTH_TOKEN,
                    payload: response.data
                });
            }
            else {
                dispatch({
                    type: USER_AUTH_TOKEN,
                    payload: response.data
                });
            }
        }
        catch(error) {
            localStorage.removeItem('token');
            history.push("/");
        }
    }
}