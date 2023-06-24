export type DaySettings = {
  from: { hour: string; minute: string };
  to: { hour: string; minute: string };
  open: boolean;
};

export type OpeningHours = {
  monday: DaySettings;
  tuesday: DaySettings;
  wednesday: DaySettings;
  thursday: DaySettings;
  friday: DaySettings;
  saturday: DaySettings;
  sunday: DaySettings;
};

export type Settings = {
  openingHours: OpeningHours;
};
