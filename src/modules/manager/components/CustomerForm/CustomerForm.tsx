import { Button, Grid, TextField } from "@mui/material";
import { PasswordField } from "common/components";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm<CustomerFormValues>({
    defaultValues,
  });

  const submitHandler = (formValues: CustomerFormValues) => {};

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
          {...register("email")}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="First name" {...register("firstName")} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="Last name" {...register("lastName")} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Phone number"
          {...register("phoneNumber")}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <PasswordField fullWidth label="Password" {...register("password")} />
      </Grid>
      <Grid item xs={12} md={6}>
        <PasswordField
          fullWidth
          label="Confirm password"
          {...register("confirmPassword")}
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
