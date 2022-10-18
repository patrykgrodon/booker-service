import { Button, Grid, TextField } from "@mui/material";
import { PasswordField } from "common/components";
import { useForm } from "react-hook-form";
import {
  checkIfEmpty,
  checkPasswordMatch,
  passwordPatternValidator,
} from "utils/validationPatterns";

interface CustomerFormValues {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

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

  const submitHandler = (formValues: CustomerFormValues) => {};

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
            validate: (value) => checkPasswordMatch(value, password),
          })}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: (theme) => theme.spacing(3),
        }}>
        <Button variant="outlined">Powrót</Button>
        <Button type="submit">Utwórz</Button>
      </Grid>
    </Grid>
  );
};

export default CustomerForm;
