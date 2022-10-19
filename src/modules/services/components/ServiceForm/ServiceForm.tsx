import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { ControlSelect, RequestButton } from "common/components";
import { durationValues } from "modules/services/constants/durationValues";
import { useServices } from "modules/services/contexts/servicesContext";
import { ServiceFormValues } from "modules/services/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { checkIfEmpty } from "utils/validationPatterns";

const defaultValues: ServiceFormValues = {
  name: "",
  type: "",
  duration: "",
  cost: "",
};

interface ServiceFormProps {
  handleClose: () => void;
  defaultService?: ServiceFormValues;
  uuid?: string;
}

const ServiceForm = ({
  handleClose,
  defaultService,
  uuid,
}: ServiceFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: defaultService || defaultValues });
  const { addService, editService } = useServices();

  const isEditMode = !!uuid;

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (formValues: ServiceFormValues) => {
    setIsLoading(true);
    try {
      isEditMode
        ? await editService(uuid, formValues)
        : await addService(formValues);
      handleClose();
    } catch (err: any) {}
    setIsLoading(false);
  };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit(submitHandler)}>
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
        <ControlSelect
          defaultValue={defaultService?.duration || ""}
          id="duration"
          label="Duration(hours:minutes)"
          {...register("duration", {
            validate: checkIfEmpty,
          })}
          error={errors.duration}>
          {durationValues.map(({ value }) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </ControlSelect>
      </Grid>
      <Grid item xs={12} md={6}>
        <ControlSelect
          defaultValue={defaultService?.type || ""}
          id="type"
          label="Type"
          {...register("type", {
            validate: checkIfEmpty,
          })}
          error={errors.type}>
          <MenuItem value="Hairdresser">Hairdresser</MenuItem>
          <MenuItem value="Nails stylist">Nails stylist</MenuItem>
        </ControlSelect>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          type="number"
          label="Cost(€)"
          {...register("cost", { validate: checkIfEmpty })}
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
        }}>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
        <RequestButton isLoading={isLoading} type="submit">
          {isEditMode ? "Save" : "Add"}
        </RequestButton>
      </Grid>
    </Grid>
  );
};

export default ServiceForm;
