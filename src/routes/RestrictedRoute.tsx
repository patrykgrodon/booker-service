import { Navigate, Outlet, useLocation } from "react-router-dom";

import AuthLayout from "modules/auth/components/AuthLayout";
import { useAuth } from "modules/auth/contexts";
import { routes } from "./routes";

const RestrictedRoute = () => {
  const { user } = useAuth();
  const isRestricted = !user;
  const location = useLocation();

  if (isRestricted)
    return (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    );

  return <Navigate to={location.state?.from || routes.base} replace />;
};

export default RestrictedRoute;
