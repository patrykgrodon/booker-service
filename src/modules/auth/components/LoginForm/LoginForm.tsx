import { Box, Link, TextField, Typography } from "@mui/material";
import { PasswordField, RequestButton } from "common/components";
import { makeSx } from "common/styles/makeSx";
import { useAuth } from "modules/auth/contexts/authContext";
import { LoginFormValues } from "modules/auth/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { Routes } from "routes";
import { checkIfEmpty } from "utils/validationPatterns";

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

const sxForm = makeSx((theme) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(2),
  mt: theme.spacing(2),
}));

const LoginForm = () => {
  const { login } = useAuth();

  const { register, formState, handleSubmit } = useForm<LoginFormValues>({
    defaultValues,
  });
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values: LoginFormValues) => {
    setError("");
    setIsLoading(true);
    try {
      await login(values);
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      sx={sxForm}
      aria-label="login form">
      <TextField
        {...register("email", { validate: checkIfEmpty })}
        label="E-mail"
        aria-label="email field"
        fullWidth
        error={Boolean(errors.email)}
        helperText={errors.email && errors.email.message}
      />
      <PasswordField
        {...register("password", { validate: checkIfEmpty })}
        label="Hasło"
        aria-label="password field"
        fullWidth
        error={Boolean(errors.password)}
        helperText={errors.password && errors.password.message}
      />
      {error ? (
        <Typography variant="button" color="error">
          {error}
        </Typography>
      ) : null}

      <RequestButton
        aria-label="submit form"
        isLoading={isLoading}
        type="submit">
        Log in
      </RequestButton>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          component={RouterLink}
          to={Routes.CreateAccount}
          color="primary.dark">
          Create account
        </Link>
        <Link
          component={RouterLink}
          to={Routes.ForgotPassword}
          color="primary.dark">
          Remind password
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
