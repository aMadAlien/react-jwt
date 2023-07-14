import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
    const accessToken = localStorage.getItem("access_token");

    return accessToken ? (children || <Outlet />) : <Navigate to={redirectPath}  />;
}

export default ProtectedRoute;