type DayValues = {
  from: { hour: string; minute: string };
  to: { hour: string; minute: string };
  open: boolean;
};

export type OpeningHours = {
  monday: DayValues;
  tuesday: DayValues;
  wednesday: DayValues;
  thursday: DayValues;
  friday: DayValues;
  saturday: DayValues;
  sunday: DayValues;
};

export type Settings = {
  openingHours: OpeningHours;
};
