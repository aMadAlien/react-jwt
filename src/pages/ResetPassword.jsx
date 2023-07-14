import { useState } from "react";
import Input from "../components/Input"
import axiosInstance from '../interceptors/axios'
// import { useParams } from "react-router";
import { useLocation , useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const resetToken = new URLSearchParams(useLocation().search).get("resetToken");

  const handleSubmit = async e => {
    e.preventDefault();

    await axiosInstance.post(
        "/reset-password",
        { password, resetToken }, 
        { withCredentials: true }
    )
    .then((res) => {
      if (res.data.status === "success") {
        setMessage(res.data.message);
      }
    })
    .catch(e => console.error(e));
  }

  return (
    <main className="form-signin w-100 m-auto">
      {
        message ?
        <p>{message}</p>
        :
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Create new password</h1>
          <Input label="password" setValue={setPassword} type="password" minLength="8" />
          <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
        </form>
      }
  </main>
  )
}

export default ResetPassword