import { Button, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers";
import { getTodayMidnight } from "utils/dateTimeUtils";
import { useUserSettings } from "common/providers/UserSettingsProvider";
import { format } from "date-fns";
import { useState } from "react";
import { RequestButton } from "common/components";
import { editUserSettings } from "common/api";
import { useAuth } from "modules/auth/contexts/authContext";

interface OpeningHoursFormValues {
  from: Date;
  to: Date;
}

const defaultValues: OpeningHoursFormValues = {
  from: getTodayMidnight(),
  to: getTodayMidnight(),
};

interface OpeningHoursFormProps {
  handleClose: () => void;
}

const OpeningHoursForm = ({ handleClose }: OpeningHoursFormProps) => {
  const { watch, control, handleSubmit, setValue } = useForm({ defaultValues });
  const { refetchUserSettings } = useUserSettings();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // console.log(watch());
  const submitHandler = async (formValues: OpeningHoursFormValues) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { from, to } = formValues;
      const openingHours = {
        from: format(from, "HH:mm"),
        to: format(to, "HH:mm"),
      };
      await editUserSettings(user.id, { openingHours });
      refetchUserSettings();
    } catch (err: any) {}
    setIsLoading(false);
  };

  const fromValue = watch("from");
  const toValue = watch("to");

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit(submitHandler)}>
      <Grid item xs={12}>
        <Typography variant="body1" align="center">
          Set opening hours of your company before you add a service.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="from"
          render={({ field }) => (
            <TimePicker
              {...field}
              onChange={(value) => {
                field.onChange(value);
                if (value && value.getTime() > toValue.getTime()) {
                  setValue("to", value);
                }
              }}
              label="From"
              renderInput={(params: any) => <TextField fullWidth {...params} />}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="to"
          render={({ field }) => (
            <TimePicker
              {...field}
              label="To"
              minTime={fromValue}
              renderInput={(params: any) => <TextField fullWidth {...params} />}
            />
          )}
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
          Save
        </RequestButton>
      </Grid>
    </Grid>
  );
};

export default OpeningHoursForm;
