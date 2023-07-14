import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axiosInstance from '../interceptors/axios';
import axios from 'axios';

const AuthService = ({ children }) => {
    const [expirationTime, setExpirationTime] = useState(60 * 60)
    const [isFirstMounted, setIsFirstMounted] = useState(true);
    const navigate = useNavigate();

    const accessToken = localStorage.getItem("access_token");

    const updateRefreshtoken = async () => {
        await axiosInstance.post('/auth/refresh')
        .then(res => {
            const data = res.data;
            if (data && data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
                setExpirationTime(data.expires_in);
            }
        })
        .catch(e => {
            localStorage.clear();
            navigate('/login');
        });

        if (isFirstMounted) {
            setIsFirstMounted(false);
        }
    }

    useEffect(() => {
        if (accessToken) {
            // Check on the first render
            if (isFirstMounted) {
                updateRefreshtoken();
            }

            // Keep checking after a certain time
            const intervalId = setInterval(() => {
                updateRefreshtoken();
            }, expirationTime * 1000 - 1000 * 30);
            return () => clearInterval(intervalId);
        }

        return undefined;
    }, [accessToken]);

    return ( 
        <div>{children}</div>
    );
}

export default AuthService