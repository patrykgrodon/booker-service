import { Box, Link as MuiLink, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  PasswordField,
  RequestButton,
  SubmitErrorMessage,
} from "common/components";
import {
  emailValidator,
  validationMessages,
} from "common/utils/validationPatterns";
import { LoginFormValues } from "modules/auth/types";
import { routes } from "routes";
import { useAuth } from "../../contexts/authContext";
import FormContainer from "../FormContainer";

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues,
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitLogin = async (formValues: LoginFormValues) => {
    setError("");
    setIsLoading(true);
    try {
      await login(formValues);
      navigate(routes.base);
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <FormContainer onSubmit={handleSubmit(submitLogin)} title="Start work">
      <TextField
        {...register("email", {
          required: validationMessages.required,
          pattern: emailValidator,
        })}
        type="email"
        size="small"
        label="E-mail"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <PasswordField
        {...register("password", {
          required: validationMessages.required,
        })}
        size="small"
        label="Password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      {error ? <SubmitErrorMessage error={error} /> : null}
      <RequestButton type="submit" isLoading={isLoading} aria-label="Sign in">
        Sign in
      </RequestButton>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <MuiLink component={Link} to={routes.register}>
          Sign up
        </MuiLink>
        <MuiLink component={Link} to={routes.forgotPassword}>
          Forgot password
        </MuiLink>
      </Box>
    </FormContainer>
  );
};

export default LoginForm;
