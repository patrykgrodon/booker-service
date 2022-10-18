import { Button, Grid, TextField } from "@mui/material";
import { PasswordField } from "common/components";
import { useForm } from "react-hook-form";
import {
  checkIfEmpty,
  checkPasswordMatch,
  passwordPatternValidator,
} from "utils/validationPatterns";

interface SellerFormValues {
  email: string;
  companyName: string;
  phoneNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
}

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

  const submitHandler = (formValues: SellerFormValues) => {};

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

export default SellerForm;
