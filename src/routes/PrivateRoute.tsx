import { Navigate, Outlet } from "react-router-dom";
import { Routes } from "./routePaths";

const PrivateRoute = () => {
  const isAuthorised = Boolean("s");
  // const location = useLocation();

  return isAuthorised ? (
    <Outlet />
  ) : (
    <Navigate
      replace
      to={Routes.Base}
      // state={!prevLoginInfo ? { from: location } : undefined}
    />
  );
};
export default PrivateRoute;
