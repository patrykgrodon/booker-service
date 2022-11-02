import { Button, Grid, TextField, Typography } from "@mui/material";
import { PasswordField, RequestButton } from "common/components";
import { ServiceProviderFormValues } from "common/types";
import useCreateUser from "modules/manager/hooks/useCreateUser";
import { useForm } from "react-hook-form";
import {
  checkIfEmpty,
  checkPasswordMatch,
  passwordPatternValidator,
  ValidationMessages,
} from "utils/validationPatterns";

const defaultValues: ServiceProviderFormValues = {
  email: "",
  companyName: "",
  phoneNumber: "",
  city: "",
  street: "",
  streetNumber: "",
  password: "",
  confirmPassword: "",
};

const ServiceProviderForm = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const { error, handleBack, isLoading, submitHandler } =
    useCreateUser("serviceProvider");

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
          label="City"
          {...register("city", {
            validate: checkIfEmpty,
          })}
          error={Boolean(errors.city)}
          helperText={errors.city?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Street"
          {...register("street", {
            validate: checkIfEmpty,
          })}
          error={Boolean(errors.street)}
          helperText={errors.street?.message}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Street number"
          {...register("streetNumber", {
            validate: checkIfEmpty,
          })}
          error={Boolean(errors.streetNumber)}
          helperText={errors.streetNumber?.message}
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

export default ServiceProviderForm;
