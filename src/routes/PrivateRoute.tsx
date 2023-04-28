import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "modules/auth/contexts";
import { routes } from "./routes";
import { AppLayout } from "common/components";

const PrivateRoute = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthorised = !!user;
  return isAuthorised ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to={routes.login} replace state={{ from: location }} />
  );
};

export default PrivateRoute;
