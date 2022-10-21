import { Button, Grid, TextField, Typography } from "@mui/material";
import { PasswordField, RequestButton } from "common/components";
import { useToast } from "common/providers/ToastProvider";
import { SellerFormValues } from "common/types";
import { useAuth } from "modules/auth/contexts/authContext";
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

const defaultValues: SellerFormValues = {
  email: "",
  companyName: "",
  phoneNumber: "",
  address: "",
  password: "",
  confirmPassword: "",
};

const SellerForm = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const navigate = useNavigate();
  const { setSuccessMessage } = useToast();
  const { createUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBack = () => navigate(Routes.Login);
  const submitHandler = async (formValues: SellerFormValues) => {
    setError("");
    setIsLoading(true);
    try {
      const { confirmPassword, ...restValues } = formValues;
      await createUser("seller", restValues);
      setSuccessMessage("Account created successfully");
      navigate(Routes.Dashboard);
    } catch (err: any) {
      setError(err);
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
          label="Company name"
          {...register("companyName", {
            validate: checkIfEmpty,
          })}
          error={Boolean(errors.companyName)}
          helperText={errors.companyName?.message}
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
        <TextField
          fullWidth
          label="Address"
          {...register("address", {
            validate: checkIfEmpty,
          })}
          error={Boolean(errors.address)}
          helperText={errors.address?.message}
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
          Back
        </Button>
        <RequestButton isLoading={isLoading} type="submit">
          Create
        </RequestButton>
      </Grid>
    </Grid>
  );
};

export default SellerForm;
