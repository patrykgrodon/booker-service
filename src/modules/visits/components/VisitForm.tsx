import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ControlSelect, RequestButton } from "common/components";
import { useToast } from "common/providers/ToastProvider";
import { checkIfDateMatchOpeningHours } from "common/utils/checkIfDateMatchOpeningHours";
import { getClosedDays } from "common/utils/getClosedDays";
import { getDaySettings } from "common/utils/getDaySettings";
import {
  checkIfEmpty,
  validationMessages,
  validationPatterns,
} from "common/utils/validationPatterns";
import { useAuth } from "modules/auth/contexts";
import { addCustomer } from "modules/customers/api";
import useCompanyCustomers from "modules/customers/hooks/useCompanyCustomers";
import { CustomerFormValues } from "modules/customers/types";
import useCompanyEmployees from "modules/employees/hooks/useCompanyEmployees";
import useEmployeeAvailability from "modules/employees/hooks/useEmployeeAvailability";
import useCompanyServices from "modules/services/hooks/useCompanyServices";
import { Service } from "modules/services/types";
import useSettings from "modules/settings/hooks/useSettings";
import { addVisit, editVisit } from "../api";
import { VisitFormValues } from "../types";
import { getDefaultDateTimeFrom } from "../utils/getDefaultDateTimeFrom";
import { getNearestPossibleVisitDate } from "../utils/getNearestPossibleVisitDate";

import UserAvailableIcon from "./UserAvailableIcon";

export const getServiceDuration = (serviceId: string, services: Service[]) => {
  return services.find(({ id }) => id === serviceId)?.duration || "";
};

type VisitFormProps = {
  onSuccess: () => void;
  id?: string;
  formValues?: Partial<VisitFormValues>;
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
    setValue,
    register,
  } = useForm<VisitFormValues & CustomerFormValues>({
    defaultValues: { ...defaultValues, ...formValues },
  });
  const { setErrorMessage } = useToast();

  const { settings } = useSettings();
  const { services } = useCompanyServices(user?.id);
  const { customers } = useCompanyCustomers(user?.id);
  const { employees } = useCompanyEmployees(user?.id);

  const employeeFieldValue = watch("employee");
  const customerFieldValue = watch("customer");
  const dateFieldValue = watch("date");
  const serviceFieldValue = watch("service");

  const employeeAvailabilityQuery = useEmployeeAvailability(
    employeeFieldValue,
    dateFieldValue,
    serviceFieldValue,
    services
  );

  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!id;

  const submitHandler = async (
    formValues: VisitFormValues & CustomerFormValues
  ) => {
    if (!settings) return;
    if (checkIfDateMatchOpeningHours(formValues.date, settings.openingHours))
      setIsLoading(true);
    const serviceDuration = getServiceDuration(formValues.service, services);

    if (formValues.customer === "asNew") {
      const customerDoc = await addCustomer(user?.id || "", {
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        phoneNumber: formValues.phoneNumber,
      });
      formValues.customer = customerDoc.id;
    }

    const visitFormValues: VisitFormValues = {
      customer: formValues.customer,
      date: formValues.date,
      employee: formValues.employee,
      service: formValues.service,
    };
    try {
      isEditMode
        ? await editVisit(id, visitFormValues, serviceDuration)
        : await addVisit(user?.id || "", visitFormValues, serviceDuration);
      onSuccess();
    } catch (err: any) {
      setErrorMessage(
        `Error while ${isEditMode ? "editing" : "adding"} visit. Try again!`
      );
    }
    setIsLoading(false);
  };

  const closedDays = getClosedDays(settings);

  const currentDaySettings = getDaySettings(settings, dateFieldValue);

  const getMinTime = () => {
    if (!currentDaySettings) return undefined;
    const minTime = new Date(dateFieldValue);

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
    const maxTime = new Date(dateFieldValue);

    maxTime.setHours(
      +currentDaySettings.to.hour,
      +currentDaySettings.to.minute,
      0,
      0
    );

    return maxTime;
  };

  useEffect(() => {
    if (!settings || isEditMode || formValues?.date) return;
    setValue("date", getNearestPossibleVisitDate(settings));
  }, [settings, setValue, isEditMode, formValues?.date]);

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
              startAdornment={
                <UserAvailableIcon
                  available={employeeAvailabilityQuery.data}
                  isFetching={employeeAvailabilityQuery.isFetching}
                />
              }
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
                services.map(({ id, name }) => ({
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
            >
              <MenuItem value="asNew">New customer</MenuItem>
            </ControlSelect>
          )}
        />
      </Grid>
      {customerFieldValue === "asNew" && (
        <>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: "1rem" } }}>
              Customer data
            </Typography>
          </Grid>
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
        </>
      )}

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
