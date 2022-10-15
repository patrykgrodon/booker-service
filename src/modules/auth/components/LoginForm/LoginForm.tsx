import { Box, TextField, Typography } from "@mui/material";
import { PasswordField, RequestButton } from "common/components";
import { useAuth } from "modules/auth/contexts/authContext";
import { LoginFormValues } from "modules/auth/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { checkIfEmpty } from "utils/validationPatterns";

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { login } = useAuth();

  const { register, formState, handleSubmit } = useForm<LoginFormValues>({
    defaultValues,
  });
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLogin = async (values: LoginFormValues) => {
    setIsError(false);
    setIsLoading(true);
    try {
      await login(values);
    } catch (err: any) {
      setIsError(true);
    }
    setIsLoading(false);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: (theme) => theme.spacing(2),
        mt: (theme) => theme.spacing(2),
      }}
      aria-label="login-form"
      id="login-form">
      <TextField
        {...register("email", { validate: checkIfEmpty })}
        label="E-mail"
        fullWidth
        error={Boolean(errors.email)}
        helperText={errors.email && errors.email.message}
      />
      <PasswordField
        {...register("password", { validate: checkIfEmpty })}
        label="Hasło"
        fullWidth
        error={Boolean(errors.password)}
        helperText={errors.password && errors.password.message}
      />
      {isError ? (
        <Typography variant="button" color="error">
          Wystąpił błąd podczas logowania. Spróbuj ponownie!
        </Typography>
      ) : null}

      <RequestButton isLoading={isLoading} type="submit">
        Zaloguj
      </RequestButton>
    </Box>
  );
};

export default LoginForm;
