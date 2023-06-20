import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  PasswordField,
  RequestButton,
  SubmitErrorMessage,
} from "common/components";
import { useAuth } from "modules/auth/contexts/authContext";
import { RegisterFormValues } from "modules/auth/types";

import {
  checkPasswordMatch,
  emailValidator,
  maxLengthValidator,
  minLengthValidator,
  passwordValidator,
  validationMessages,
} from "common/utils/validationPatterns";
import FormContainer from "../FormContainer";
import ReturnToLoginLink from "../ReturnToLoginLink";

const defaultValues: RegisterFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  city: "",
  companyName: "",
  phoneNumber: "",
  street: "",
  streetNumber: "",
};

const RegisterForm = () => {
  const {
    handleSubmit,
    register: registerField,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValues>({ defaultValues });
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (formValues: RegisterFormValues) => {
    setError("");
    setIsLoading(true);
    try {
      await register(formValues);
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const password = watch("password");

  return (
    <FormContainer
      onSubmit={handleSubmit(handleRegister)}
      title="Create account"
    >
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <TextField
          {...registerField("companyName", {
            required: validationMessages.required,
            minLength: minLengthValidator(3),
            maxLength: maxLengthValidator(100),
          })}
          size="small"
          label="Company name"
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
          fullWidth
        />
        <TextField
          {...registerField("email", {
            required: validationMessages.required,
            pattern: emailValidator,
          })}
          type="email"
          size="small"
          label="E-mail"
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <TextField
          {...registerField("phoneNumber", {
            required: validationMessages.required,
          })}
          size="small"
          label="Phone number"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          fullWidth
        />
        <TextField
          {...registerField("city", {
            required: validationMessages.required,
          })}
          size="small"
          label="City"
          error={!!errors.city}
          helperText={errors.city?.message}
          fullWidth
        />
        <TextField
          {...registerField("street", {
            required: validationMessages.required,
          })}
          size="small"
          label="Street"
          error={!!errors.street}
          helperText={errors.street?.message}
          fullWidth
        />
        <TextField
          {...registerField("streetNumber", {
            required: validationMessages.required,
          })}
          size="small"
          label="Street number"
          error={!!errors.streetNumber}
          helperText={errors.streetNumber?.message}
          fullWidth
        />
        <PasswordField
          {...registerField("password", {
            required: validationMessages.required,
            pattern: passwordValidator,
          })}
          autoComplete="new-password"
          size="small"
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
        <PasswordField
          {...registerField("confirmPassword", {
            required: validationMessages.required,
            validate: (val) => checkPasswordMatch(val, password),
          })}
          size="small"
          label="Confirm password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
        />
      </Box>
      {error ? <SubmitErrorMessage error={error} /> : null}
      <RequestButton type="submit" isLoading={isLoading}>
        Sign up
      </RequestButton>
      <ReturnToLoginLink />
    </FormContainer>
  );
};

export default RegisterForm;
