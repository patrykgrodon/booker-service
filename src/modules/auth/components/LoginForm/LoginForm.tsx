import { Box, TextField } from "@mui/material";
import { PasswordField, RequestButton } from "common/components";
import { useToast } from "common/providers/ToastProvider";
import { useAuth } from "modules/auth/contexts/authContext";
import { LoginFormValues } from "modules/auth/types";
import { useForm } from "react-hook-form";
import { checkIfEmpty } from "utils/validationPatterns";
import { useState } from "react";

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { login } = useAuth();

  const { setSuccessMessage, setErrorMessage } = useToast();
  const { register, formState, handleSubmit } = useForm<LoginFormValues>({
    defaultValues,
  });
  const { errors } = formState;

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(values);
      setSuccessMessage("Zalogowano");
    } catch (err: any) {
      setErrorMessage("Nie udało się zalogować. Spróbuj ponownie!");
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
      <RequestButton isLoading={isLoading} type="submit">
        Zaloguj
      </RequestButton>
    </Box>
  );
};

export default LoginForm;
