import { Button, Grid, TextField, Typography } from "@mui/material";
import { PasswordField, RequestButton } from "common/components";
import { useAccounts } from "common/providers/AccountsProvider";
import { useToast } from "common/providers/ToastProvider";
import { CustomerFormValues } from "common/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Routes } from "routes";
import {
  checkIfEmpty,
  checkPasswordMatch,
  passwordPatternValidator,
  ValidationMessages,
} from "utils/validationPatterns";

const defaultValues: CustomerFormValues = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const CustomerForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    defaultValues,
  });
  const navigate = useNavigate();
  const { createCustomerAcc } = useAccounts();
  const { setSuccessMessage } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBack = () => navigate(Routes.Login);
  const submitHandler = async (formValues: CustomerFormValues) => {
    setError("");
    setIsLoading(true);
    try {
      await createCustomerAcc(formValues);
      handleBack();
      setSuccessMessage("Pomyślnie utworzono konto");
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const password = watch("password");
  return (
    <Grid
      sx={{ height: "100%" }}
      container
      spacing={2}
      component="form"
      alignContent="flex-start"
      onSubmit={handleSubmit(submitHandler)}>
      <Grid item xs={12} md={6}>
        <TextField
          type="email"
          fullWidth
          label="Email"
          {...register("email", {
            validate: checkIfEmpty,
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="First name"
          {...register("firstName", {
            validate: checkIfEmpty,
          })}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Last name"
          {...register("lastName", {
            validate: checkIfEmpty,
          })}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Phone number"
          {...register("phoneNumber", {
            validate: checkIfEmpty,
          })}
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber?.message}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <PasswordField
          fullWidth
          label="Password"
          {...register("password", {
            validate: checkIfEmpty,
            pattern: passwordPatternValidator,
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <PasswordField
          fullWidth
          label="Confirm password"
          {...register("confirmPassword", {
            required: ValidationMessages.Required,
            validate: (value) => checkPasswordMatch(value, password),
          })}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
        />
      </Grid>
      {error && (
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="error" align="center">
            {error}
          </Typography>
        </Grid>
      )}
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: (theme) => theme.spacing(3),
        }}>
        <Button variant="outlined" onClick={handleBack}>
          Powrót
        </Button>
        <RequestButton isLoading={isLoading} type="submit">
          Utwórz
        </RequestButton>
      </Grid>
    </Grid>
  );
};

export default CustomerForm;
