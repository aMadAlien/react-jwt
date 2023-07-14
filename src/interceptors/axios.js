import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        // 'Content-Type': 'application/json',
        // Authorization: accessToken ?? ""
    }
});

axiosInstance.interceptors.request.use(req => {
    const accessToken = localStorage.getItem('access_token');
    req.headers['Authorization'] = accessToken ? `Bearer ${accessToken}` : "";

    return req;
}, error => error);


axiosInstance.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401) {
        localStorage.clear();
        window.location = "/login";
    }

    return error;
});

export default axiosInstance;