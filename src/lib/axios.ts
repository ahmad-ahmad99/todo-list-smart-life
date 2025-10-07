
import axios from 'axios';
import { CONFIG } from '../global-config';


// ----------------------------------------------------------------------

const axiosInstance = axios.create({
    baseURL: CONFIG.serverUrl,
});



axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error?.response?.data?.message || error?.message || 'Something went wrong!';
        console.error('Axios error:', message);
        return Promise.reject(new Error(message));
    }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const endpoints = {
    auth: {
        me: '/auth/me',
        signIn: '/auth/login',
    },

} as const;
