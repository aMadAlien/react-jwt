import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axiosInstance from '../interceptors/axios'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        await axiosInstance.post(
            "/auth/login",
            { email, password }, 
            { withCredentials: true }
        )
        .then((res) => {
            if (res.data?.access_token) {
                localStorage.setItem('access_token', res.data.access_token);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data['access_token']}`;
            }
        })
        .then(() => navigate("/"));
    }

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please log in</h1>

                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
            </form>
        </main>
    )
}

export default Login