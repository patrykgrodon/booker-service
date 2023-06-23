import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  checkIfEmpty,
  onlyNumbersValidator,
  validationMessages,
  validationPatterns,
} from "common/utils/validationPatterns";
import { ControlSelect, RequestButton } from "common/components";
import { useToast } from "common/providers/ToastProvider";
import { ServiceFormValues } from "modules/services/types";
import { durationValues } from "../constants";
import { addService, editService } from "../api";
import { useAuth } from "modules/auth/contexts";

const defaultValues: ServiceFormValues = {
  name: "",
  duration: durationValues[0].value,
  cost: 10,
};

type ServiceFormProps = {
  onSuccess: () => void;
  formValues?: ServiceFormValues;
  id?: string;
};

const ServiceForm = ({ formValues, id, onSuccess }: ServiceFormProps) => {
  const { user } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({ defaultValues: { ...defaultValues, ...formValues } });

  const { setErrorMessage } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!id;

  const submitHandler = async (formValues: ServiceFormValues) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const correctFormValues = {
        ...formValues,
        cost: +formValues.cost,
      };
      isEditMode
        ? await editService(id, correctFormValues)
        : await addService(user.id, correctFormValues);
      onSuccess();
    } catch (err: any) {
      setErrorMessage(
        `Error while ${isEditMode ? "editing" : "adding"} service. Try again!`
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
          fullWidth
          label="Name"
          {...register("name", {
            validate: checkIfEmpty,
          })}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="duration"
          rules={{
            validate: checkIfEmpty,
          }}
          render={({ field }) => (
            <ControlSelect
              {...field}
              id="duration"
              label="Duration(hours:minutes)"
              error={errors.duration}
              options={durationValues.map(({ value }) => ({
                label: value,
                value,
              }))}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Cost($)"
          {...register("cost", {
            required: validationMessages.required,
            min: {
              value: 1,
              message: "Value must be greater than zero!",
            },
            pattern: {
              value: validationPatterns.onlyNumbersAndFloat,
              message: onlyNumbersValidator.message,
            },
          })}
          error={Boolean(errors.cost)}
          helperText={errors.cost?.message}
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

export default ServiceForm;
