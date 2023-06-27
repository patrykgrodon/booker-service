import { addHours, addMinutes } from "date-fns";

export const addServiceDurationToStartDate = (
  startDate: Date,
  serviceDuration: string
) => {
  const [serviceDurationHours, serviceDurationMinutes] =
    serviceDuration.split(":");

  return addHours(
    addMinutes(new Date(startDate), +serviceDurationMinutes),
    +serviceDurationHours
  );
};
