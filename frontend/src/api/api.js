import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
});


apiClient.interceptors.request.use(
    (config) => {
        config.headers.set('Accept', 'application/json');

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
