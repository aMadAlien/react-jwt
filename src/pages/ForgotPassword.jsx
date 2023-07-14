import { useState } from "react";
import Input from "../components/Input"
import axiosInstance from '../interceptors/axios'


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        await axiosInstance.post(
            "/forgot-password",
            { email }, 
            { withCredentials: true }
        )
        .then((res) => {
            if (res.data?.status === "error") {
                setError(res.data.message);
                return false;
            }

            setIsSent(true);
        })
        .catch(e => console.error(e));
    }

    return (
        <main className="form-signin w-100 m-auto">
            {
                isSent ?
                <div>
                    <p>We sent you an email with reset link.</p>
                </div>
                :
                <form onSubmit={handleSubmit}>
                            <h3 className="h3 mb-3 fw-normal">Leave us your email.</h3>
                            <Input label="email" setValue={setEmail} type="email" />
                            {error && <div className="pb-2 text-danger">{error}</div> }
                            <button className="btn btn-primary w-100 my-2" type="submit">Submit</button>
                </form>
            }
        </main>
    )
}

export default ForgotPassword