import { VisitsFilters } from "modules/visits/hooks/useVisitsFilters";

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
  companyVisits: (
    companyId: string,
    filters?: VisitsFilters,
    finished?: boolean
  ) =>
    finished !== undefined
      ? ["company-visits", companyId, filters, finished]
      : ["company-visits", companyId],
  visit: (visitId: string) => ["visit", visitId],
  userSettings: (userId: string) => ["user-settings", userId],
};
