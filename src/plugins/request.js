import axios from 'axios';
import store from '../store/index';
import {API_URL} from '@/store/config';

// create an axios instance
const service = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

// request interceptor
service.interceptors.request.use(
    (config) => {
        if (localStorage.token) {
            config.headers.Authorization = 'Bearer ' + localStorage.token;
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

// response interceptor
service.interceptors.response.use(
    (response) => response,
    (error) => {
        store.dispatch('logout');
        return Promise.reject(error);
    },
);

export default service;
