import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import {
  LoginForm,
  ForgotPasswordForm,
  RegisterForm,
} from "modules/auth/components";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";
import Services from "modules/services/pages/Services";
import Customers from "modules/customers/pages/Customers";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RestrictedRoute />}>
          <Route path={routes.login} element={<LoginForm />} />
          <Route path={routes.register} element={<RegisterForm />} />
          <Route
            path={routes.forgotPassword}
            element={<ForgotPasswordForm />}
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={routes.base} element={<>base</>} />
          <Route path={routes.customers} element={<Customers />} />
          <Route path={routes.services} element={<Services />} />
        </Route>
        <Route path="*" element={<Navigate replace to={routes.login} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
