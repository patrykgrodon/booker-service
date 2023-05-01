import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  checkIfEmpty,
  validationMessages,
  validationPatterns,
} from "common/utils/validationPatterns";
import { RequestButton } from "common/components";
import { useToast } from "common/providers/ToastProvider";
import { CustomerFormValues } from "../types";
import useCustomers from "../hooks/useCustomers";

const defaultValues: CustomerFormValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
};

type CustomerFormProps = {
  onSuccess: () => void;
  formValues?: CustomerFormValues;
  id?: string;
};

const CustomerForm = ({ formValues, id, onSuccess }: CustomerFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: { ...defaultValues, ...formValues } });

  const { addCustomer, editCustomer } = useCustomers();

  const { setErrorMessage } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!id;

  const submitHandler = async (formValues: CustomerFormValues) => {
    setIsLoading(true);
    try {
      isEditMode
        ? await editCustomer(id, formValues)
        : await addCustomer(formValues);
      onSuccess();
    } catch (err: any) {
      setErrorMessage(
        `Error while ${isEditMode ? "editing" : "adding"} customer. Try again!`
      );
    }
    setIsLoading(false);
  };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Grid item xs={12} md={6}>
        <TextField
          label="First name"
          {...register("firstName", {
            validate: checkIfEmpty,
          })}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Last name"
          {...register("lastName", {
            validate: checkIfEmpty,
          })}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          {...register("phoneNumber", {
            validate: checkIfEmpty,
          })}
          label="Phone number"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          {...register("email", {
            validate: (val) =>
              val.length === 0
                ? true
                : validationPatterns.email.test(val) ||
                  validationMessages.wrongEmail,
          })}
          label="E-mail"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: (theme) => theme.spacing(2),
        }}
      >
        <RequestButton fullWidth isLoading={isLoading} type="submit">
          {isEditMode ? "Save" : "Add"}
        </RequestButton>
      </Grid>
    </Grid>
  );
};

export default CustomerForm;
