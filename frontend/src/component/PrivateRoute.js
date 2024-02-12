import { Navigate, Outlet } from "react-router-dom";

const isLogin = !!localStorage.getItem("accessToken");

const PrivateRoute = () => {
    return isLogin ? <Outlet /> : <Navigate to="/loginerrorpage" />;
};

export default PrivateRoute;