import { Layout } from "common/components";
import { useAuth } from "modules/auth/contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";
import { Routes } from "./routePaths";

const PrivateRoute = () => {
  const { user } = useAuth();

  const isAuthorised = Boolean(user);
  // const location = useLocation();

  return isAuthorised ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate
      replace
      to={Routes.Login}
      // state={!prevLoginInfo ? { from: location } : undefined}
    />
  );
};
export default PrivateRoute;
