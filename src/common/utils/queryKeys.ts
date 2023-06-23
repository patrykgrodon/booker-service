export const queryKeys = {
  user: (userId: string) => ["user", userId],
  calendarVisits: (
    userId: string,
    dateRange: [Date, Date],
    employees: string[]
  ) => ["calendar-visits", userId, dateRange, employees],
  companyCustomers: (companyId: string) => ["company-customers", companyId],
  companyEmployees: (companyId: string) => ["company-employees", companyId],
  companyServices: (companyId: string) => ["company-services", companyId],
  companyVisits: (companyId: string, finished?: boolean) =>
    finished !== undefined
      ? ["company-visits", companyId, finished]
      : ["company-visits", companyId],
  visit: (visitId: string) => ["visit", visitId],
  userSettings: (userId: string) => ["user-settings", userId],
};
