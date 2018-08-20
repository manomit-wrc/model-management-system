import axios from 'axios';
import { CMS } from './types';

export function getHomePageDetails() {
    return async (dispatch) => {
        const response = await axios.get(`/home-page-details`);
        dispatch({
            type: CMS,
            payload: response.data
        });
    };
}