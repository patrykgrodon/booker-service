export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  companyId: string;
  calendarColor: string;
};

export type EmployeeFormValues = Omit<Employee, "id" | "companyId">;
