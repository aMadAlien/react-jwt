import axios from "axios";


// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    // headers: {
        // 'Content-Type': 'application/json',
    // }
});

axiosInstance.interceptors.request.use(req => {
    req.meta = req.meta || {}
    req.meta.requestStartedAt = new Date().getTime();

    const access_token = localStorage.getItem('access_token');
    req.headers['Authorization'] = access_token ? `Bearer ${access_token}` : '';

    return req;
}, async error => error);

axiosInstance.interceptors.response.use(resp => resp, async error => {
    localStorage.clear();
    window.location = "/login";

    // if (error.response.status === 401 && !refresh) {
    //     refresh = true;

    //     const response = await axios.post("/auth/refresh", {}, { withCredentials: true });

    //     if (response.status === 200) {
    //         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access_token']}`;

    //         return axios(error.config);
    //     }
    // }

    return error;
});

export default axiosInstance;