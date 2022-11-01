export const getVisitDurationText = (duration: string) => {
  const [h, m] = duration.split(":");
  const hours = +h;
  const minutes = +m;

  const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
  const minutesText =
    minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";

  return `${hoursText} ${minutesText}`;
};
