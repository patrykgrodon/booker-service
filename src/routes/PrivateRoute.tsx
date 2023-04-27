import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "modules/auth/contexts";
import { routes } from "./routes";

const PrivateRoute = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAuthorised = !!user;
  return isAuthorised ? (
    <>
      <button onClick={logout}>logout</button>
      <Outlet />
    </>
  ) : (
    <Navigate to={routes.login} replace state={{ from: location }} />
  );
};

export default PrivateRoute;
