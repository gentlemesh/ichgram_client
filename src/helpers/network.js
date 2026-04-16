import axios from 'axios';

import { BASE_URL } from '../constants';
import { getUserToken } from '../redux/slices/authSlice';

export const STATUS_IDLE = 'idle';
export const STATUS_LOADING = 'loading';
export const STATUS_SUCCESS = 'succeeded';
export const STATUS_FAIL = 'failed';

const client = axios.create({ baseURL: BASE_URL });

const makeRequest = async (url, method = 'get', data = null) => {
    let config = {
        url,
        method,
        headers: {},
    }
    if ((method === 'post' || method === 'patch') && data) {
        config.data = data;
    }

    const token = getUserToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await client(config);
    return response.data;
}

export const getData = url => makeRequest(url);
export const postData = (url, data) => makeRequest(url, 'post', data);
export const patchData = (url, data) => makeRequest(url, 'patch', data);
export const deleteData = url => makeRequest(url, 'delete');