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

export type AddEmployee = (formValues: EmployeeFormValues) => Promise<void>;
export type EditEmployee = (
  id: string,
  formValues: EmployeeFormValues
) => Promise<void>;
export type DeleteEmployee = (id: string) => Promise<void>;
