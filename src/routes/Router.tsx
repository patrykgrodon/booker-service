import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import {
  AuthLayout,
  LoginForm,
  ForgotPasswordForm,
} from "modules/auth/components";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.login}
          element={
            <AuthLayout>
              <LoginForm />
            </AuthLayout>
          }
        />
        <Route
          path={routes.forgotPassword}
          element={
            <AuthLayout>
              <ForgotPasswordForm />
            </AuthLayout>
          }
        />
        <Route path="*" element={<Navigate replace to={routes.login} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
