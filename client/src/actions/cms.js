import axios from 'axios';
import { CMS } from './types';

import { API_ROOT } from '../components/utils/ApiConfig';

export function getHomePageDetails() {
    return async (dispatch) => {
        const response = await axios.get(`${API_ROOT}/home-page-details`);
        dispatch({
            type: CMS,
            payload: response.data
        });
    };
}