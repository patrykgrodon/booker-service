import { Box, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ControlSelect, RequestButton } from "common/components";
import { useToast } from "common/providers/ToastProvider";
import { useAuth } from "modules/auth/contexts";
import { saveOpeningHoursSettings } from "../api";
import days from "../constants/days";
import { OpeningHours } from "../types";

const headers = ["Day", "Open", "From", "To"];

const Header = ({ children }: { children: string }) => (
  <Box>
    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
      {children}
    </Typography>
  </Box>
);

const getHourOptions = () => {
  const options: string[] = [];

  for (let i = 0; i < 24; i++) {
    options.push(i > 9 ? `${i}` : `0${i}`);
  }
  return options.map((hour) => ({
    value: hour,
    label: hour,
  }));
};
const getMinuteOptions = () => {
  const options = ["00", "15", "30", "45"];
  return options.map((minute) => ({ value: minute, label: minute }));
};

type OpeningHoursFormProps = {
  openingHours: OpeningHours;
  onSuccess?: () => void;
};
const OpeningHoursForm = ({
  openingHours,
  onSuccess,
}: OpeningHoursFormProps) => {
  const { user } = useAuth();

  const { handleSubmit, control } = useForm<OpeningHours>({
    defaultValues: openingHours,
  });

  const { setErrorMessage } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (formValues: OpeningHours) => {
    if (!user) return;
    setIsLoading(true);

    try {
      await saveOpeningHoursSettings(formValues, user.id);
      onSuccess?.();
    } catch (err: any) {
      setErrorMessage("Error while saving opening hours settings. Try again!");
    }
    setIsLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "100px 50px 175px 175px",
          columnGap: 2,
          rowGap: 2,
        }}
      >
        {headers.map((header) => (
          <Header key={header}>{header}</Header>
        ))}

        {days.map((day) => (
          <React.Fragment key={day}>
            <Box
              sx={{
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
              }}
            >
              {day}
            </Box>
            <Box>
              <Controller
                control={control}
                name={`${day}.open`}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value} size="small" />
                )}
              />
            </Box>

            <Box sx={{ display: "flex", columnGap: 0.5 }}>
              <Controller
                control={control}
                name={`${day}.from.hour`}
                render={({ field }) => (
                  <ControlSelect
                    {...field}
                    id="opening-hours-from-hour"
                    label="Hour"
                    size="small"
                    options={getHourOptions()}
                  />
                )}
              />
              <Controller
                control={control}
                name={`${day}.from.minute`}
                render={({ field }) => (
                  <ControlSelect
                    {...field}
                    id="opening-hours-from-minute"
                    label="Minute"
                    size="small"
                    options={getMinuteOptions()}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: "flex", columnGap: 0.5 }}>
              <Controller
                control={control}
                name={`${day}.to.hour`}
                render={({ field }) => (
                  <ControlSelect
                    {...field}
                    id="opening-hours-to-hour"
                    label="Hour"
                    size="small"
                    options={getHourOptions()}
                  />
                )}
              />
              <Controller
                control={control}
                name={`${day}.to.minute`}
                render={({ field }) => (
                  <ControlSelect
                    {...field}
                    id="opening-hours-to-minute"
                    label="Minute"
                    size="small"
                    options={getMinuteOptions()}
                  />
                )}
              />
            </Box>
          </React.Fragment>
        ))}
        <Box sx={{ gridColumn: "1 / -1" }}>
          <RequestButton isLoading={isLoading} fullWidth type="submit">
            Save
          </RequestButton>
        </Box>
      </Box>
    </Box>
  );
};

export default OpeningHoursForm;
