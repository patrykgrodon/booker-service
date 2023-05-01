export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  companyId: string;
};

export type CustomerFormValues = Omit<Customer, "id" | "companyId">;

export type AddCustomer = (formValues: CustomerFormValues) => Promise<void>;
export type EditCustomer = (
  id: string,
  formValues: CustomerFormValues
) => Promise<void>;
export type DeleteCustomer = (id: string) => Promise<void>;
