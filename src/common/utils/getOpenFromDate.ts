export const getOpenFromDate = (
  date: Date,
  from: { hour: string; minute: string }
) => {
  const openFromDate = new Date(date.getTime());
  openFromDate.setHours(+from.hour, +from.minute, 0, 0);
  return openFromDate;
};
