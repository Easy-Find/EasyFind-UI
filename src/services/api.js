import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
});


api.interceptors.request.use(
     config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

export default api;

