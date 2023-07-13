import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axiosInstance from '../interceptors/axios'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    await axiosInstance.post(
      "/auth/register",
      { name, email, password }
    )
    .finally(navigate("/login"));
  }

  return (
    <main className="form-signin w-100 m-auto">
    <form onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 fw-normal">Please register</h1>

      <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={e => setName(e.target.value)} />
          <label htmlFor="floatingInput">Name</label>
      </div>

      <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email address</label>
      </div>

      <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
      </div>

      <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
    </form>
</main>  )
}

export default Register