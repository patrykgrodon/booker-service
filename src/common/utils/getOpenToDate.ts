export const getOpenToDate = (
  date: Date,
  to: { hour: string; minute: string }
) => {
  const openToDate = new Date(date.getTime());
  openToDate.setHours(+to.hour, +to.minute, 0, 0);
  return openToDate;
};
