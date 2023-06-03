import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  return true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
