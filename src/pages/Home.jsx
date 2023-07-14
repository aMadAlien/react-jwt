import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../interceptors/axios'

const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await axiosInstance.get("auth/user")
        .then(res => setName(res.data.name))
        .catch(e => {
          console.error(e)
          navigate("/login");
        });
    })()
  }, []);

  const logout = async () => {
    await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className='form-signin mt-5 text-center'>
      <h3>Welcome, {name}</h3>

      <button
        onClick={logout}
        className='btn btn-large btn-primary'
      >Logout</button>
    </div>
  )
}

export default Home