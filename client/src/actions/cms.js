import axios from 'axios';
import { CMS, MODEL_LIST } from './types';

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

export function getModelList() {
    return (dispatch) => {
        const response = axios.get(`${API_ROOT}/get-model-list`);
        dispatch({
            type: MODEL_LIST,
            payload: response.data
        });
    };
}