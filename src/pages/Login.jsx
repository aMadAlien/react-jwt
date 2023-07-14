import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../interceptors/axios'
import Input from "../components/Input";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        await axiosInstance.post(
            "/auth/login",
            { email, password }, 
            { withCredentials: true }
        )
        .then((res) => {
            if (res.data?.status === "error") {
                setError(res.data.message);
                return false;
            }

            localStorage.setItem('access_token', res.data.access_token);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data['access_token']}`;
            navigate("/");
        })
        .catch(e => console.error(e));
    }

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please log in</h1>

                <Input label="email" setValue={setEmail} type="email" />
                <Input label="password" setValue={setPassword} type="password" minLength="8" />

                {error && <div className="pb-2 text-danger">{error}</div> }

                <button className="btn btn-primary w-100 py-2" type="submit">Login</button>

                <div>
                    <Link to="/forgot-password">Forgot password</Link>
                </div>
            </form>
        </main>
    )
}

export default Login