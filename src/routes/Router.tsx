import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";
import { Routes } from "./routePaths";
import { Suspense } from "react";
import { Spinner } from "common/components";
import { Login } from "modules/auth/components";
import Dashboard from "modules/dashboard/pages/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner size="large" fullPage />}>
        <RouterRoutes>
          <Route
            path={Routes.Login}
            element={
              <RestrictedRoute>
                <Login />
              </RestrictedRoute>
            }
          />
          <Route path={Routes.Base} element={<PrivateRoute />}>
            <Route path={Routes.Dashboard} element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Navigate replace to={Routes.Login} />} />
        </RouterRoutes>
      </Suspense>
    </BrowserRouter>
  );
};
export default Router;
