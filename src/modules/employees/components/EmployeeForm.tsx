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
import { EmployeeFormValues } from "../types";
import useEmployees from "../hooks/useEmployees";
import { calendarColors } from "common/constants/calendarColors";
import { drawNumber } from "common/utils/drawNumber";

const getDefaultCalendarColor = () => {
  return calendarColors[drawNumber(0, calendarColors.length - 1)];
};

type EmployeeFormProps = {
  onSuccess: () => void;
  formValues?: Partial<EmployeeFormValues>;
  id?: string;
};

const EmployeeForm = ({ formValues, id, onSuccess }: EmployeeFormProps) => {
  const defaultValues: EmployeeFormValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    calendarColor: getDefaultCalendarColor(),
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: { ...defaultValues, ...formValues } });

  const { addEmployee, editEmployee } = useEmployees();

  const { setErrorMessage } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!id;

  const submitHandler = async (formValues: EmployeeFormValues) => {
    setIsLoading(true);
    try {
      isEditMode
        ? await editEmployee(id, formValues)
        : await addEmployee(formValues);
      onSuccess();
    } catch (err: any) {
      setErrorMessage(
        `Error while ${isEditMode ? "editing" : "adding"} employee. Try again!`
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
      <Grid item xs={12} md={6}>
        <TextField
          {...register("calendarColor")}
          type="color"
          label="Calendar color"
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

export default EmployeeForm;
