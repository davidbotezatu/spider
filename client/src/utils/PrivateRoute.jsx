import { Outlet, Navigate } from "react-router-dom";
import Authenticate from "./Authenticate";

const PrivateRoute = () => {
  let auth = Authenticate;
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
