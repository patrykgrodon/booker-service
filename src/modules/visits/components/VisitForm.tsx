import { Grid } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { DateTimePicker } from "@mui/x-date-pickers";
import { ControlSelect, RequestButton } from "common/components";
import { useToast } from "common/providers/ToastProvider";
import { checkIfEmpty } from "common/utils/validationPatterns";
import { format, getMinutes } from "date-fns";
import { useAuth } from "modules/auth/contexts";
import useCompanyCustomers from "modules/customers/hooks/useCompanyCustomers";
import useCompanyEmployees from "modules/employees/hooks/useCompanyEmployees";
import useCompanyServices from "modules/services/hooks/useCompanyServices";
import useSettings from "modules/settings/hooks/useSettings";
import { addVisit, editVisit } from "../api";
import { VisitFormValues } from "../types";

const getDefaultDateTimeFrom = (minutesStep = 15) => {
  const now = new Date();
  const minutes = getMinutes(now);
  const minutesLeftToRound = minutes % minutesStep;

  if (minutesLeftToRound > 0) {
    now.setMinutes(minutes + (minutesStep - minutesLeftToRound));
  }
  now.setSeconds(0);
  return now;
};

type VisitFormProps = {
  onSuccess: () => void;
  id?: string;
  formValues?: VisitFormValues;
};

const defaultValues: VisitFormValues = {
  customer: "",
  date: getDefaultDateTimeFrom(),
  employee: "",
  service: "",
};

const VisitForm = ({ onSuccess, formValues, id }: VisitFormProps) => {
  const { user } = useAuth();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<VisitFormValues>({
    defaultValues: formValues || defaultValues,
  });
  const { setErrorMessage } = useToast();

  const { settings } = useSettings();
  const { services } = useCompanyServices(user?.id);
  const { customers } = useCompanyCustomers(user?.id);
  const { employees } = useCompanyEmployees(user?.id);

  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!id;

  const submitHandler = async (formValues: VisitFormValues) => {
    setIsLoading(true);
    const serviceDuration =
      services?.find(({ id }) => id === formValues.service)?.duration || "";
    try {
      isEditMode
        ? await editVisit(id, formValues, serviceDuration)
        : await addVisit(user?.id || "", formValues, serviceDuration);
      onSuccess();
    } catch (err: any) {
      setErrorMessage(
        `Error while ${isEditMode ? "editing" : "adding"} visit. Try again!`
      );
    }
    setIsLoading(false);
  };

  const getClosedDays = () => {
    if (!settings) return [];
    const { openingHours } = settings;
    const closedDays: string[] = [];

    const allDays = Object.keys(openingHours) as (keyof typeof openingHours)[];

    allDays.forEach((day) => {
      if (!openingHours[day].open) {
        const capitalizedDay = `${day.slice(0, 1).toUpperCase()}${day.slice(
          1
        )}`;
        closedDays.push(capitalizedDay);
      }
    });

    return closedDays;
  };
  const closedDays = getClosedDays();

  const dateValue = watch("date");

  const getCurrentDaySettings = () => {
    if (!settings) return undefined;
    const { openingHours } = settings;
    const weekDay = format(
      dateValue,
      "EEEE"
    ).toLowerCase() as keyof typeof openingHours;

    return openingHours[weekDay];
  };

  const currentDaySettings = getCurrentDaySettings();

  const getMinTime = () => {
    if (!currentDaySettings) return undefined;
    const minTime = new Date(dateValue);

    minTime.setHours(
      +currentDaySettings.from.hour,
      +currentDaySettings.from.minute,
      0,
      0
    );

    return minTime;
  };

  const getMaxTime = () => {
    if (!currentDaySettings) return undefined;
    const maxTime = new Date(dateValue);

    maxTime.setHours(
      +currentDaySettings.to.hour,
      +currentDaySettings.to.minute,
      0,
      0
    );

    return maxTime;
  };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit(submitHandler)}
    >
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="employee"
          rules={{ validate: checkIfEmpty }}
          render={({ field }) => (
            <ControlSelect
              {...field}
              id="employee"
              label="Employee"
              fullWidth
              error={errors.employee}
              options={
                employees?.map(({ firstName, lastName, id }) => ({
                  label: `${firstName} ${lastName}`,
                  value: id,
                })) || []
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="date"
          rules={{ required: true }}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              label="Date"
              ampm={false}
              ampmInClock={false}
              minutesStep={15}
              skipDisabled
              shouldDisableDate={(day) =>
                closedDays.includes(format(day, "EEEE"))
              }
              minTime={getMinTime()}
              maxTime={getMaxTime()}
              timeSteps={{ hours: 1, minutes: 15 }}
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="service"
          rules={{
            validate: checkIfEmpty,
          }}
          render={({ field }) => (
            <ControlSelect
              {...field}
              id="service"
              label="Service"
              fullWidth
              error={errors.service}
              options={
                services?.map(({ id, name }) => ({
                  label: name,
                  value: id,
                })) || []
              }
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          control={control}
          name="customer"
          rules={{
            validate: checkIfEmpty,
          }}
          render={({ field }) => (
            <ControlSelect
              {...field}
              id="customer"
              label="Customer"
              fullWidth
              error={errors.customer}
              options={
                customers?.map(({ id, firstName, lastName }) => ({
                  label: `${firstName} ${lastName}`,
                  value: id,
                })) || []
              }
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
        }}
      >
        <RequestButton fullWidth isLoading={isLoading} type="submit">
          {isEditMode ? "Save" : "Add"}
        </RequestButton>
      </Grid>
    </Grid>
  );
};

export default VisitForm;
